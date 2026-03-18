import MaterialButton from '../components/material/MaterialButton';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../utils/Icon';

export default function BotOfferScreen() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [hovered, setHovered] = useState(null);
    const [activeFeature, setActiveFeature] = useState(0);
    const canvasRef = useRef(null);

    useEffect(() => { setTimeout(() => setShow(true), 150); }, []);

    useEffect(() => {
        const i = setInterval(() => setActiveFeature(p => (p + 1) % 8), 3000);
        return () => clearInterval(i);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current; if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2;
        ctx.scale(2, 2);
        const W = canvas.offsetWidth, H = canvas.offsetHeight;
        const particles = Array.from({ length: 35 }, () => ({
            x: Math.random() * W, y: Math.random() * H, r: 1.5 + Math.random() * 2.5,
            dx: (Math.random() - 0.5) * 0.4, dy: (Math.random() - 0.5) * 0.4,
            opacity: 0.05 + Math.random() * 0.1,
            color: '#111111', 
        }));
        let id;
        const draw = () => {
            ctx.clearRect(0, 0, W, H);
            particles.forEach(p => {
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color; ctx.globalAlpha = p.opacity; ctx.fill();
                p.x += p.dx; p.y += p.dy;
                if (p.x < 0 || p.x > W) p.dx *= -1;
                if (p.y < 0 || p.y > H) p.dy *= -1;
            });
            ctx.globalAlpha = 1; id = requestAnimationFrame(draw);
        };
        draw(); return () => cancelAnimationFrame(id);
    }, []);

    const features = [
        { icon: 'smile', title: 'OLED Face Display', desc: '6 faces × 3 moods = 18 unique expressions', color: '#111111' },
        { icon: 'phone', title: 'WhatsApp Sync', desc: 'Real-time sync with your reminders', color: '#25D366' },
        { icon: 'bell', title: 'Smart Reminders', desc: 'Sound + LED when it\'s time to act', color: '#111111' },
        { icon: 'game_controller', title: 'Mini Games', desc: 'Snake, Memory, Reaction Time built-in', color: '#111111' },
        { icon: 'touch', title: 'Touch Sensor', desc: 'Pet your bot! It responds with love', color: '#111111' },
        { icon: 'moon', title: 'Smart Sleep', desc: 'Auto sleeps at night, wakes with you', color: '#111111' },
        { icon: '⭐', title: 'Progress System', desc: 'Stars, levels, streaks & unlockables', color: '#111111' },
        { icon: 'brain', title: 'Health Quiz', desc: '15 questions to test your knowledge', color: '#111111' },
    ];

    return (
        <div style={{
            minHeight: '100vh',
            background: '#E4E0DC',
            fontFamily: "'Inter', 'Outfit', sans-serif", position: 'relative', overflow: 'hidden',
        }}>
            <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />
            
            <MaterialButton onClick={() => navigate(-1)} style={{
                position: 'fixed', top: 24, left: 24, zIndex: 50,
                background: '#FAFAF8',
                border: '1px solid rgba(0,0,0,0.05)', borderRadius: 14, padding: '12px 20px',
                color: '#111111', fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s',
                boxShadow: '4px 4px 10px rgba(0,0,0,0.05), -4px -4px 10px rgba(255,255,255,0.5)',
            }}>← Back</MaterialButton>

            <div style={{
                position: 'relative', zIndex: 10, maxWidth: 640, margin: '0 auto', padding: '80px 24px 40px',
                display: 'flex', flexDirection: 'column', gap: 28,
                opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
                {/* Hero */}
                <div style={{
                    background: '#FAFAF8',
                    borderRadius: 32, padding: '48px 36px', textAlign: 'center',
                    border: '1px solid rgba(255,255,255,0.5)', position: 'relative', overflow: 'hidden',
                    boxShadow: '12px 12px 28px rgba(0,0,0,0.12), -12px -12px 28px rgba(255,255,255,0.65)',
                }}>
                    <div style={{ position: 'relative', width: 140, height: 140, margin: '0 auto 28px' }}>
                        <div style={{ position: 'absolute', inset: -8, border: '2px solid transparent', borderTopColor: '#111111', borderRightColor: 'rgba(0,0,0,0.1)', borderRadius: '50%', animation: 'spin 4s linear infinite' }} />
                        <div style={{ position: 'absolute', inset: -4, border: '2px solid transparent', borderBottomColor: '#666666', borderLeftColor: 'rgba(0,0,0,0.1)', borderRadius: '50%', animation: 'spinReverse 5s linear infinite' }} />
                        <div style={{
                            width: '100%', height: '100%', background: '#111111',
                            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64,
                            boxShadow: 'inset 4px 4px 12px rgba(0,0,0,0.5), inset -4px -4px 12px rgba(255,255,255,0.1)', animation: 'botFloat 4s ease-in-out infinite',
                        }}></div>
                        <div style={{ position: 'absolute', bottom: 8, right: 8, width: 24, height: 24, background: '#22C55E', borderRadius: '50%', border: '3px solid #FAFAF8', animation: 'onlinePulse 2s ease-in-out infinite' }} />
                    </div>
                    
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#E5E7EB', borderRadius: 20, padding: '6px 16px', marginBottom: 16 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#111111', textTransform: 'uppercase', letterSpacing: 1.5 }}>New Product</span>
                    </div>
                    
                    <h1 style={{ fontSize: 36, fontWeight: 900, color: '#111111', marginBottom: 16, letterSpacing: -1, lineHeight: 1.1 }}>
                        Meet Your Personal<br />
                        <span style={{ color: '#666666' }}>Health Companion</span>
                    </h1>
                    
                    <p style={{ fontSize: 16, color: '#666666', lineHeight: 1.7, maxWidth: 400, margin: '0 auto' }}>
                        A cute IoT pet that syncs with your WhatsApp — reminds you to eat, drink water, and exercise in real time.
                    </p>
                </div>

                {/* Features */}
                <div style={{ background: '#FAFAF8', borderRadius: 24, padding: '28px', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '8px 8px 20px rgba(0,0,0,0.08), -8px -8px 20px rgba(255,255,255,0.6)' }}>
                    <h3 style={{ fontSize: 12, fontWeight: 700, color: '#666666', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 20 }}>What's Inside the Box</h3>
                    <div style={{
                        background: activeFeature === 1 ? '#F0FDF4' : '#F3F4F6',
                        borderRadius: 20, padding: '24px', marginBottom: 20,
                        border: '1px solid rgba(0,0,0,0.05)', transition: 'all 0.5s ease',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <div style={{ width: 56, height: 56, borderRadius: 16, background: activeFeature === 1 ? '#DCFCE7' : '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0, boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.05), inset -2px -2px 5px rgba(255,255,255,0.5)' }}>
                                <Icon name={features[activeFeature].icon} size={24} />
                            </div>
                            <div>
                                <p style={{ fontSize: 16, fontWeight: 700, color: '#111111', marginBottom: 4 }}>{features[activeFeature].title}</p>
                                <p style={{ fontSize: 13, color: '#666666' }}>{features[activeFeature].desc}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                        {features.map((f, i) => (
                            <MaterialButton key={i} onClick={() => setActiveFeature(i)} style={{
                                background: i === activeFeature ? '#111111' : '#FAFAF8',
                                border: '1px solid rgba(0,0,0,0.05)',
                                borderRadius: 14, padding: '14px 8px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s',
                                boxShadow: i === activeFeature ? '4px 4px 10px rgba(0,0,0,0.2)' : 'none',
                                color: i === activeFeature ? '#FFFFFF' : '#666666',
                            }}>
                                <Icon name={f.icon} size={22} />
                                <div style={{ fontSize: 10, fontWeight: 600, marginTop: 4 }}>{f.title.split(' ')[0]}</div>
                            </MaterialButton>
                        ))}
                    </div>
                </div>

                {/* Price */}
                <div style={{
                    background: '#FAFAF8',
                    borderRadius: 24, padding: '32px', textAlign: 'center',
                    border: '1px solid rgba(255,255,255,0.5)',
                    boxShadow: '12px 12px 28px rgba(0,0,0,0.12), -12px -12px 28px rgba(255,255,255,0.65)',
                    position: 'relative', overflow: 'hidden',
                }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: '#111111', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>One-time purchase</div>
                    <div style={{ fontSize: 56, fontWeight: 900, color: '#111111', lineHeight: 1, marginBottom: 8 }}>
                        <span style={{ fontSize: 28, verticalAlign: 'top', opacity: 0.7 }}>₹</span>499
                    </div>
                    <p style={{ fontSize: 14, color: '#666666', fontWeight: 600 }}>Free lifetime sync • No subscription ever</p>
                </div>

                {/* CTA */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <MaterialButton onClick={() => navigate('/bot-purchase')} onMouseEnter={() => setHovered('buy')} onMouseLeave={() => setHovered(null)} style={{
                        width: '100%', position: 'relative', overflow: 'hidden',
                        background: '#111111',
                        border: 'none', borderRadius: 20, padding: '22px', fontSize: 18, fontWeight: 800, color: '#FFF', cursor: 'pointer',
                        boxShadow: hovered === 'buy' ? '0 12px 30px rgba(0,0,0,0.3)' : '0 8px 20px rgba(0,0,0,0.2)',
                        transform: hovered === 'buy' ? 'translateY(-2px)' : 'translateY(0)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    }}>
                        <span style={{ position: 'relative', zIndex: 1 }}> Buy Pet Bot — ₹499</span>
                    </MaterialButton>
                    
                    <MaterialButton onClick={() => navigate('/wa-preview')} onMouseEnter={() => setHovered('skip')} onMouseLeave={() => setHovered(null)} style={{
                        width: '100%', background: '#FAFAF8', border: '1px solid rgba(0,0,0,0.05)',
                        borderRadius: 16, padding: '18px', fontSize: 15, fontWeight: 700, color: '#666666', cursor: 'pointer',
                        transform: hovered === 'skip' ? 'translateY(-1px)' : 'translateY(0)', transition: 'all 0.3s',
                        boxShadow: hovered === 'skip' ? '4px 4px 10px rgba(0,0,0,0.05), -4px -4px 10px rgba(255,255,255,0.5)' : 'none',
                    }}>Skip for Now →</MaterialButton>
                </div>
            </div>

            <style>{`
            @keyframes spin { to { transform: rotate(360deg); } }
            @keyframes spinReverse { to { transform: rotate(-360deg); } }
            @keyframes botFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
            @keyframes onlinePulse { 0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); } 50% { box-shadow: 0 0 0 8px rgba(34,197,94,0); } }
            `}</style>
        </div>
    );
}
