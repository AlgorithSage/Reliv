require('dotenv').config();
const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
const admin = require('firebase-admin');

// ═══════════════════════════════════════════════
// Firebase Admin SDK initialization (from env vars)
// ═══════════════════════════════════════════════
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
  projectId: process.env.FIREBASE_PROJECT_ID,
});
const adminAuth = admin.auth();
const adminDb = admin.firestore();

// ═══════════════════════════════════════════════
// Twilio client initialization
// ═══════════════════════════════════════════════
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const WHATSAPP_FROM = process.env.TWILIO_WHATSAPP_FROM;

// ═══════════════════════════════════════════════
// In-memory OTP store (phone → { code, expiresAt, attempts })
// In production, use Redis or Firestore
// ═══════════════════════════════════════════════
const otpStore = new Map();
const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes
const MAX_OTP_ATTEMPTS = 3;
const MAX_SEND_PER_PHONE = 5; // Max sends per phone per hour
const sendCounts = new Map(); // phone → { count, resetAt }

/**
 * Generate a cryptographically-decent 6-digit OTP
 */
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Generate a unique 6-digit access code that doesn't exist in Firestore.
 */
async function generateUniqueAccessCode() {
  const MAX_ATTEMPTS = 10;
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const existing = await adminDb.collection('users')
      .where('accessCode', '==', code)
      .limit(1)
      .get();
    if (existing.empty) return code;
  }
  // Fallback: use timestamp-based code
  return Date.now().toString().slice(-6);
}

/**
 * Rate limit check for OTP sends
 */
