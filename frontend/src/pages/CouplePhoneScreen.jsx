import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { api } from '../utils/constants';
import Icon from '../utils/Icon';
import MaterialButton from '../components/material/MaterialButton';
import MaterialTextField from '../components/material/MaterialTextField';

export default function CouplePhoneScreen() {
 const navigate = useNavigate();
 const [phone, setPhone] = useState('');
 const [name, setName] = useState('');
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');
 const [focused, setFocused] = useState(null);

 const handleSubmit = async () => {
 if (phone.length !== 10) return setError('Enter valid 10-digit number');
 if (!name.trim()) return setError('Please enter their name');

 setLoading(true);
 setError('');

 localStorage.setItem('partnerPhone', `+91${phone}`);
 localStorage.setItem('partnerName', name);

 setTimeout(() => {
 navigate('/couple-questions');
 }, 600);
 };

 return (
 <Layout
 title="Add Your Partner"
 subtitle="Enter your partner's details"
 showBack
 >
 <div style={{ maxWidth: 520, margin: '0 auto' }}>{/* Main Card */}
 <div style={{
 background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF0F7 100%)',
 borderRadius: 28,
 padding: '44px 40px',
 boxShadow: '12px 12px 28px rgba(0,0,0,0.12), -12px -12px 28px rgba(255,255,255,0.65)',
 border: '1px solid rgba(236, 72, 153, 0.15)',
 }}>
 {/* Icon */}
 <div style={{
 width: 88,
 height: 88,
 background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
 borderRadius: 24,
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 margin: '0 auto 32px',
 fontSize: 44,
 boxShadow: '0 12px 40px rgba(236, 72, 153, 0.3)',
 }}>
 
 </div>

 {/* Name Input */}
 <MaterialTextField
 variant="outlined"
 label="Partner's Name"
 value={name}
 onChange={(val) => setName(val)}
 placeholder="Enter their name"
 style={{
 width: '100%',
 '--md-outlined-text-field-focus-outline-color': '#EC4899',
 '--md-outlined-text-field-hover-outline-color': '#DB2777',
 }}
 />

 {/* Phone Input */}
 <div style={{ marginBottom: 28 }}><label style={{
 display: 'block',
 fontSize: 14,
 color: '#666666',
 marginBottom: 10,
 fontWeight: 600,
 }}>
 Partner's Phone Number
 </label>
 <div style={{ display: 'flex', gap: 12 }}>
 <div style={{
 background: 'linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)',
 border: '2px solid #FBCFE8',
 borderRadius: 14,
 padding: '0 18px',
 display: 'flex',
 alignItems: 'center',
 fontSize: 16,
 fontWeight: 700,
 color: '#EC4899',
 gap: 8,
 }}>
 +91
 </div>
 <input
 type="tel"
 maxLength="10"
 value={phone}
 onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
 onFocus={() => setFocused('phone')}
 onBlur={() => setFocused(null)}
 placeholder="10-digit number"
 style={{
 flex: 1,
 background: focused === 'phone' ? '#FFFAF7' : '#FAFAFA',
 border: `2px solid ${focused === 'phone' ? '#EC4899' : error ? '#EF4444' : '#E5E7EB'}`,
 borderRadius: 14,
 padding: '18px 20px',
 fontSize: 17,
 fontWeight: 600,
 color: '#111111',
 outline: 'none',
 transition: 'all 0.3s ease',
 letterSpacing: '1px',
 boxShadow: focused === 'phone' ? '0 0 0 4px rgba(236, 72, 153, 0.1)' : 'none',
 }}
 />
 </div>
 </div>

 {/* Error */}
 {error && (
 <div style={{
 background: '#FEE2E2',
 border: '1px solid #EF4444',
 borderRadius: 12,
 padding: '14px 18px',
 marginBottom: 24,
 display: 'flex',
 alignItems: 'center',
 gap: 10,
 }}>
 <span style={{ fontSize: 14, color: '#DC2626', fontWeight: 600 }}>{error}</span>
 </div>
 )}

 {/* Submit Button */}
 <MaterialButton
 variant="filled"
 disabled={loading || phone.length !== 10 || !name.trim()}
 onClick={handleSubmit}
 style={{
 width: '100%',
 '--md-filled-button-container-height': '56px',
 '--md-filled-button-label-text-size': '18px',
 '--md-filled-button-container-color': '#EC4899',
 }}
 >
 {loading ? 'Adding Partner...' : 'Continue'}
 </MaterialButton>
 </div>

 {/* Note */}
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
 
 They'll receive WhatsApp reminders too
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
