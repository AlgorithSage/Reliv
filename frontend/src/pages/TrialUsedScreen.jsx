import MaterialButton from '../components/material/MaterialButton';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../utils/Icon';

export default function TrialUsedScreen() {
 const navigate = useNavigate();
 const [show, setShow] = useState(false);

 useEffect(() => {
 setTimeout(() => setShow(true), 100);
 }, []);

 return (
 <div style={{
 minHeight: '100vh',
 background: 'linear-gradient(180deg, #FFFAF7 0%, #FFF5F0 50%, #FFEEDD 100%)',
 fontFamily: "'Inter', 'Outfit', sans-serif",
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 padding: 40,
 }}>
 <div style={{
 maxWidth: 560,
 width: '100%',
 background: '#FAFAF8',
 borderRadius: 32,
 padding: '48px 44px',
 boxShadow: '14px 14px 32px rgba(0,0,0,0.12), -14px -14px 32px rgba(255,255,255,0.6)',
 border: 'none',
 textAlign: 'center',
 opacity: show ? 1 : 0,
 transform: show ? 'scale(1)' : 'scale(0.95)',
 transition: 'all 0.5s ease',
 }}>
 {/* Icon */}
 <div style={{
 width: 100,
 height: 100,
 background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
 borderRadius: 30,
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 margin: '0 auto 28px',
 fontSize: 50,
 border: '2px solid #F59E0B',
 }}>
 
 </div>

 <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111', marginBottom: 12 }}>
 Trial Already Used
 </h1>

 <p style={{ fontSize: 16, color: '#666', marginBottom: 28, lineHeight: 1.6 }}>
 This phone number has already used the free trial.
 </p>

 {/* Fair Use Message */}
 <div style={{
 background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)',
 borderRadius: 18,
 padding: '24px',
 marginBottom: 32,
 border: '1px solid rgba(240, 105, 34, 0.15)',
 }}>
 <p style={{ fontSize: 14, fontWeight: 700, color: '#F06922', marginBottom: 8 }}>
 One trial per phone 
 </p>
 <p style={{ fontSize: 13, color: '#B45309', lineHeight: 1.6 }}>
 Fair for everyone! If you already have a code, tap "Returning User" on the home screen to continue.
 </p>
 </div>

 {/* Options */}
 <div style={{
 background: '#FAFAFA',
 borderRadius: 18,
 padding: '24px',
 marginBottom: 32,
 textAlign: 'left',
 }}>
 <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 14 }}>
 What you can do:
 </h3>
 <div style={{ display: 'grid', gap: 12 }}>
 {[
 { icon: 'key', text: 'Log in with your code if you already have one' },
 { icon: 'phone_call', text: 'Use a different phone number' },
 { icon: 'chat_bubble', text: 'Contact support if you\'re facing issues' },
 ].map((item, i) => (
 <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#666' }}>
 <Icon name={item.icon} size={18} />
 {item.text}
 </div>
 ))}
 </div>
 </div>

 {/* Actions */}
 <div style={{ display: 'grid', gap: 14 }}>
 <MaterialButton
 onClick={() => navigate('/code')}
 style={{
 width: '100%',
 background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
 border: 'none',
 borderRadius: 16,
 padding: '20px',
 fontSize: 17,
 fontWeight: 700,
 color: '#FFFFFF',
 cursor: 'pointer',
 boxShadow: '8px 8px 22px rgba(0,0,0,0.18), -6px -6px 18px rgba(255,255,255,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
 }}
 >
 Log In with Code
 </MaterialButton>

 <MaterialButton
 onClick={() => navigate('/')}
 style={{
 width: '100%',
 background: '#FAFAF8',
 border: 'none',
 borderRadius: 14,
 padding: '16px',
 fontSize: 15,
 fontWeight: 600,
 color: '#666',
 cursor: 'pointer',
 }}
 >
 Back to Home
 </MaterialButton>
 </div>
 </div>
 </div>
 );
}
