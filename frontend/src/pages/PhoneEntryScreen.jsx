import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import Layout from '../components/Layout';
import { C, api } from '../utils/constants';
import Icon from '../utils/Icon';
import MaterialButton from '../components/material/MaterialButton';
import MaterialTextField from '../components/material/MaterialTextField';

export default function PhoneEntryScreen() {
 const navigate = useNavigate();
 const [phone, setPhone] = useState('');
 const [referral, setReferral] = useState('');
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');
 const [focused, setFocused] = useState(null);

  const setupRecaptcha = () => {
    // Clear any existing verifier
    if (window.recaptchaVerifier) {
      try { window.recaptchaVerifier.clear(); } catch (e) { /* ignore */ }
      window.recaptchaVerifier = null;
    }
    // Create a fresh container on document.body (outside React's DOM tree)
    let container = document.getElementById('recaptcha-container-phone');
    if (container) container.remove();
    container = document.createElement('div');
    container.id = 'recaptcha-container-phone';
    container.style.display = 'none';
    document.body.appendChild(container);

    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container-phone', {
      size: 'invisible',
    });
  };

  const handleSubmit = async () => {
    if (phone.length !== 10) return setError('Enter valid 10-digit number');
    setLoading(true);
    setError('');

    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const phoneNumber = `+91${phone}`;

      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      window.confirmationResult = confirmationResult;

      // Navigate to OTP screen
      navigate('/otp', { state: { phone: phoneNumber } });
    } catch (err) {
      console.error('Phone auth error:', err);

      let errorMessage = 'Failed to send OTP. Try again.';
      if (err.code === 'auth/captcha-check-failed') errorMessage = 'reCAPTCHA verification failed. Please try again.';
      if (err.code === 'auth/too-many-requests') errorMessage = 'Too many attempts. Please wait a few minutes.';
      if (err.code === 'auth/invalid-phone-number') errorMessage = 'Invalid phone number format.';
      if (err.code === 'auth/quota-exceeded') errorMessage = 'SMS quota exceeded. Try again later.';
      if (err.code === 'auth/invalid-app-credential') errorMessage = 'Invalid App Credential. Please ensure Brand Verification is complete.';

      setError(errorMessage);
      if (window.recaptchaVerifier) {
        try { window.recaptchaVerifier.clear(); } catch (e) { /* ignore */ }
        window.recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };
return (
 <Layout title="Let's Get Started" subtitle="Enter your phone number to begin your health transformation" showBack>
 <div style={{ maxWidth: 520, margin: '0 auto' }}>{/* Main Card */}
 <div style={{
 background: '#FAFAF8',
 borderRadius: 28,
 padding: '48px 44px',
 boxShadow: '12px 12px 28px rgba(0,0,0,0.12), -12px -12px 28px rgba(255,255,255,0.65)',
 border: 'none',
 }}>
 {/* Icon Header */}
 <div style={{
 width: 80,
 height: 80,
 background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)',
 borderRadius: 24,
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 margin: '0 auto 28px',
 border: '1px solid rgba(240, 105, 34, 0.15)',
 fontSize: 40,
  }}><Icon name="phone" size={36} /></div>

 {/* Phone Input Section */}
 <div style={{ marginBottom: 28 }}><label style={{
 display: 'block',
 fontSize: 14,
 color: '#666666',
 marginBottom: 12,
 fontWeight: 600,
 letterSpacing: '0.3px',
 }}>
 Phone Number
 </label>
 <div style={{
 display: 'flex',
 gap: 12,
 alignItems: 'stretch',
 }}>
 {/* Country Code */}
 <div style={{
 background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)',
 border: '2px solid #FFD296',
 borderRadius: 14,
 padding: '0 20px',
 display: 'flex',
 alignItems: 'center',
 fontSize: 17,
 fontWeight: 700,
 color: '#F06922',
 gap: 8,
 }}>
 
 +91
 </div>

 {/* Phone Input */}
 <input
 type="tel"
 maxLength="10"
 value={phone}
 onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
 onFocus={() => setFocused('phone')}
 onBlur={() => setFocused(null)}
 placeholder="Enter 10-digit number"
 style={{
 flex: 1,
 background: focused === 'phone' ? '#FFFAF7' : '#FAFAFA',
 border: `2px solid ${focused === 'phone' ? '#F06922' : error ? '#EF4444' : '#E5E7EB'}`,
 borderRadius: 14,
 padding: '18px 20px',
 fontSize: 18,
 fontWeight: 600,
 color: '#111111',
 outline: 'none',
 transition: 'all 0.3s ease',
 letterSpacing: '1px',
 boxShadow: focused === 'phone' ? '0 0 0 4px rgba(240, 105, 34, 0.1)' : 'none',
 }}
 />
 </div>
 </div>

 {/* Referral Code Section */}
 <div style={{ marginBottom: 32 }}><label style={{
 display: 'flex',
 alignItems: 'center',
 gap: 8,
 fontSize: 14,
 color: '#666666',
 marginBottom: 12,
 fontWeight: 600,
 }}>
 
 Referral Code
 <span style={{
 background: '#E5E7EB',
 color: '#9CA3AF',
 fontSize: 11,
 fontWeight: 600,
 padding: '3px 10px',
 borderRadius: 20,
 }}>
 OPTIONAL
 </span>
 </label>
 <MaterialTextField
  variant="outlined"
  label="Referral Code"
  value={referral}
  onChange={(val) => setReferral(val.toUpperCase())}
  maxLength={6}
  placeholder="Enter code for bonus"
  supportingText=""
  style={{ width: '100%', textTransform: 'uppercase', letterSpacing: '2px' }}
  />
 <p style={{
 fontSize: 13,
 color: '#9CA3AF',
 marginTop: 10,
 display: 'flex',
 alignItems: 'center',
 gap: 6,
 }}>
 
 Invite 3 friends → Get FREE fitness plan worth ₹49
 </p>
 </div>

 {/* Error Message */}
 {error && (
 <div style={{
 background: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
 border: '1px solid #EF4444',
 borderRadius: 14,
 padding: '16px 20px',
 marginBottom: 24,
 display: 'flex',
 alignItems: 'center',
 gap: 12,
 animation: 'shake 0.5s ease',
 }}>
 <p style={{ fontSize: 14, color: '#DC2626', fontWeight: 600, margin: 0 }}>{error}</p>
 </div>
 )}

 {/* Submit Button */}
 <MaterialButton
  variant="filled"
  disabled={loading || phone.length !== 10}
  onClick={handleSubmit}
  style={{
  width: '100%',
  '--md-filled-button-container-height': '56px',
  '--md-filled-button-label-text-size': '18px',
  }}
  >
  {loading ? 'Sending OTP...' : 'Send OTP →'}
  </MaterialButton>
 </div>

 {/* Security Note */}
 <div style={{
 textAlign: 'center',
 marginTop: 28,
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 gap: 8,
 color: '#9CA3AF',
 fontSize: 13,
 }}>
 
 <span>Your data is encrypted and never shared</span>
 </div>
 </div>

 {/* Animation Keyframes */}
 <style>{`
 @keyframes shake {
 0%, 100% { transform: translateX(0); }
 10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
 20%, 40%, 60%, 80% { transform: translateX(4px); }
 }
 @keyframes spin {
 from { transform: rotate(0deg); }
 to { transform: rotate(360deg); }
 }
 `}</style>
     </Layout>
 );
}
