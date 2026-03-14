import MaterialButton from '../components/material/MaterialButton';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import Icon from '../utils/Icon';

export default function ReturningPayScreen() {
 const navigate = useNavigate();
 const location = useLocation();
 const [loading, setLoading] = useState(false);

 const phone = location.state?.phone || localStorage.getItem('phone') || '+91XXXXXXXXXX';

 const handlePay = () => {
 setLoading(true);
 setTimeout(() => {
 localStorage.setItem('paymentComplete', 'true');
 navigate('/activation');
 }, 1200);
 };

 return (
 <Layout
 title="Welcome Back!"
 subtitle="Renew your health journey"
 showBack
 >
 <div style={{ maxWidth: 540, margin: '0 auto' }}>
 {/* Main Card */}
 <div style={{
 background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF9F5 100%)',
 borderRadius: 28,
 padding: '44px 40px',
 boxShadow: '12px 12px 28px rgba(0,0,0,0.12), -12px -12px 28px rgba(255,255,255,0.65)',
 border: '2px solid rgba(240, 105, 34, 0.15)',
 marginBottom: 28,
 }}>
 {/* Welcome Icon */}
 <div style={{
 width: 88,
 height: 88,
 background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
 borderRadius: 26,
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 margin: '0 auto 28px',
 fontSize: 44,
 boxShadow: '10px 10px 24px rgba(0,0,0,0.15), -8px -8px 20px rgba(255,255,255,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
 }}>
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2"></path>
      <path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2"></path>
      <path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2"></path>
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path>
    </svg>
  </div>

 {/* User Info */}
 <div style={{
 background: '#FAFAFA',
 borderRadius: 14,
 padding: '18px 24px',
 marginBottom: 28,
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'space-between',
 }}>
 <span style={{ fontSize: 14, color: '#666' }}>Registered Phone</span>
 <span style={{ fontSize: 15, fontWeight: 700, color: '#111' }}>{phone}</span>
 </div>

 {/* Renewal Benefits */}
 <div style={{
 background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
 borderRadius: 18,
 padding: '24px',
 marginBottom: 28,
 border: '1px solid rgba(34, 197, 94, 0.2)',
 }}>
 <h3 style={{ fontSize: 14, fontWeight: 700, color: '#059669', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
 Renewal Benefits
 </h3>
 <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
 {[
 'Continue from where you left off',
 'Keep your progress history',
 'Same personalized meal plans',
 '1 bonus day FREE!',
 ].map((item, i) => (
 <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
 
 <span style={{ fontSize: 14, color: '#065F46', fontWeight: 500 }}>{item}</span>
 </div>
 ))}
 </div>
 </div>

 {/* Price */}
 <div style={{
 textAlign: 'center',
 marginBottom: 28,
 }}>
 <p style={{ fontSize: 14, color: '#9CA3AF', marginBottom: 8 }}>Weekly Plan</p>
 <p style={{ fontSize: 48, fontWeight: 800, color: '#F06922' }}>₹29</p>
 <p style={{ fontSize: 13, color: '#666' }}>8 days access (incl. bonus)</p>
 </div>

 {/* Pay Button */}
 <MaterialButton
 onClick={handlePay}
 disabled={loading}
 style={{
 width: '100%',
 background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
 border: 'none',
 borderRadius: 16,
 padding: '22px',
 fontSize: 18,
 fontWeight: 700,
 color: '#FFFFFF',
 cursor: loading ? 'not-allowed' : 'pointer',
 boxShadow: '8px 8px 22px rgba(0,0,0,0.18), -6px -6px 18px rgba(255,255,255,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
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
 }} /><Icon name="lock" size={18} />
 Processing...
 </>
 ) : (
 ' Pay ₹29 & Continue'
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
 Secure payment via Razorpay
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
