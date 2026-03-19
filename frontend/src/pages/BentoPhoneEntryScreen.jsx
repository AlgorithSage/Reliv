import MaterialButton from '../components/material/MaterialButton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../utils/authApi';
import './BentoGrid.css';

export default function BentoPhoneEntryScreen() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [referral, setReferral] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(null);

  const handleSubmit = async () => {
    if (phone.length !== 10) return setError('Enter valid 10-digit number');
    setLoading(true);
    setError('');

    try {
      // Send OTP via backend → Twilio WhatsApp
      await sendOtp(phone);

      const phoneNumber = `+91${phone}`;
      localStorage.setItem('phone', phoneNumber);
      navigate('/otp', { state: { phone: phoneNumber } });
    } catch (err) {
      console.error('Phone auth error:', err);
      setError(err.message || 'Failed to send OTP. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const isValid = phone.length === 10;

  return (
    <div className="bento-kiosk" style={{ justifyContent: 'center', alignItems: 'center' }}>

      {/* Ambient Background */}
      <div className="bento-kiosk__ambient">
        <div className="bento-kiosk__orb bento-kiosk__orb--1" />
        <div className="bento-kiosk__orb bento-kiosk__orb--2" />
        <div className="bento-kiosk__orb bento-kiosk__orb--3" />
      </div>

      {/* Back Button */}
      <MaterialButton
        onClick={() => navigate('/')}
        className="bento-phone__back-btn"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back
      </MaterialButton>

      {/* Main Card */}
      <div className="bento-phone__card">

        {/* Header Section */}
        <div className="bento-phone__header">
          <div className="bento-phone__icon-wrap">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F06922" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="3" />
            </svg>
          </div>
          <h1 className="bento-phone__title">Let's Get Started</h1>
          <p className="bento-phone__subtitle">Enter your phone number to begin your health transformation</p>
        </div>

        {/* WhatsApp Notice */}
        <div style={{
          background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
          border: '1px solid #81C784',
          borderRadius: 12,
          padding: '10px 14px',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 13,
          color: '#2E7D32',
          fontWeight: 600,
        }}>
          <span style={{ fontSize: 18 }}>💬</span>
          OTP will be sent via WhatsApp
        </div>

        {/* Phone Input */}
        <div className="bento-phone__field-group">
          <label className="bento-phone__label">Phone Number</label>
          <div className="bento-phone__input-row">
            <div className="bento-phone__country-code">
              <span style={{ fontSize: 13, fontWeight: 600, color: '#999', letterSpacing: '0.5px' }}>IN</span>
              <span style={{ fontSize: 17, fontWeight: 700, color: '#F06922' }}>+91</span>
            </div>
            <input
              type="tel"
              maxLength="10"
              inputMode="numeric"
              value={phone}
              onChange={(e) => { setPhone(e.target.value.replace(/\D/g, '')); setError(''); }}
              onFocus={() => setFocused('phone')}
              onBlur={() => setFocused(null)}
              placeholder="Enter 10-digit number"
              className={`bento-phone__input ${focused === 'phone' ? 'bento-phone__input--focused' : ''} ${error ? 'bento-phone__input--error' : ''}`}
            />
          </div>
        </div>

        {/* Referral Code */}
        <div className="bento-phone__field-group">
          <label className="bento-phone__label">
            Referral Code
            <span className="bento-phone__optional-tag">OPTIONAL</span>
          </label>
          <input
            type="text"
            maxLength="6"
            value={referral}
            onChange={(e) => setReferral(e.target.value.toUpperCase())}
            onFocus={() => setFocused('referral')}
            onBlur={() => setFocused(null)}
            placeholder="ENTER CODE FOR BONUS"
            className={`bento-phone__input bento-phone__input--full ${focused === 'referral' ? 'bento-phone__input--focused' : ''}`}
            style={{ textTransform: 'uppercase', letterSpacing: '2.5px' }}
          />
          <p className="bento-phone__hint">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F06922" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
            Invite 3 friends → Get FREE fitness plan worth ₹49
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bento-phone__error">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
            <span>{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <MaterialButton
          onClick={handleSubmit}
          disabled={loading || !isValid}
          className={`bento-phone__submit ${isValid ? 'bento-phone__submit--active' : ''}`}
        >
          {loading ? (
            <>
              <span className="bento-phone__spinner" />
              Sending OTP...
            </>
          ) : (
            <>
              Send OTP via WhatsApp
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </>
          )}
        </MaterialButton>
      </div>

      {/* Security Note */}
      <div className="bento-phone__security">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
        <span>Your data is encrypted and never shared</span>
      </div>

      <style>{`
        @keyframes shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); } 20%, 40%, 60%, 80% { transform: translateX(4px); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
