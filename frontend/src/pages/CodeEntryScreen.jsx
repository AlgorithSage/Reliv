import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { auth, db } from '../utils/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { C } from '../utils/constants';
import Icon from '../utils/Icon';
import MaterialButton from '../components/material/MaterialButton';

export default function CodeEntryScreen() {
 const navigate = useNavigate();
 const [code, setCode] = useState(['', '', '', '']);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');
 const inputRefs = useRef([]);

 useEffect(() => {
 inputRefs.current[0]?.focus();
 }, []);

 const handleChange = (i, val) => {
 if (val.length > 1) val = val[0];
 const newCode = [...code];
 newCode[i] = val;
 setCode(newCode);
 setError('');

 if (val && i < 3) {
 inputRefs.current[i + 1]?.focus();
 }
 };

 const handleKeyDown = (i, e) => {
 if (e.key === 'Backspace' && !code[i] && i > 0) {
 inputRefs.current[i - 1]?.focus();
 }
 };

 const handlePaste = (e) => {
 e.preventDefault();
 const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
 const newCode = [...code];
 for (let i = 0; i < pasted.length; i++) {
 newCode[i] = pasted[i];
 }
 setCode(newCode);
 if (pasted.length === 4) {
 inputRefs.current[3]?.focus();
 }
 };

 const handleSubmit = async () => {
 const accessCode = code.join('');
 if (accessCode.length !== 4) return;

 setLoading(true);
 setError('');

  // Demo codes for testing immediately
  const demoCodes = ['9876', '6241', '1234'];
  if (demoCodes.includes(accessCode)) {
    setTimeout(() => {
      localStorage.setItem('accessCode', accessCode);
      localStorage.setItem('userType', 'returning');
      // Randomly route to different return states for demo
      const routes = ['/return-active', '/return-expired', '/return-daily-again'];
      navigate(routes[Math.floor(Math.random() * routes.length)]);
    }, 800);
    return;
  }

  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('accessCode', '==', accessCode));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      setError('Code not found');
      setLoading(false);
      return;
    }

    const userData = querySnapshot.docs[0].data();
    
    // Save info
    localStorage.setItem('accessCode', accessCode);
    localStorage.setItem('userId', userData.uid);
    localStorage.setItem('userType', 'returning');
    
    // Quick route based on their active plan
    if (userData.subscriptionStatus === 'active') {
      navigate('/return-active');
    } else {
      navigate('/return-expired');
    }
  } catch (err) {
    console.error("Error fetching user:", err);
    setError('Network error. Check connection.');
    setLoading(false);
  }
 };

 const isComplete = code.every(d => d);

 return (
 <Layout
 title="Welcome Back!"
 subtitle="Enter your 4-digit access code to continue"
 showBack
 >
 <div style={{ maxWidth: 520, margin: '0 auto' }}>
 {/* Main Card */}
 <div style={{
 background: '#FAFAF8',
 borderRadius: 28,
 padding: '48px 44px',
 boxShadow: '12px 12px 28px rgba(0,0,0,0.12), -12px -12px 28px rgba(255,255,255,0.65)',
 border: 'none',
 textAlign: 'center',
 }}>
 {/* Icon */}
 <div style={{
 width: 90,
 height: 90,
 background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)',
 borderRadius: 26,
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 margin: '0 auto 28px',
 border: '1px solid rgba(240, 105, 34, 0.15)',
 fontSize: 44,
 }}>
 
  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#F06922" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0px 4px 8px rgba(240,105,34,0.3))' }}>
   <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
   <path d="M7 11V7a5 5 0 0 1 9.9-1" />
   <path d="M12 15v2" />
  </svg>
 </div>

 {/* Code Input Boxes */}
 <div
 style={{
 display: 'flex',
 gap: 16,
 justifyContent: 'center',
 marginBottom: 28,
 }}
 onPaste={handlePaste}
 >
 {code.map((d, i) => (
 <input
 key={i}
 ref={(el) => inputRefs.current[i] = el}
 type="tel"
 maxLength="1"
 value={d}
 onChange={(e) => handleChange(i, e.target.value)}
 onKeyDown={(e) => handleKeyDown(i, e)}
 style={{
 width: 72,
 height: 88,
 background: d ? 'linear-gradient(135deg, #FFFAF7 0%, #FFF5F0 100%)' : '#FAFAFA',
 border: `3px solid ${d ? '#F06922' : error ? '#EF4444' : '#E5E7EB'}`,
 borderRadius: 20,
 fontSize: 36,
 fontWeight: 800,
 color: '#111111',
 textAlign: 'center',
 outline: 'none',
 transition: 'all 0.3s ease',
 boxShadow: d ? '0 8px 30px rgba(240, 105, 34, 0.15)' : 'none',
 caretColor: '#F06922',
 }}
 onFocus={(e) => {
 e.target.style.borderColor = '#F06922';
 e.target.style.boxShadow = '0 0 0 4px rgba(240, 105, 34, 0.15)';
 e.target.style.transform = 'scale(1.05)';
 }}
 onBlur={(e) => {
 e.target.style.borderColor = d ? '#F06922' : '#E5E7EB';
 e.target.style.boxShadow = d ? '0 8px 30px rgba(240, 105, 34, 0.15)' : 'none';
 e.target.style.transform = 'scale(1)';
 }}
 />
 ))}
 </div>

 {/* Demo Hint */}
 <p style={{
 fontSize: 13,
 color: '#9CA3AF',
 marginBottom: 28,
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 gap: 6,
 }}>
 Demo codes: <strong style={{ color: '#F06922' }}>9876</strong> or <strong style={{ color: '#F06922' }}>6241</strong>
 </p>

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
 justifyContent: 'center',
 gap: 10,
 animation: 'shake 0.5s ease',
 }}>
 <div>
 <p style={{ fontSize: 14, color: '#DC2626', fontWeight: 600, margin: 0 }}>{error}</p>
 <p style={{ fontSize: 12, color: '#9CA3AF', margin: '4px 0 0' }}>
 Check your code or try a new number
 </p>
 </div>
 </div>
 )}

 {/* Continue Button */}
 <MaterialButton
 variant="filled"
 disabled={loading || !isComplete}
 onClick={handleSubmit}
 style={{
 width: '100%',
 '--md-filled-button-container-height': '56px',
 '--md-filled-button-label-text-size': '18px',
 }}
 >
 {loading ? 'Checking...' : 'Continue'}
 </MaterialButton>

 {/* Divider */}
 <div style={{
 display: 'flex',
 alignItems: 'center',
 gap: 16,
 margin: '28px 0',
 color: '#9CA3AF',
 fontSize: 13,
 }}>
 <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
 <span>or</span>
 <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
 </div>

 {/* New User Button */}
 <MaterialButton
  onClick={() => navigate('/phone')}
  style={{
   width: '100%',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   background: '#EFECE9',
   border: 'none',
   borderRadius: 16,
   padding: '16px',
   fontSize: 17,
   fontWeight: 700,
   color: '#F06922',
   cursor: 'pointer',
   transition: 'all 0.3s ease',
   boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.08), -4px -4px 10px rgba(255, 255, 255, 0.6)',
   fontFamily: 'inherit',
  }}
  onMouseEnter={(e) => {
   e.currentTarget.style.background = '#F06922';
   e.currentTarget.style.color = '#fff';
   e.currentTarget.style.transform = 'translateY(-2px)';
   e.currentTarget.style.boxShadow = '0 8px 24px rgba(240, 105, 34, 0.25)';
  }}
  onMouseLeave={(e) => {
   e.currentTarget.style.background = '#EFECE9';
   e.currentTarget.style.color = '#F06922';
   e.currentTarget.style.transform = 'translateY(0)';
   e.currentTarget.style.boxShadow = '4px 4px 10px rgba(0, 0, 0, 0.08), -4px -4px 10px rgba(255, 255, 255, 0.6)';
  }}
  onMouseDown={(e) => {
   e.currentTarget.style.boxShadow = 'inset 3px 3px 8px rgba(0, 0, 0, 0.1), inset -3px -3px 8px rgba(255, 255, 255, 0.5)';
   e.currentTarget.style.transform = 'translateY(0) scale(0.97)';
  }}
  onMouseUp={(e) => {
   e.currentTarget.style.background = '#F06922';
   e.currentTarget.style.color = '#fff';
   e.currentTarget.style.boxShadow = '0 8px 24px rgba(240, 105, 34, 0.25)';
   e.currentTarget.style.transform = 'translateY(0)';
  }}
 >
  Start Fresh with Phone Number
 </MaterialButton>
 </div>

 {/* Help Text */}
 <p style={{
 textAlign: 'center',
 marginTop: 24,
 fontSize: 13,
 color: '#9CA3AF',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 gap: 6,
 }}>
 Your code is linked to your phone number
 </p>
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
