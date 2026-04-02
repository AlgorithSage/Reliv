import MaterialButton from '../components/material/MaterialButton';
import MaterialTextField from '../components/material/MaterialTextField';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../utils/authApi';
import Layout from '../components/Layout';
import Icon from '../utils/Icon';

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
  const [whatsappError, setWhatsappError] = useState(false);
  const [hasConfirmedSetup, setHasConfirmedSetup] = useState(false);
  const [hasViewedSetup, setHasViewedSetup] = useState(false);
  const [setupMessage, setSetupMessage] = useState('');
  const setupRef = useRef(null);

  const handleSubmit = async () => {
    if (phoneNumber.length !== 10) {
      setError('Enter valid 10-digit number');
      return;
    }

    setLoading(true);
    setError('');
    setWhatsappError(false);

    try {
      await sendOtp(phoneNumber);
      const formattedPhone = `+91${phoneNumber}`;
      localStorage.setItem('phone', formattedPhone);
      navigate('/otp', { state: { phone: formattedPhone } });
    } catch (err) {
      console.error('Phone auth error:', err);
      // Backend returns whatsappNotSetup when message delivery verification fails
      if (err.message && (err.message.includes('WhatsApp setup not completed') || err.message.includes('WhatsApp not activated') || err.message.includes('not activated'))) {
        setWhatsappError(true);
        setHasConfirmedSetup(false);
        setHasViewedSetup(false);
        setSetupMessage('⚠️ WhatsApp setup was not completed. Please scan the QR code above, send the join message, then try again.');
        setShowSetup(true);
        setTimeout(() => {
          setupRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      } else {
        setError(err.message || 'Failed to send OTP. Try again.');
      }
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
          <div ref={setupRef} style={{
            background: 'var(--white)',
            border: '1px solid var(--gray-200)',
            borderRadius: 16,
            marginBottom: 24,
            overflow: 'hidden',
          }}>
            {/* Toggle Header */}
            <div
              onClick={() => setShowSetup(!showSetup)}
              style={{
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer',
                userSelect: 'none',
                background: showSetup ? 'var(--gray-50)' : 'var(--white)',
                borderBottom: showSetup ? '1px solid var(--gray-200)' : 'none',
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(135deg, var(--cream-200) 0%, var(--cream-300) 100%)',
                color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, border: '1px solid rgba(240, 105, 34, 0.15)'
              }}>
                <Icon name="chat_bubble" size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 15, color: 'var(--gray-900)', fontWeight: 700, display: 'block' }}>
                  First time? Setup WhatsApp first
                </span>
                <span style={{ fontSize: 13, color: 'var(--gray-500)', display: 'block', marginTop: 2 }}>
                  Required one-time step to receive OTP
                </span>
              </div>
              <span style={{
                fontSize: 16,
                color: 'var(--gray-900)',
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
              <div style={{ padding: '20px' }}>
                {/* Steps */}
                <div>
                  {[
                    { num: '1', icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F06922" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><line x1="8" y1="18" x2="16" y2="18"/><line x1="12" y1="18" x2="12" y2="22"/></svg>), text: 'Scan the QR code below with your phone camera' },
                    { num: '2', icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F06922" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>), text: 'It will open WhatsApp — send the pre-filled message' },
                    { num: '3', icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F06922" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>), text: 'You\'ll get a confirmation reply from Twilio' },
                    { num: '4', icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F06922" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>), text: 'Come back here and enter your number!' },
                  ].map((step) => (
                    <div key={step.num} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 14,
                      marginBottom: 16,
                    }}>
                      <div style={{
                        minWidth: 26,
                        height: 26,
                        background: 'var(--gray-900)',
                        color: 'var(--white)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 13,
                        fontWeight: 700,
                      }}>{step.num}</div>
                      <div style={{ fontSize: 14, color: 'var(--gray-700)', lineHeight: 1.5, paddingTop: 3, fontWeight: 500, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <span style={{ flexShrink: 0, marginTop: 2 }}>{step.icon}</span>
                        {step.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* QR Code */}
                <div style={{
                  textAlign: 'center',
                  marginTop: 20,
                  padding: 24,
                  background: 'var(--gray-50)',
                  borderRadius: 16,
                  border: '1px solid var(--gray-200)',
                }}>
                  <img
                    src={SANDBOX_QR_URL}
                    alt="Scan to join WhatsApp sandbox"
                    style={{
                      width: 160,
                      height: 160,
                      borderRadius: 12,
                      border: '1px solid var(--gray-200)',
                    }}
                  />
                  <p style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 14, marginBottom: 0, fontWeight: 500 }}>
                    Scan with your phone camera
                  </p>
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
          {error && !whatsappError && (
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

          {/* WhatsApp Setup Required Warning */}
          {whatsappError && (
            <div style={{
              background: 'linear-gradient(135deg, #FFF7F0 0%, #FFEEDD 100%)',
              border: '2px solid #F06922',
              borderRadius: 18,
              padding: '24px',
              marginBottom: 24,
              animation: 'shake 0.5s ease',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: 'linear-gradient(135deg, #F06922, #FF8C4B)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <p style={{ fontSize: 17, color: '#B84500', fontWeight: 800, margin: 0, letterSpacing: '-0.3px' }}>
                  WhatsApp Setup Required!
                </p>
              </div>
              <p style={{ fontSize: 15, color: '#8B4513', margin: '0 0 16px', lineHeight: 1.6, fontWeight: 500 }}>
                You need to first activate WhatsApp by scanning the QR code above and sending the pre-filled message. Only then you can receive the OTP.
              </p>
              <button
                onClick={() => {
                  setShowSetup(true);
                  setTimeout(() => {
                    setupRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }, 200);
                }}
                style={{
                  background: 'linear-gradient(135deg, #F06922, #E85C25)',
                  color: '#FFF',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(240, 105, 34, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.3s ease',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
                Go to WhatsApp Setup ↑
              </button>
            </div>
          )}


          {/* WhatsApp Setup Confirmation Checkbox */}
          <div
            onClick={() => {
              // If user hasn't opened/viewed the setup guide yet, block the tick
              if (!hasViewedSetup) {
                setSetupMessage('⚠️ Please complete the WhatsApp setup first! Scan the QR code above and send the join message.');
                setShowSetup(true);
                setHasViewedSetup(true);
                setTimeout(() => {
                  setupRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 200);
                return;
              }
              // If user has viewed setup, allow toggling
              const newVal = !hasConfirmedSetup;
              setHasConfirmedSetup(newVal);
              if (newVal) {
                setWhatsappError(false);
                setSetupMessage('');
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '16px 20px',
              marginBottom: setupMessage ? 8 : 20,
              background: hasConfirmedSetup
                ? '#F0FFF4'
                : (setupMessage ? '#FFF7F0' : '#FAFAF8'),
              border: hasConfirmedSetup
                ? '2px solid #22C55E'
                : (setupMessage ? '2px solid #F06922' : '2px solid #E5E7EB'),
              borderRadius: 16,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              userSelect: 'none',
            }}
          >
            <div style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              border: hasConfirmedSetup ? 'none' : '2px solid #D1D5DB',
              background: hasConfirmedSetup ? 'linear-gradient(135deg, #22C55E, #16A34A)' : '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.3s ease',
              boxShadow: hasConfirmedSetup ? '0 4px 12px rgba(34, 197, 94, 0.3)' : 'none',
            }}>
              {hasConfirmedSetup && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </div>
            <span style={{
              fontSize: 15,
              fontWeight: 600,
              color: hasConfirmedSetup ? '#166534' : (setupMessage ? '#B84500' : '#555'),
              lineHeight: 1.4,
            }}>
              I have scanned the QR code above and completed WhatsApp setup
            </span>
          </div>

          {/* Setup warning message */}
          {setupMessage && (
            <div style={{
              background: 'linear-gradient(135deg, #FFF7F0 0%, #FFEEDD 100%)',
              border: '2px solid #F06922',
              borderRadius: 18,
              padding: '24px',
              marginBottom: 20,
              animation: 'shake 0.5s ease',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: 'linear-gradient(135deg, #F06922, #FF8C4B)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <p style={{ fontSize: 17, color: '#B84500', fontWeight: 800, margin: 0, letterSpacing: '-0.3px' }}>
                  WhatsApp Setup Required!
                </p>
              </div>
              <p style={{ fontSize: 15, color: '#8B4513', margin: '0 0 16px', lineHeight: 1.6, fontWeight: 500 }}>
                You need to first activate WhatsApp by scanning the QR code above and sending the pre-filled message. Only then you can receive the OTP.
              </p>
              <button
                onClick={() => {
                  setShowSetup(true);
                  setTimeout(() => {
                    setupRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }, 200);
                }}
                style={{
                  background: 'linear-gradient(135deg, #F06922, #E85C25)',
                  color: '#FFF',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(240, 105, 34, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.3s ease',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
                Go to WhatsApp Setup ↑
              </button>
            </div>
          )}

          {/* Submit Button */}
          <MaterialButton
            variant="filled"
            disabled={loading || phoneNumber.length !== 10 || !hasConfirmedSetup}
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
