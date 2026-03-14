import MaterialButton from '../components/material/MaterialButton';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Icon from '../utils/Icon';

export default function FriendQuestionsScreen() {
 const navigate = useNavigate();
 const [friends, setFriends] = useState([{ name: '', phone: '' }]);
 const [showForm, setShowForm] = useState(false);

 const friendCount = parseInt(localStorage.getItem('friendCount') || '2') - 1; // Excluding self

 useEffect(() => {
 // Initialize friend slots
 const initialFriends = [];
 for (let i = 0; i < friendCount; i++) {
 initialFriends.push({ name: '', phone: '' });
 }
 setFriends(initialFriends);
 setTimeout(() => setShowForm(true), 100);
 }, [friendCount]);

 const updateFriend = (index, field, value) => {
 const updated = [...friends];
 updated[index][field] = field === 'phone' ? value.replace(/\D/g, '') : value;
 setFriends(updated);
 };

 const handleContinue = () => {
 localStorage.setItem('friendsList', JSON.stringify(friends));
 navigate('/weekly-friends-pay');
 };

 const isValid = friends.every(f => f.name.trim() && f.phone.length === 10);

 return (
 <Layout
 title="Add Your Squad"
 subtitle={`Enter details for ${friendCount} friend${friendCount > 1 ? 's' : ''}`}
 showBack
 >
 <div style={{ maxWidth: 560, margin: '0 auto' }}>{/* Info */}
 <div style={{
 background: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
 borderRadius: 16,
 padding: '16px 20px',
 marginBottom: 28,
 display: 'flex',
 alignItems: 'center',
 gap: 12,
 border: '1px solid #DDD6FE',
 opacity: showForm ? 1 : 0,
 transform: showForm ? 'translateY(0)' : 'translateY(10px)',
 transition: 'all 0.4s ease',
 }}>
 
 <p style={{ fontSize: 13, color: '#6D28D9', margin: 0 }}>
 Each friend will get their own personalized plan and WhatsApp reminders.
 </p>
 </div>

 {/* Friend Cards */}
 <div style={{
 display: 'flex',
 flexDirection: 'column',
 gap: 20,
 marginBottom: 32,
 }}>
 {friends.map((friend, index) => (
 <div
 key={index}
 style={{
 background: '#FAFAF8',
 borderRadius: 20,
 padding: '28px',
 border: 'none',
 boxShadow: '6px 6px 16px rgba(0,0,0,0.1), -6px -6px 16px rgba(255,255,255,0.6)',
 opacity: showForm ? 1 : 0,
 transform: showForm ? 'translateY(0)' : 'translateY(20px)',
 transition: 'all 0.4s ease',
 transitionDelay: `${index * 0.1}s`,
 }}
 >
 {/* Header */}
 <div style={{
 display: 'flex',
 alignItems: 'center',
 gap: 12,
 marginBottom: 20,
 }}>
 <div style={{
 width: 40,
 height: 40,
 background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
 borderRadius: 12,
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 fontSize: 18,
 color: '#FFF',
 fontWeight: 700,
 }}>
 {index + 1}
 </div>
 <span style={{ fontSize: 16, fontWeight: 700, color: '#111' }}>
 Friend {index + 1}
 </span>
 </div>

 {/* Name Input */}
 <div style={{ marginBottom: 16 }}>
 <label style={{ fontSize: 13, color: '#666', fontWeight: 600, marginBottom: 8, display: 'block' }}>
 Name
 </label>
 <input
 type="text"
 value={friend.name}
 onChange={(e) => updateFriend(index, 'name', e.target.value)}
 placeholder="Enter name"
 style={{
 width: '100%',
 padding: '16px 18px',
 fontSize: 15,
 fontWeight: 500,
 border: 'none',
 borderRadius: 12,
 outline: 'none',
 transition: 'all 0.3s ease',
 }}
 onFocus={(e) => e.target.style.borderColor = '#8B5CF6'}
 onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
 />
 </div>

 {/* Phone Input */}
 <div>
 <label style={{ fontSize: 13, color: '#666', fontWeight: 600, marginBottom: 8, display: 'block' }}>
 Phone Number
 </label>
 <div style={{ display: 'flex', gap: 10 }}>
 <div style={{
 background: '#F5F3FF',
 border: '2px solid #DDD6FE',
 borderRadius: 12,
 padding: '0 16px',
 display: 'flex',
 alignItems: 'center',
 fontSize: 14,
 fontWeight: 700,
 color: '#8B5CF6',
 }}>
 +91
 </div>
 <input
 type="tel"
 maxLength="10"
 value={friend.phone}
 onChange={(e) => updateFriend(index, 'phone', e.target.value)}
 placeholder="10-digit number"
 style={{
 flex: 1,
 padding: '16px 18px',
 fontSize: 15,
 fontWeight: 500,
 border: 'none',
 borderRadius: 12,
 outline: 'none',
 letterSpacing: '1px',
 transition: 'all 0.3s ease',
 }}
 onFocus={(e) => e.target.style.borderColor = '#8B5CF6'}
 onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
 />
 </div>
 </div>
 </div>
 ))}
 </div>

 {/* Continue Button */} <MaterialButton
 variant="filled"
 disabled={!isValid}
 onClick={handleContinue}
 style={{
 width: '100%',
 '--md-filled-button-container-height': '56px',
 '--md-filled-button-label-text-size': '18px',
 }}
 >
 Continue to Payment
 </MaterialButton>
 </div>
 </Layout>
 );
}
