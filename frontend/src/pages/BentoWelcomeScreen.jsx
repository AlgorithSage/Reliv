import { useState, useEffect, useRef } from "react";
import Icon from '../utils/Icon';
import { useNavigate } from "react-router-dom";
import { C, api } from "../utils/constants";
import "./BentoGrid.css";

const relivAvatar = "/avatar-removebg-preview.png";

export default function BentoWelcomeScreen() {
 const navigate = useNavigate();
 const [show, setShow] = useState(false);

 // Inactivity attract screen
 const [inactive, setInactive] = useState(false);
 const [shoutouts, setShoutouts] = useState([]);
 const [currentIdx, setCurrentIdx] = useState(0);
 const timerRef = useRef();
 const cycleRef = useRef();

 useEffect(() => {
 try {
 const saved = JSON.parse(localStorage.getItem("userShoutouts") || "[]");
 const defaults = [
 { name: "Priya Sharma", message: "My birthday shoutout was amazing!", image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=200&h=200&q=80", type: "Birthday" },
 { name: "Raj Mehta", message: "Got 50+ new followers from my IG card!", image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=200&h=200&q=80", type: "Instagram" },
 { name: "Sara Khan", message: "Promoted my new café here — best decision!", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=200&h=200&q=80", type: "Product" },
 ];
 setShoutouts(saved.length > 0 ? [...saved, ...defaults] : defaults);
 } catch (e) {
 console.error("Error loading shoutouts:", e);
 }
 }, []);

 useEffect(() => {
 if (inactive && shoutouts.length > 1) {
 cycleRef.current = setInterval(() => {
 setCurrentIdx(prev => (prev + 1) % shoutouts.length);
 }, 4000);
 }
 return () => { if (cycleRef.current) clearInterval(cycleRef.current); };
 }, [inactive, shoutouts.length]);

 const resetInactivity = () => {
 setInactive(false);
 if (timerRef.current) clearTimeout(timerRef.current);
 timerRef.current = setTimeout(() => setInactive(true), 16000);
 };

 useEffect(() => {
 setTimeout(() => setShow(true), 60);
 resetInactivity();
 const events = ["mousemove", "mousedown", "keydown", "touchstart"];
 events.forEach(e => window.addEventListener(e, resetInactivity));
 return () => {
 if (timerRef.current) clearTimeout(timerRef.current);
 events.forEach(e => window.removeEventListener(e, resetInactivity));
 };
 }, []);

 const getTypeLabel = (t) => t || "Shoutout";

 if (!show) return null;

 return (
 <div
 className="bento-kiosk"
 onMouseMove={resetInactivity}
 onKeyDown={resetInactivity}
 onClick={resetInactivity}
 onTouchStart={resetInactivity}
 >
 {/* ── Inactivity Attract Overlay ── */}
 {inactive && shoutouts.length > 0 && (
 <div className="bento-attract" onClick={resetInactivity}>
 <div className="bento-attract__card">
 <div style={{ position: "relative" }}>
 <img src={shoutouts[currentIdx]?.image || ""} alt="Shoutout" className="bento-attract__image" />
 <span className="bento-attract__type-badge">
 {getTypeLabel(shoutouts[currentIdx]?.type)}
 </span>
 </div>
 <h2 className="bento-attract__name">{shoutouts[currentIdx]?.name || "Your Name Here"}</h2>
 <p className="bento-attract__message">"{shoutouts[currentIdx]?.message || "Your message here..."}"</p>
 <div className="bento-attract__dots">
 {shoutouts.map((_, i) => (
 <div key={i} className={`bento-attract__dot ${i === currentIdx ? "bento-attract__dot--active" : "bento-attract__dot--inactive"}`} />
 ))}
 </div>
 <button className="bento-attract__btn" onClick={(e) => { e.stopPropagation(); setInactive(false); navigate("/ProductShowcaseBoard"); }}>
 See Public Board
 </button>
 <p className="bento-attract__hint">Tap anywhere to return</p>
 </div>
 </div>
 )}

 {/* ── Ambient Background ── */}
 <div className="bento-kiosk__ambient">
 <div className="bento-kiosk__orb bento-kiosk__orb--1" />
 <div className="bento-kiosk__orb bento-kiosk__orb--2" />
 <div className="bento-kiosk__orb bento-kiosk__orb--3" />
 <div className="bento-kiosk__grid-pattern" />
 </div>

 {/* ── Header ── */}
 <header className="bento-header">
 <div className="bento-header__brand">
 <div className="bento-header__logo-wrap">
 <div className="bento-header__logo-glow" />
 <img src="/relivlogo.jpeg" alt="Reliv AI" className="bento-header__logo" />
 </div>
 <div>
 <h1 className="bento-header__title">Reliv AI</h1>
 <p className="bento-header__subtitle">Your AI Health Coach</p>
 </div>
 </div>
 <button className="bento-header__login-btn" onClick={() => navigate("/code")}>
 Login with Code
 </button>
 </header>

 {/* ═══ BENTO GRID — 3 TILES ═══ */}
 <div className="bento-grid">

 {/* ── 1. HERO — Left tall tile ── */}
 <div className="bento-tile bento-tile--hero bento-tile--delay-1">
 <div className="bento-hero__badge">
 <div className="bento-hero__badge-shimmer" />
 <span className="bento-hero__badge-icon" style={{ width: 20, height: 20 }}>
 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F06922" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
 </span>
 <span className="bento-hero__badge-text">AI-Powered Personal Health</span>
 <span className="bento-hero__badge-new">NEW</span>
 </div>

 <h1 className="bento-hero__heading">
 Transform Your<br />
 Health with{" "}
 <span className="bento-hero__heading-highlight">
 <span className="bento-hero__heading-ai">AI</span>
 <div className="bento-hero__heading-underline" />
 </span>
 </h1>

 <p className="bento-hero__subtitle">
 Personalized diet plans, workout routines, and daily WhatsApp
 reminders — all powered by AI for just{" "}
 <span className="bento-hero__price">
 ₹9/day
 <span className="bento-hero__price-line" />
 </span>
 </p>

 {/* Trust signals integrated into the hero */}
 <div className="bento-hero__trust">
 {[
 { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F06922" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, text: "Bank-Grade Security" },
 { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>, text: "50,000+ Users" },
 { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, text: "4.9/5 Rating" },
 ].map((b, i) => (
 <div key={i} className="bento-hero__trust-item">
 <span className="bento-hero__trust-icon">{b.icon}</span>
 <span>{b.text}</span>
 </div>
 ))}
 </div>
 </div>

 {/* ── 2. AI COACH — Top center ── */}
 <div className="bento-tile bento-tile--coach bento-tile--delay-2">
 <div className="bento-coach__avatar-wrap">
 <div className="bento-coach__avatar-glow" />
 <div className="bento-coach__avatar-ring">
 <div className="bento-coach__avatar-ring-inner" />
 </div>
 <img
 src={relivAvatar}
 alt="Reliv AI Coach"
 className="bento-coach__avatar-img"
 onError={(e) => {
 e.target.style.display = "none";
 e.target.parentElement.innerHTML =
 '<div style="width:130px;height:130px;border-radius:50%;background:linear-gradient(135deg,#F06922,#FF8C4B);display:flex;align-items:center;justify-content:center;box-shadow:0 14px 44px rgba(240,105,34,0.25);"><svg width=48 height=48 viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>';
 }}
 />
 </div>
 <div className="bento-coach__bubble">
 <span className="bento-coach__bubble-text">Hi! I'm your AI Health Coach</span>
 </div>
 </div>

 {/* ── 3. CTA BUTTONS — Top right ── */}
 <div className="bento-tile bento-tile--cta bento-tile--delay-3">
 <button className="bento-cta__primary" onClick={() => navigate("/phone")}>
 <div className="bento-cta__shine" />
 <span style={{ position: "relative", zIndex: 1 }}>Start Free Trial</span>
 <svg style={{ position: "relative", zIndex: 1 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
 <path d="M5 12h14M12 5l7 7-7 7" />
 </svg>
 </button>
 <button className="bento-cta__secondary" onClick={() => navigate("/code")}>
 Returning User
 </button>
 </div>
 </div>
 </div>
 );
}
