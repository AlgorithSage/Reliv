import { useState, useEffect } from "react";
import Icon from '../utils/Icon';
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function GroupTypeScreen() {
 const navigate = useNavigate();
 const [selected, setSelected] = useState(null);
 const [loading, setLoading] = useState(false);
 const [hovered, setHovered] = useState(null);
 const [showCards, setShowCards] = useState(false);

 const plans = [
 {
 id: "solo",
 title: "Solo",
 desc: "Personalized AI coaching just for you",
 price: "₹29",
 period: "/ week",
 dailyPrice: "₹4.14/day",
 tag: null,
 icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="#3B82F6" stroke="none"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" /></svg>),
 color: "#3B82F6",
 features: ["Personal meal plans", "Daily reminders", "Progress tracking"],
 path: "/weekly-solo-pay",
 },
 {
 id: "partner",
 title: "Me + Partner",
 desc: "Transform together with your loved one",
 price: "₹54",
 period: "/ week",
 dailyPrice: "₹3.86/day each",
 tag: "Most Popular",
 tagColor: "#22C55E",
 icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="#EC4899" stroke="none"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z" /></svg>),
 color: "#EC4899",
 features: ["Both partners covered", "Individual reminders", "Couple challenges"],
 path: "/couple-phone",
 },
 {
 id: "friends",
 title: "Me + Friends",
 desc: "Compete & motivate your squad",
 price: "from ₹79",
 period: "/ week",
 dailyPrice: "₹2.26/day each (5 friends)",
 tag: "Best Value",
 tagColor: "#8B5CF6",
 icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="#8B5CF6" stroke="none"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>),
 color: "#8B5CF6",
 features: ["2-5 friends", "Group leaderboard", "Squad competitions"],
 path: "/friend-size",
 },
 {
 id: "daily",
 title: "Just for Today",
 desc: "Train like your favorite celebrity for 1 day",
 price: "₹7-15",
 period: "/ day",
 dailyPrice: "One-time only",
 tag: "Try First",
 tagColor: "#F06922",
 icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="#F06922" stroke="none"><path d="M7 2v11h3v9l7-12h-4l4-8z" /></svg>),
 color: "#F06922",
 features: ["Pick your idol", "Full day plan", "Zero commitment"],
 path: "/fan-quiz-type",
 },
 ];

 useEffect(() => {
 setTimeout(() => setShowCards(true), 100);
 }, []);

 const handleContinue = () => {
 if (!selected || loading) return;
 setLoading(true);
 localStorage.setItem("groupType", selected);
 setTimeout(() => {
 const plan = plans.find((p) => p.id === selected);
 if (plan) navigate(plan.path);
 }, 600);
 };

 return (
 <Layout
 title="Choose Your Plan"
 subtitle="Select how you want to start your health journey"
 showBack
 >
 <div style={{ maxWidth: 800, margin: '0 auto' }}>
 {/* Plan Cards Grid */}
 <div style={{
 display: 'grid',
 gridTemplateColumns: 'repeat(2, 1fr)',
 gap: 20,
 marginBottom: 40,
 }}>
 {plans.map((p, index) => (
 <div
 key={p.id}
 onClick={() => !loading && setSelected(p.id)}
 onMouseEnter={() => setHovered(p.id)}
 onMouseLeave={() => setHovered(null)}
 style={{
 background: selected === p.id
 ? `linear-gradient(135deg, ${p.color}08 0%, ${p.color}15 100%)`
 : '#FAFAF8',
 borderRadius: 28,
 padding: '32px 28px',
 cursor: loading ? 'wait' : 'pointer',
 border: selected === p.id
 ? `3px solid ${p.color}`
 : 'none',
 boxShadow: selected === p.id
 ? `inset 4px 4px 10px rgba(0,0,0,0.08), inset -4px -4px 10px rgba(255,255,255,0.5), 0 0 0 2px ${p.color}`
 : hovered === p.id
 ? '10px 10px 24px rgba(0,0,0,0.13), -10px -10px 24px rgba(255,255,255,0.65)'
 : '6px 6px 16px rgba(0,0,0,0.1), -6px -6px 16px rgba(255,255,255,0.6)',
 transform: showCards
 ? selected === p.id
 ? 'scale(1.02)'
 : hovered === p.id
 ? 'translateY(-6px)'
 : 'translateY(0)'
 : 'translateY(30px)',
 opacity: showCards ? 1 : 0,
 transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
 transitionDelay: `${index * 0.08}s`,
 position: 'relative',
 }}
 >
 {/* Tag Badge */}
 {p.tag && (
 <div style={{
 display: 'inline-flex',
 alignItems: 'center',
 marginBottom: 16,
 background: `${p.tagColor}15`,
 color: p.tagColor,
 fontSize: 12,
 fontWeight: 800,
 padding: '6px 16px',
 borderRadius: 12,
 textTransform: 'uppercase',
 letterSpacing: '0.8px',
 border: `1px solid ${p.tagColor}40`,
 boxShadow: `inset 2px 2px 4px rgba(255,255,255,0.6), inset -2px -2px 4px rgba(0,0,0,0.03)`,
 }}>
 {p.tag}
 </div>
 )}

 {/* Selection Indicator */}
 {selected === p.id && (
 <div style={{
 position: 'absolute',
 top: 20,
 right: 20,
 width: 28,
 height: 28,
 background: p.color,
 borderRadius: '50%',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 boxShadow: `3px 3px 8px rgba(0,0,0,0.15), -2px -2px 6px rgba(255,255,255,0.3)`,
 }}>
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="3">
 <path d="M20 6L9 17l-5-5" />
 </svg>
 </div>
 )}

 {/* Icon */}
 <div style={{
 width: 64,
 height: 64,
 background: `linear-gradient(135deg, ${p.color}15 0%, ${p.color}25 100%)`,
 borderRadius: 18,
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 fontSize: 32,
 marginBottom: 20,
 }}>{p.icon}</div>

 {/* Title & Description */}
 <h3 style={{
 fontSize: 22,
 fontWeight: 800,
 color: selected === p.id ? p.color : '#111',
 marginBottom: 8,
 }}>
 {p.title}
 </h3>
 <p style={{
 fontSize: 14,
 color: '#666',
 marginBottom: 20,
 lineHeight: 1.5,
 }}>
 {p.desc}
 </p>

 {/* Pricing */}
 <div style={{
 display: 'flex',
 alignItems: 'baseline',
 gap: 6,
 marginBottom: 8,
 }}>
 <span style={{
 fontSize: 32,
 fontWeight: 800,
 color: p.color,
 }}>
 {p.price}
 </span>
 <span style={{
 fontSize: 14,
 color: '#9CA3AF',
 fontWeight: 500,
 }}>
 {p.period}
 </span>
 </div>

 {/* Daily Price Breakdown */}
 <div style={{
 background: `${p.color}10`,
 borderRadius: 10,
 padding: '8px 14px',
 display: 'inline-block',
 marginBottom: 20,
 }}>
 <span style={{
 fontSize: 13,
 fontWeight: 600,
 color: p.color,
 }}>
 <svg width="13" height="13" viewBox="0 0 24 24" fill={p.color} stroke="none" style={{ marginRight: 4 }}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L10 14v1c0 1.1.9 2 2 2v3.93zM17.9 17.39c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg> {p.dailyPrice}
 </span>
 </div>

 {/* Features */}
 <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
 {p.features.map((f, i) => (
 <div
 key={i}
 style={{
 display: 'flex',
 alignItems: 'center',
 gap: 10,
 fontSize: 13,
 color: '#555',
 }}
 >
 <svg width="16" height="16" viewBox="0 0 24 24" fill={p.color}>
 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
 </svg>
 {f}
 </div>
 ))}
 </div>
 </div>
 ))}
 </div>

 {/* Continue Button */}
 <button
 onClick={handleContinue}
 disabled={!selected || loading}
 style={{
 width: '100%',
 background: selected
 ? 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)'
 : '#EFECE9',
 border: 'none',
 borderRadius: 20,
 padding: '22px',
 fontSize: 18,
 fontWeight: 700,
 color: selected ? '#FFFFFF' : '#9CA3AF',
 cursor: selected && !loading ? 'pointer' : 'not-allowed',
 boxShadow: selected
 ? '6px 6px 16px rgba(0,0,0,0.15), -4px -4px 12px rgba(255,255,255,0.4), inset 0 1px 0 rgba(255,255,255,0.15)'
 : '4px 4px 10px rgba(0,0,0,0.08), -4px -4px 10px rgba(255,255,255,0.6)',
 transition: 'all 0.3s ease',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 gap: 12,
 fontFamily: 'inherit',
 }}
 >
 {loading ? (
 <>
 <span style={{
 width: 22,
 height: 22,
 border: '3px solid rgba(255,255,255,0.3)',
 borderTopColor: '#FFFFFF',
 borderRadius: '50%',
 animation: 'spin 0.8s linear infinite',
 }} />
 Loading...
 </>
 ) : (
 <>Continue →</>
 )}
 </button>

 {/* Trust Badges */}
 <div style={{
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 gap: 32,
 marginTop: 32,
 padding: '20px',
 }}>
 {[
 { icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>), text: 'Secure Payment' },
 { icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>), text: 'No Auto-Renewal' },
 { icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>), text: 'WhatsApp Support' },
 ].map((item, i) => (
 <div
 key={i}
 style={{
 display: 'flex',
 alignItems: 'center',
 gap: 8,
 fontSize: 13,
 color: '#666',
 fontWeight: 500,
 }}
 >
 {item.icon}
 {item.text}
 </div>
 ))}
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
