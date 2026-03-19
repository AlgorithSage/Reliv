import { signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

/**
 * Sends an OTP to the given phone number using Firebase Phone Auth.
 * Formats the number to E.164 before sending.
 *
 * @param {import('firebase/auth').Auth} auth - Firebase Auth instance
 * @param {string} phoneNumber - Phone number (with or without country code)
 * @param {import('firebase/auth').RecaptchaVerifier} appVerifier - reCAPTCHA verifier instance
 * @returns {Promise<import('firebase/auth').ConfirmationResult>}
 */
export async function sendOtp(auth, phoneNumber, appVerifier) {
  // Ensure E.164 format — remove spaces
  const formatted = phoneNumber.replace(/\s/g, '');
  const confirmationResult = await signInWithPhoneNumber(auth, formatted, appVerifier);
  return confirmationResult;
}

/**
 * Verifies the OTP code using the verificationId from the OTP session.
 *
 * @param {import('firebase/auth').Auth} auth - Firebase Auth instance
 * @param {string} verificationId - The verificationId from signInWithPhoneNumber
 * @param {string} otpCode - The 6-digit OTP code entered by the user
 * @returns {Promise<import('firebase/auth').UserCredential>}
 */
export async function verifyOtp(auth, verificationId, otpCode) {
  const credential = PhoneAuthProvider.credential(verificationId, otpCode);
  const result = await signInWithCredential(auth, credential);

  console.log('OTP Verified! uid:', result.user.uid, 'phone:', result.user.phoneNumber);
  return result;
}

/**
 * Checks if a user document exists in Firestore at 'users/{uid}'.
 *
 * @param {import('firebase/firestore').Firestore} db - Firestore instance
 * @param {string} uid - Firebase user UID
 * @returns {Promise<{ exists: boolean, data: object|null }>}
 */
export async function checkUserInFirestore(db, uid) {
  const userDocRef = doc(db, 'users', uid);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    return { exists: true, data: userDocSnap.data() };
  }
  return { exists: false, data: null };
}

/**
 * Creates a new user document in Firestore at 'users/{uid}'.
 *
 * @param {import('firebase/firestore').Firestore} db - Firestore instance
 * @param {object} user - Firebase user object with uid and phoneNumber
 * @param {string} accessCode - Generated access code
 * @returns {Promise<void>}
 */
export async function createUserInFirestore(db, user, accessCode) {
  const userDocRef = doc(db, 'users', user.uid);
  await setDoc(userDocRef, {
    uid: user.uid,
    phone: user.phoneNumber,
    accessCode: accessCode,
    createdAt: new Date().toISOString(),
    planType: null,
    subscriptionStatus: 'inactive',
    hasBot: false,
    streak: 0,
    stars: 0,
  });
}

/**
 * Generates a random 4-digit access code.
 * @returns {string}
 */
export function generateAccessCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}
