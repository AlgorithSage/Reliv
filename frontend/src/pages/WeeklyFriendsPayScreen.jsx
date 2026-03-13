import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Icon from '../utils/Icon';
import MaterialButton from '../components/material/MaterialButton';

export default function WeeklyFriendsPayScreen() {
 const navigate = useNavigate();
 const [loading, setLoading] = useState(false);
 const friendCount = parseInt(localStorage.getItem('friendCount') || '3');

 const pricing = {
 2: { total: 49, perPerson: 24.50 },
 3: { total: 84, perPerson: 28 },
 4: { total: 112, perPerson: 28 },
 5: { total: 140, perPerson: 28 },
 };

 const { total, perPerson } = pricing[friendCount] || pricing[3];

 const handlePay = () => {
 setLoading(true);
 setTimeout(() => {
 localStorage.setItem('paymentComplete', 'true');
 localStorage.setItem('planType', '');
  localStorage.removeItem('heroTraining');
  localStorage.removeItem('selectedCelebrity');
 navigate('/category');
 }, 1200);
 };

 return (
 <Layout
 title="Friends Weekly Plan"
 subtitle={`Your squad of ${friendCount} is ready to transform!`}
 showBack
 >
 <div style={{ maxWidth: 560, margin: '0 auto' }}>{/* Pricing Card */}
 <div style={{
 background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F3FF 100%)',
 borderRadius: 28,
 padding: '40px 36px',
 boxShadow: '12px 12px 28px rgba(0,0,0,0.12), -12px -12px 28px rgba(255,255,255,0.65)',
 border: '2px solid rgba(139, 92, 246, 0.15)',
 marginBottom: 28,
 }}>
 {/* Header */}
 <div style={{
 display: 'flex',
 alignItems: 'center',
 gap: 20,
 marginBottom: 32,
 paddingBottom: 28,
 borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
 }}>
 <div style={{
 width: 72,
 height: 72,
 background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
 borderRadius: 20,
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 fontSize: 36,
 boxShadow: '8px 8px 20px rgba(0,0,0,0.15), -6px -6px 16px rgba(255,255,255,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
 }}>
 
 </div>
 <div style={{ flex: 1 }}>
 <h2 style={{ fontSize: 24, fontWeight: 800, color: '#111', marginBottom: 4 }}>
 Squad of {friendCount}
 </h2>
 <p style={{ fontSize: 14, color: '#666' }}>
 All members covered • Valid 7 days
 </p>
 </div>
 <div style={{ textAlign: 'right' }}>
 <div style={{
 fontSize: 36,
 fontWeight: 800,
 color: '#8B5CF6',
 lineHeight: 1,
 }}>
 ₹{total}
 </div>
 <div style={{ fontSize: 13, color: '#9CA3AF', fontWeight: 500 }}>
 per week
 </div>
 </div>
 </div>

 {/* Squad Members */}
 <div style={{
 display: 'flex',
 justifyContent: 'center',
 gap: 12,
 marginBottom: 28,
 flexWrap: 'wrap',
 }}>{[...Array(friendCount)].map((_, i) => (
 <div
 key={i}
 style={{
 width: 56,
 height: 56,
 background: i === 0
 ? 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'
 : 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
 borderRadius: 16,
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 fontSize: 24,
 border: i === 0 ? 'none' : '2px solid rgba(139, 92, 246, 0.2)',
 }}
 >
 {i === 0 ? '⭐' : ''}
 </div>
 ))}
 </div>

 {/* Features */}
 <div style={{
 display: 'grid',
 gap: 12,
 marginBottom: 28,
 }}>
 {[
 { icon: 'trophy', text: 'Group leaderboard & competitions' },
 { icon: 'phone', text: 'Individual WhatsApp reminders' },
 { icon: 'target', text: 'Squad challenges with rewards' },
 { icon: 'bar_chart', text: 'Compare progress with friends' },
 ].map((f, i) => (
 <div
 key={i}
 style={{
 display: 'flex',
 alignItems: 'center',
 gap: 14,
 padding: '14px 18px',
 background: '#FAFAF8',
 borderRadius: 12,
 border: 'none',
 }}
 >
 <Icon name={f.icon} size={20} />
 <span style={{ fontSize: 14, color: '#333', fontWeight: 500 }}>{f.text}</span>
 </div>
 ))}
 </div>

 {/* Value */}
 <div style={{
 background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
 borderRadius: 16,
 padding: '18px 24px',
 display: 'flex',
 alignItems: 'center',
 gap: 14,
 marginBottom: 28,
 border: '1px solid rgba(34, 197, 94, 0.2)',
 }}>
 <div>
 <p style={{ fontSize: 14, fontWeight: 700, color: '#059669', margin: 0 }}>
 Only ₹{perPerson.toFixed(0)} per person
 </p>
 <p style={{ fontSize: 12, color: '#10B981', margin: 0 }}>
 Split equally among {friendCount} friends!
 </p>
 </div>
 </div>

 {/* Pay Button */}
 <MaterialButton
 variant="filled"
 disabled={loading}
 onClick={handlePay}
 style={{
 width: '100%',
 '--md-filled-button-container-height': '56px',
 '--md-filled-button-label-text-size': '18px',
 '--md-filled-button-container-color': '#8B5CF6',
 }}
 >
 {loading ? 'Processing...' : `Pay ₹${total} & Continue`}
 </MaterialButton>
 </div>

 {/* Trust */}
 <div style={{
 textAlign: 'center',
 fontSize: 13,
 color: '#9CA3AF',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 gap: 8,
 }}>
 Secure payment via Razorpay
 </div>
 </div>

 <style>{`
 @keyframes spin {
 from { transform: rotate(0deg); }
 to { transform: rotate(360deg); }
 }
 `}</style>
 </Layout>
 );
}
