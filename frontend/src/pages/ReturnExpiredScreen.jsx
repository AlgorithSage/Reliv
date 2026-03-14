import MaterialButton from '../components/material/MaterialButton';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../utils/Icon';

export default function ReturnExpiredScreen() {
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
 background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)',
 borderRadius: 30,
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 margin: '0 auto 28px',
 fontSize: 50,
 border: '2px solid #FFD296',
 }}>
 
    <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#F06922" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
      <path d="M16.5 2.1l1.5 1.5"></path>
      <path d="M7.5 2.1l-1.5 1.5"></path>
    </svg>
 </div>

 <h1 style={{
 fontSize: 28,
 fontWeight: 800,
 color: '#111',
 marginBottom: 12,
 }}>
 Plan Expired
 </h1>

 <p style={{
 fontSize: 16,
 color: '#666',
 marginBottom: 32,
 lineHeight: 1.6,
 }}>
 Your weekly plan has ended. Renew now to continue your progress!
 </p>

 {/* Progress Card */}
 <div style={{
 background: '#FAFAFA',
 borderRadius: 18,
 padding: '24px',
 marginBottom: 32,
 textAlign: 'left',
 }}>
 <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
 Your Progress So Far
 </h3>
 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
 {[
 { value: '7', label: 'Days Completed', color: '#22C55E' },
 { value: '21', label: 'Meals Tracked', color: '#3B82F6' },
 { value: '85%', label: 'Consistency', color: '#F06922' },
 ].map((stat, i) => (
 <div key={i} style={{ textAlign: 'center' }}>
 <p style={{ fontSize: 24, fontWeight: 800, color: stat.color }}>{stat.value}</p>
 <p style={{ fontSize: 11, color: '#9CA3AF' }}>{stat.label}</p>
 </div>
 ))}
 </div>
 </div>

 {/* Renewal Offer */}
 <div style={{
 background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)',
 borderRadius: 18,
 padding: '24px',
 marginBottom: 32,
 border: '2px solid #FFD296',
 }}>
 <p style={{ fontSize: 13, color: '#F06922', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>
 Welcome Back Offer
 </p>
 <p style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>
 Renew today and get <strong style={{ color: '#F06922' }}>1 extra day FREE</strong>!
 </p>
 </div>

 {/* Action Buttons */}
 <div style={{ display: 'grid', gap: 14 }}>
   <MaterialButton
  onClick={() => navigate('/change-plan')}
  style={{
    width: '100%',
    color: '#F06922',
    borderRadius: 14,
    padding: '16px',
    fontSize: 15,
    fontWeight: 600,
  }}
  >
    Try a Different Plan
  </MaterialButton>

  <MaterialButton
  onClick={() => navigate('/return-active')}
  style={{
    width: '100%',
    color: '#F06922',
    borderRadius: 14,
    padding: '16px',
    fontSize: 15,
    fontWeight: 600,
  }}
  >
    Continue with Existing Plan
  </MaterialButton>
 </div>
 </div>
 </div>
 );
}