function checkSendRateLimit(phone) {
  const now = Date.now();
  const record = sendCounts.get(phone);

  if (!record || now > record.resetAt) {
    sendCounts.set(phone, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true;
  }

  if (record.count >= MAX_SEND_PER_PHONE) {
    return false;
  }

  record.count++;
  return true;
}

// ═══════════════════════════════════════════════
// Express app
// ═══════════════════════════════════════════════
const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─────────────────────────────────────────────
// POST /api/send-otp
// Body: { phone: "+919163606455" }
// ─────────────────────────────────────────────
app.post('/api/send-otp', async (req, res) => {
  try {
    let { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    // Normalize: ensure E.164 format
    phone = phone.replace(/\s/g, '');
    if (!phone.startsWith('+')) {
      phone = `+91${phone}`; // Default to India
    }

    // Rate limit check
    if (!checkSendRateLimit(phone)) {
      return res.status(429).json({ error: 'Too many OTP requests. Please wait and try again.' });
    }

    // Generate OTP
    const otp = generateOTP();

    // Store OTP with expiry
    otpStore.set(phone, {
      code: otp,
      expiresAt: Date.now() + OTP_TTL_MS,
      attempts: 0,
    });

    // Send OTP via WhatsApp
    const message = await twilioClient.messages.create({
      body: `Your Reliv verification code is: *${otp}*\n\nThis code expires in 5 minutes. Do not share it with anyone.`,
      from: WHATSAPP_FROM,
      to: `whatsapp:${phone}`,
    });

    console.log(`OTP sent to ${phone} via WhatsApp. SID: ${message.sid}`);

    res.json({ success: true, message: 'OTP sent via WhatsApp' });
  } catch (err) {
    console.error('Send OTP error:', err);

    // Handle specific Twilio errors
    if (err.code === 21608) {
      return res.status(400).json({
        error: 'WhatsApp not activated. Please send "join <sandbox-keyword>" to +14155238886 on WhatsApp first.',
      });
    }

    res.status(500).json({ error: 'Failed to send OTP. Please try again.' });
  }
});

// ─────────────────────────────────────────────
// POST /api/verify-otp
// Body: { phone: "+919163606455", code: "123456" }
// ─────────────────────────────────────────────
app.post('/api/verify-otp', async (req, res) => {
  try {
    let { phone, code } = req.body;

    if (!phone || !code) {
      return res.status(400).json({ error: 'Phone and OTP code are required' });
    }

    // Normalize phone
    phone = phone.replace(/\s/g, '');
    if (!phone.startsWith('+')) {
      phone = `+91${phone}`;
    }

    // Look up stored OTP
    const stored = otpStore.get(phone);

    if (!stored) {
      return res.status(400).json({ error: 'No OTP found for this number. Please request a new one.' });
    }

    // Check expiry
    if (Date.now() > stored.expiresAt) {
      otpStore.delete(phone);
      return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
    }

    // Check attempts
    if (stored.attempts >= MAX_OTP_ATTEMPTS) {
      otpStore.delete(phone);
      return res.status(400).json({ error: 'Too many incorrect attempts. Please request a new OTP.' });
    }

    // Verify OTP
    if (stored.code !== code) {
      stored.attempts++;
      return res.status(400).json({
        error: 'Invalid OTP',
        attemptsRemaining: MAX_OTP_ATTEMPTS - stored.attempts,
      });
    }

    // OTP is valid — clean up
    otpStore.delete(phone);

    // ═══ Firebase: Get or create user ═══
    let firebaseUser;
    let isNewUser = false;

    try {
      // Try to find existing user by phone number
      firebaseUser = await adminAuth.getUserByPhoneNumber(phone);
      console.log('Existing Firebase user found:', firebaseUser.uid);
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        // Create new user
        firebaseUser = await adminAuth.createUser({
          phoneNumber: phone,
        });
        isNewUser = true;
        console.log('New Firebase user created:', firebaseUser.uid);
      } else {
        console.error('Firebase Auth error:', err.code, err.message);
        throw err;
      }
    }

    // Generate Firebase custom token
    const customToken = await adminAuth.createCustomToken(firebaseUser.uid);
    console.log('Custom token generated for:', firebaseUser.uid);

    // ═══ Firestore: Check/create user doc (non-blocking) ═══
    // If Firestore fails, the user still gets logged in
    let accessCode;
    try {
      const userDocRef = adminDb.collection('users').doc(firebaseUser.uid);
      const userDoc = await userDocRef.get();

      if (userDoc.exists) {
        accessCode = userDoc.data().accessCode;
        // Migrate old 4-digit codes to 6-digit
        if (accessCode && accessCode.length < 6) {
          accessCode = await generateUniqueAccessCode();
          await userDocRef.update({ accessCode });
          console.log('Migrated access code to 6-digit:', accessCode);
        }
        console.log('Existing Firestore doc found. Access code:', accessCode);
      } else {
        accessCode = await generateUniqueAccessCode();
        await userDocRef.set({
          uid: firebaseUser.uid,
          phone: phone,
          accessCode: accessCode,
          createdAt: new Date().toISOString(),
          planType: null,
          subscriptionStatus: 'inactive',
          hasBot: false,
          streak: 0,
          stars: 0,
        });
        console.log('New user doc created in Firestore.');
      }
    } catch (firestoreErr) {
      // Firestore failed — but auth succeeded. Don't block login.
      console.warn('Firestore error (non-blocking):', firestoreErr.message);
    }

    // Ensure accessCode always has a value
    if (!accessCode) {
      accessCode = Math.floor(100000 + Math.random() * 900000).toString();
      console.warn('Using fallback access code (Firestore unavailable):', accessCode);
    }

    console.log('✅ Verification complete for', phone);

    // ═══ Send access code via WhatsApp (non-blocking) ═══
    try {
      await twilioClient.messages.create({
        body: `🎉 Welcome to Reliv!\n\nYour access code is: *${accessCode}*\n\nSave this code — you'll need it to log back in next time.\n\n🔒 Keep it private. Don't share with anyone.`,
        from: WHATSAPP_FROM,
        to: `whatsapp:${phone}`,
      });
      console.log(`Access code sent to ${phone} via WhatsApp.`);
    } catch (waErr) {
      console.warn('WhatsApp access code send failed (non-blocking):', waErr.message);
    }

    res.json({
      success: true,
      customToken,
      uid: firebaseUser.uid,
      isNewUser,
      accessCode,
    });
  } catch (err) {
    console.error('Verify OTP error:', err.code || '', err.message || err);
    res.status(500).json({ error: 'Verification failed. Please try again.' });
  }
});

// ─────────────────────────────────────────────
// POST /api/login-code
// Body: { code: "123456" }
// Returns user by their unique access code
// ─────────────────────────────────────────────
app.post('/api/login-code', async (req, res) => {
  try {
    const { code } = req.body;

    if (!code || code.length < 4) {
      return res.status(400).json({ error: 'Access code is required' });
    }

    // Look up user by access code in Firestore
    const usersRef = adminDb.collection('users');
    const snapshot = await usersRef.where('accessCode', '==', code).limit(1).get();

    if (snapshot.empty) {
      return res.status(404).json({ error: 'Code not found. Check your code or register with a new phone number.' });
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();
    const uid = userDoc.id;

    // Generate custom token for Firebase auth
    const customToken = await adminAuth.createCustomToken(uid);

    console.log(`✅ Access code login for ${userData.phone} (${uid})`);

    res.json({
      success: true,
      customToken,
      uid,
      phone: userData.phone,
      accessCode: userData.accessCode,
      userData: {
        planType: userData.planType || null,
        subscriptionStatus: userData.subscriptionStatus || 'inactive',
        hasBot: userData.hasBot || false,
        streak: userData.streak || 0,
        stars: userData.stars || 0,
      },
    });
  } catch (err) {
    console.error('Login code error:', err.code || '', err.message || err);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});

// ═══════════════════════════════════════════════
// Start server
// ═══════════════════════════════════════════════
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Reliv Auth Backend running on http://localhost:${PORT}`);
  console.log(`   WhatsApp OTP from: ${WHATSAPP_FROM}`);
});
