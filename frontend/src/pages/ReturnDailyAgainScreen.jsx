import MaterialButton from '../components/material/MaterialButton';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../utils/Icon';

export default function ReturnDailyAgainScreen() {
 const navigate = useNavigate();
 const [show, setShow] = useState(false);

 const lastCeleb = localStorage.getItem('celebrity') || 'virat';
 const celebEmojis = {
 virat: '', alia: '', salman: '',
 deepika: '', hrithik: '', priyanka: ''
 };

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
 background: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
 borderRadius: 30,
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 margin: '0 auto 28px',
 fontSize: 50,
 boxShadow: '0 12px 40px rgba(245, 158, 11, 0.3)',
 }}>
 
 </div>

 <h1 style={{
 fontSize: 28,
 fontWeight: 800,
 color: '#111',
 marginBottom: 12,
 }}>
 Ready for Another Day?
 </h1>

 <p style={{
 fontSize: 16,
 color: '#666',
 marginBottom: 32,
 lineHeight: 1.6,
 }}>
 Your last celebrity plan was a hit! Try again or explore a new idol.
 </p>

 {/* Last Plan */}
 <div style={{
 background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
 borderRadius: 18,
 padding: '20px 24px',
 marginBottom: 28,
 display: 'flex',
 alignItems: 'center',
 gap: 16,
 border: '1px solid #FCD34D',
 }}>
 <span style={{ fontSize: 36 }}>{celebEmojis[lastCeleb]}</span>
 <div style={{ textAlign: 'left', flex: 1 }}>
 <p style={{ fontSize: 12, color: '#92400E', fontWeight: 600, marginBottom: 2 }}>Last Choice</p>
 <p style={{ fontSize: 16, fontWeight: 700, color: '#78350F', textTransform: 'capitalize' }}>{lastCeleb} Style</p>
 </div>
 <span style={{
 background: '#22C55E',
 color: '#FFF',
 fontSize: 11,
 fontWeight: 700,
 padding: '5px 12px',
 borderRadius: 20,
 }}><Icon name="simple_check" size={18} /> Completed</span>
 </div>

 {/* Options */}
 <div style={{ display: 'grid', gap: 14 }}><Icon name="calendar" size={18} />
 <MaterialButton
 onClick={() => {
 localStorage.setItem('planType', 'daily');
 navigate('/daily-pay');
 }}
 style={{
 width: '100%',
 background: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
 border: 'none',
 borderRadius: 16,
 padding: '20px',
 fontSize: 17,
 fontWeight: 700,
 color: '#FFFFFF',
 cursor: 'pointer',
 boxShadow: '0 10px 40px rgba(245, 158, 11, 0.35)',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 gap: 10,
 }}
 >
 Repeat Same Plan
 </MaterialButton>

 <MaterialButton
 onClick={() => navigate('/fan-quiz-type')}
 style={{
 width: '100%',
 background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
 border: 'none',
 borderRadius: 16,
 padding: '20px',
 fontSize: 17,
 fontWeight: 700,
 color: '#FFFFFF',
 cursor: 'pointer',
 boxShadow: '8px 8px 22px rgba(0,0,0,0.18), -6px -6px 18px rgba(255,255,255,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 gap: 10,
 }}
 >
 Try New Celebrity
 </MaterialButton>

 <MaterialButton
 onClick={() => navigate('/group-type')}
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
 Switch to Weekly Plan
 </MaterialButton>
 </div>
 </div>
 </div>
 );
}
