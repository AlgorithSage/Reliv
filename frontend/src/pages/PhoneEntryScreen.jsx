import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../utils/authApi';
import Layout from '../components/Layout';
import Icon from '../utils/Icon';
import MaterialButton from '../components/material/MaterialButton';
import MaterialTextField from '../components/material/MaterialTextField';

// Twilio Sandbox QR code — links to wa.me/14155238886
const SANDBOX_QR_URL = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A%2F%2Fwa.me%2F14155238886%3Ftext%3Djoin%2520observe-ear';

export default function PhoneEntryScreen() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [referral, setReferral] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(null);
  const [showSetup, setShowSetup] = useState(false);

  const handleSubmit = async () => {
    if (phoneNumber.length !== 10) {
      setError('Enter valid 10-digit number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await sendOtp(phoneNumber);
      const formattedPhone = `+91${phoneNumber}`;
      localStorage.setItem('phone', formattedPhone);
      navigate('/otp', { state: { phone: formattedPhone } });
    } catch (err) {
      console.error('Phone auth error:', err);
      // If WhatsApp not activated, auto-expand setup guide
      if (err.message && err.message.includes('WhatsApp not activated')) {
        setShowSetup(true);
      }
      setError(err.message || 'Failed to send OTP. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Let's Get Started" subtitle="Enter your phone number to begin your health transformation" showBack>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        {/* Main Card */}
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

          {/* ═══ WhatsApp Setup Guide ═══ */}
          <div style={{
            background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
            border: '1px solid #81C784',
            borderRadius: 16,
            marginBottom: 24,
            overflow: 'hidden',
          }}>
            {/* Toggle Header */}
            <div
              onClick={() => setShowSetup(!showSetup)}
              style={{
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              <span style={{ fontSize: 22 }}>💬</span>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 14, color: '#2E7D32', fontWeight: 700 }}>
                  First time? Setup WhatsApp first
                </span>
                <span style={{ fontSize: 12, color: '#4CAF50', display: 'block', marginTop: 2 }}>
                  Required one-time step to receive OTP
                </span>
              </div>
              <span style={{
                fontSize: 18,
                color: '#2E7D32',
                transition: 'transform 0.3s ease',
                transform: showSetup ? 'rotate(180deg)' : 'rotate(0deg)',
              }}>▼</span>
            </div>

            {/* Expandable Content */}
            <div style={{
              maxHeight: showSetup ? 600 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.4s ease',
            }}>
              <div style={{
                padding: '0 18px 20px',
                borderTop: '1px solid rgba(129, 199, 132, 0.4)',
              }}>
                {/* Steps */}
                <div style={{ marginTop: 16 }}>
                  {[
                    { num: '1', icon: '📱', text: 'Scan the QR code below with your phone camera' },
                    { num: '2', icon: '💬', text: 'It will open WhatsApp — send the pre-filled message' },
                    { num: '3', icon: '✅', text: 'You\'ll get a confirmation reply from Twilio' },
                    { num: '4', icon: '🔙', text: 'Come back here and enter your number!' },
                  ].map((step) => (
                    <div key={step.num} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                      marginBottom: 12,
                    }}>
                      <div style={{
                        minWidth: 28,
                        height: 28,
                        background: '#2E7D32',
                        color: '#fff',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 13,
                        fontWeight: 700,
                      }}>{step.num}</div>
                      <div style={{ fontSize: 13, color: '#1B5E20', lineHeight: 1.5, paddingTop: 4 }}>
                        <span style={{ marginRight: 6 }}>{step.icon}</span>
                        {step.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* QR Code */}
                <div style={{
                  textAlign: 'center',
                  marginTop: 16,
                  padding: 16,
                  background: '#fff',
                  borderRadius: 14,
                  border: '1px solid #C8E6C9',
                }}>
                  <img
                    src={SANDBOX_QR_URL}
                    alt="Scan to join WhatsApp sandbox"
                    style={{
                      width: 180,
                      height: 180,
                      borderRadius: 8,
                    }}
                  />
                  <p style={{ fontSize: 12, color: '#666', marginTop: 10, marginBottom: 8 }}>
                    Scan with your phone camera
                  </p>
                  <a
                    href="https://wa.me/14155238886?text=join%20observe-ear"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      background: '#25D366',
                      color: '#fff',
                      padding: '8px 18px',
                      borderRadius: 24,
                      fontSize: 13,
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    <span style={{ fontSize: 16 }}>💬</span>
                    Or tap here to open WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Phone Input Section */}
          <div style={{ marginBottom: 28 }}>
            <label style={{
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

              <input
                type="tel"
                maxLength="10"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
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
          <div style={{ marginBottom: 32 }}>
            <label style={{
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
            disabled={loading || phoneNumber.length !== 10}
            onClick={handleSubmit}
            style={{
              width: '100%',
              '--md-filled-button-container-height': '56px',
              '--md-filled-button-label-text-size': '18px',
            }}
          >
            {loading ? 'Sending OTP...' : 'Send OTP via WhatsApp →'}
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

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
      `}</style>
    </Layout>
  );
}
