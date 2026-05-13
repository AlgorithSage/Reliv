import MaterialButton from '../components/material/MaterialButton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Icon from '../utils/Icon';

export default function DailyPayScreen() {
 const navigate = useNavigate();
 const [loading, setLoading] = useState(false);

 const celebrity = localStorage.getItem('selectedCelebrity') || 'virat';

 const celebInfo = {
 // Cricket
 dhoni: { name: 'MS Dhoni', emoji: 'cricket_bat', price: 10, color: '#1E40AF' },
 kohli: { name: 'Virat Kohli', emoji: 'cricket_bat', price: 12, color: '#F06922' },
 virat: { name: 'Virat Kohli', emoji: 'cricket_bat', price: 12, color: '#F06922' },
 rohit: { name: 'Rohit Sharma', emoji: 'cricket_bat', price: 9, color: '#0EA5E9' },
 // Football
 ronaldo: { name: 'Cristiano Ronaldo', emoji: 'football', price: 15, color: '#DC2626' },
 messi: { name: 'Lionel Messi', emoji: 'football', price: 15, color: '#3B82F6' },
 neymar: { name: 'Neymar Jr', emoji: 'football', price: 12, color: '#F59E0B' },
 // Singers
 arijit: { name: 'Arijit Singh', emoji: 'microphone', price: 8, color: '#7C3AED' },
 badshah: { name: 'Badshah', emoji: 'music_note', price: 11, color: '#E11D48' },
 honeysingh: { name: 'Yo Yo Honey Singh', emoji: 'fire', price: 10, color: '#EA580C' },
 // Bollywood
 srk: { name: 'Shah Rukh Khan', emoji: 'crown', price: 14, color: '#B45309' },
 salman: { name: 'Salman Khan', emoji: 'muscle', price: 12, color: '#16A34A' },
 akshay: { name: 'Akshay Kumar', emoji: 'clapperboard', price: 10, color: '#0D9488' },
 // Legacy entries
 alia: { name: 'Alia Bhatt', emoji: 'yoga_woman', price: 12, color: '#DB2777' },
 deepika: { name: 'Deepika Padukone', emoji: 'sparkle', price: 12, color: '#9333EA' },
 hrithik: { name: 'Hrithik Roshan', emoji: 'fire', price: 15, color: '#DC2626' },
 priyanka: { name: 'Priyanka Chopra', emoji: 'star_glow', price: 12, color: '#F59E0B' },
 };

 const info = celebInfo[celebrity] || celebInfo.virat;

 const handlePay = () => {
 setLoading(true);
 setTimeout(() => {
 localStorage.setItem('paymentComplete', 'true');
 navigate('/category');
 }, 1200);
 };

 return (
 <Layout
 title="Daily Plan Payment"
 subtitle={`One day inspired by ${info.name}`}
 showBack
 
 >
 <div style={{ maxWidth: 520, margin: '0 auto' }}>
 {/* Main Card */}
 <div style={{
 background: '#FAFAF8',
 borderRadius: 28,
 padding: '40px 36px',
 boxShadow: '12px 12px 28px rgba(0,0,0,0.12), -12px -12px 28px rgba(255,255,255,0.65)',
 border: `2px solid ${info.color}20`,
 marginBottom: 28,
 }}>
 {/* Header */}
 <div style={{
 display: 'flex',
 alignItems: 'center',
 gap: 20,
 marginBottom: 32,
 paddingBottom: 28,
 borderBottom: '1px solid #F5F5F5',
 }}>
 <div style={{
 width: 80,
 height: 80,
 background: `linear-gradient(135deg, ${info.color}15 0%, ${info.color}25 100%)`,
 borderRadius: 22,
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 fontSize: 40,
 }}>
 <Icon name={info.emoji} size={36} color={info.color} />
 </div>
 <div style={{ flex: 1 }}><h2 style={{ fontSize: 22, fontWeight: 800, color: '#111', marginBottom: 4 }}>
 {info.name} Style
 </h2>
 <p style={{ fontSize: 14, color: '#666' }}>
 24-hour celebrity-inspired plan
 </p>
 </div>
 </div>

 {/* Today's Schedule */}
 <div style={{ marginBottom: 28 }}><h3 style={{
 fontSize: 13,
 fontWeight: 700,
 color: '#9CA3AF',
 textTransform: 'uppercase',
 letterSpacing: '1px',
 marginBottom: 18,
 }}>
 Today's Schedule
 </h3>
 <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
 {[
 { time: 'Morning', text: 'Celebrity-style breakfast recipe', icon: 'sunrise' },
 { time: 'Midday', text: 'Power lunch with their favorites', icon: 'sun' },
 { time: 'Evening', text: 'Light dinner + workout tips', icon: 'moon' },
 ].map((item, i) => (
 <div
 key={i}
 style={{
 display: 'flex',
 alignItems: 'center',
 gap: 14,
 padding: '16px 18px',
 background: '#FAFAFA',
 borderRadius: 14,
 }}
 >
 <Icon name={item.icon} size={22} />
 <div>
 <p style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 600 }}>{item.time}</p>
 <p style={{ fontSize: 14, color: '#333', fontWeight: 500 }}>{item.text}</p>
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* Price */}
 <div style={{
 background: `linear-gradient(135deg, ${info.color}08 0%, ${info.color}15 100%)`,
 borderRadius: 16,
 padding: '24px',
 marginBottom: 28,
 textAlign: 'center',
 border: `1px solid ${info.color}20`,
 }}>
 <p style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>Today only</p>
 <p style={{ fontSize: 44, fontWeight: 800, color: info.color, marginBottom: 4 }}>
 ₹{info.price}
 </p>
 <p style={{ fontSize: 13, color: '#9CA3AF' }}>No subscription • Pay once</p>
 </div>

 {/* Pay Button */}
 <MaterialButton
 onClick={handlePay}
 disabled={loading}
 style={{
 width: '100%',
 background: `linear-gradient(135deg, ${info.color} 0%, ${info.color}DD 100%)`,
 border: 'none',
 borderRadius: 16,
 padding: '22px',
 fontSize: 18,
 fontWeight: 700,
 color: '#FFFFFF',
 cursor: loading ? 'not-allowed' : 'pointer',
 boxShadow: `0 10px 40px ${info.color}40`,
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 gap: 12,
 }}
 >
 {loading ? (
 <>
 <span style={{
 width: 24,
 height: 24,
 border: '3px solid rgba(255,255,255,0.3)',
 borderTopColor: '#FFFFFF',
 borderRadius: '50%',
 animation: 'spin 0.8s linear infinite',
 }} />Processing...
 </>
 ) : (
 `Pay ₹${info.price} & Start Today`
 )}
 </MaterialButton>
 </div>

 {/* Trust */}
 <p style={{
 textAlign: 'center',
 fontSize: 13,
 color: '#9CA3AF',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 gap: 8,
 }}>
 Secure payment • Valid for 24 hours
 </p>
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
