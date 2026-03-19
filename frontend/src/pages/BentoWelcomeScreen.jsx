import MaterialButton from '../components/material/MaterialButton';
import { useState, useEffect, useRef } from "react";
import Icon from '../utils/Icon';
import { useNavigate } from "react-router-dom";
import { C, api } from "../utils/constants";
import "./BentoGrid.css";

const relivAvatar = "/avatar-removebg-preview.png";

export default function BentoWelcomeScreen() {
 const navigate = useNavigate();
 const [show, setShow] = useState(false);
 const [activeTestimonial, setActiveTestimonial] = useState(0);
 const [statsAnimated, setStatsAnimated] = useState(false);

 // Inactivity attract screen
 const [inactive, setInactive] = useState(false);
 const [shoutouts, setShoutouts] = useState([]);
 const [currentIdx, setCurrentIdx] = useState(0);
 const timerRef = useRef();
 const cycleRef = useRef();

 const testimonials = [
  { name: "Priya S.", quote: "Lost 8kg in 6 weeks! The AI plans are incredible.", rating: 5, avatar: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=80&h=80&q=80" },
  { name: "Raj M.", quote: "Best investment in my health. WhatsApp reminders keep me on track.", rating: 5, avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=80&h=80&q=80" },
  { name: "Anita K.", quote: "My skin cleared up in 3 weeks following the diet plan!", rating: 5, avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=80&h=80&q=80" },
 ];

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
  setTimeout(() => setStatsAnimated(true), 800);
  resetInactivity();
  const events = ["mousemove", "mousedown", "keydown", "touchstart"];
  events.forEach(e => window.addEventListener(e, resetInactivity));
  return () => {
   if (timerRef.current) clearTimeout(timerRef.current);
   events.forEach(e => window.removeEventListener(e, resetInactivity));
  };
 }, []);

 useEffect(() => {
  const interval = setInterval(() => {
   setActiveTestimonial(prev => (prev + 1) % testimonials.length);
  }, 5000);
  return () => clearInterval(interval);
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
      <MaterialButton className="bento-attract__btn" onClick={(e) => { e.stopPropagation(); setInactive(false); navigate("/ProductShowcaseBoard"); }}>
       See Public Board
      </MaterialButton>
      <p className="bento-attract__hint">Tap anywhere to return</p>
     </div>
    </div>
   )}

   {/* ── Ambient Background ── */}
   <div className="bento-kiosk__ambient">
    <div className="bento-kiosk__orb bento-kiosk__orb--1" />
    <div className="bento-kiosk__orb bento-kiosk__orb--2" />
    <div className="bento-kiosk__orb bento-kiosk__orb--3" />
   </div>

   {/* ═══ BENTO GRID — 6 TILES ═══ */}
   <div className="bento-grid">

    {/* ── 1. HERO — Full width top ── */}
    <div className="bento-tile bento-tile--hero bento-tile--delay-1">
     {/* Decorative background orb */}
     <div className="bento-hero__bg-orb" />

     {/* Left content */}
     <div className="bento-hero__left">
      <span className="bento-tile__label">HERO</span>

      {/* AI badge */}
      <div className="bento-hero__badge">
       <div className="bento-hero__badge-shimmer" />
       <span className="bento-hero__badge-pulse" />
       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F06922" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
       <span className="bento-hero__badge-text">AI-Powered Personal Health</span>
      </div>

      <h1 className="bento-hero__heading">
       Transform Your<br />
       Health with{" "}
       <span className="bento-hero__heading-highlight">
        <span className="bento-hero__heading-divider" />
        <span className="bento-hero__heading-ai">AI</span>
       </span>
      </h1>

      <p className="bento-hero__subtitle">
       Personalized diet plans, workout routines, and daily WhatsApp reminders
       — all powered by AI for just <strong style={{ color: '#F06922' }}>₹9/day</strong>
      </p>

      {/* Trust signals */}
      <div className="bento-hero__trust">
       {[
        { icon: "shield", label: "Bank-Grade", sub: "Security" },
        { icon: "check_circle", label: "Endorsed", sub: "By Experts" },
        { icon: "verified", label: "100% HIPAA", sub: "Compliant" },
        { icon: "group", label: "50,000+", sub: "Happy Users" },
       ].map((b, i) => (
        <div key={i} className="bento-hero__trust-item">
         <div className="bento-hero__trust-icon-wrap">
          <Icon name={b.icon} size={20} color="#F06922" />
         </div>
         <div>
          <span className="bento-hero__trust-label">{b.label}</span>
          <span className="bento-hero__trust-sub">{b.sub}</span>
         </div>
        </div>
       ))}
      </div>

     </div>

     {/* Right — Big Reliv Logo */}
     <div className="bento-hero__right">
      <div className="bento-hero__logo-glow" />
      <img src="/relivlogo.jpeg" alt="Reliv AI" className="bento-hero__logo-big" />
     </div>
    </div>

    {/* ── 2. AI COACH — Middle left ── */}
    <div 
        className="bento-tile bento-tile--coach bento-tile--delay-2"
        onClick={() => navigate("/coach")}
        style={{ cursor: 'pointer' }}
    >
     <span className="bento-tile__label">AI COACH</span>
     <div className="bento-coach__content">
      <div className="bento-coach__avatar-wrap">
       <img
        src={relivAvatar}
        alt="Reliv AI Coach"
        className="bento-coach__avatar-img"
        onError={(e) => {
         e.target.style.display = "none";
         e.target.parentElement.innerHTML =
          '<div style="width:210px;height:210px;border-radius:50%;background:linear-gradient(135deg,#F06922,#FF8C4B);display:flex;align-items:center;justify-content:center;"><svg width=64 height=64 viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>';
        }}
       />
      </div>
      <div className="bento-coach__bubble">
       <div className="bento-coach__bubble-avatar" />
       <span className="bento-coach__bubble-text">Hi! I'm your AI Health Coach 👋</span>
      </div>
     </div>
    </div>

    {/* ── 5. FEATURES — Bottom center ── */}
    <div className="bento-tile bento-tile--features bento-tile--delay-5">
     <span className="bento-tile__label">FEATURES</span>
     <div className="bento-features__grid">
      {[
       { icon: "salad", title: "Diet Plans", desc: "Offer your plans" },
       { icon: "phone", title: "WhatsApp Reminder", desc: "Present realtime progress" },
       { icon: "muscle", title: "Workouts", desc: "WhatsApp reminders" },
       { icon: "bar_chart", title: "Progress", desc: "Tracking" },
      ].map((f, i) => (
       <div key={i} className="bento-feature__item">
        <div className="bento-feature__icon-wrap">
         <Icon name={f.icon} size={24} color="#F06922" />
        </div>
        <span className="bento-feature__title">{f.title}</span>
        <span className="bento-feature__desc">{f.desc}</span>
       </div>
      ))}
     </div>
    </div>

    {/* ── 4. STATS — Bottom left ── */}
    <div className="bento-tile bento-tile--stats bento-tile--delay-4">
     <span className="bento-tile__label">STATS</span>
     <div className="bento-stats__content">
      <div className="bento-stat__row">
       <span className="bento-stat__big-number">{statsAnimated ? '50,000+' : '0'}</span>
       <span className="bento-stat__big-label">Users</span>
      </div>
      <div className="bento-stat__row bento-stat__row--rating">
       <span className="bento-stat__rating-number">{statsAnimated ? '4.9' : '0'}</span>
       <Icon name="star" size={20} color="#F59E0B" weight="fill" />
       <div className="bento-stat__mini-chart">
        {[1, 0, 0, 1, 4].map((h, i) => (
         <div key={i} className="bento-stat__chart-bar" style={{ height: `${12 + h * 8}px` }} />
        ))}
       </div>
      </div>
      <span className="bento-stat__rating-label">Rating</span>
     </div>
    </div>

    {/* ── 3. PRICING — Middle right ── */}
    <div className="bento-tile bento-tile--pricing bento-tile--delay-3">
     <span className="bento-tile__label">PRICING</span>
     <div className="bento-pricing__content">
      <div className="bento-pricing__amount">
       <span className="bento-pricing__currency">₹</span>
       <span className="bento-pricing__number">9</span>
       <span className="bento-pricing__period">/day</span>
      </div>
      <MaterialButton className="bento-pricing__btn" onClick={() => navigate("/phone")}>
       <span>Start Free Trial</span>
      </MaterialButton>
      <MaterialButton className="bento-pricing__login-btn" onClick={() => navigate("/code")}>
       Returning User? Login
      </MaterialButton>
     </div>
    </div>

    {/* ── 6. SHOUTOUT — Full width row ── */}
    <div
     className="bento-tile bento-tile--shoutout bento-tile--delay-6"
     onClick={() => navigate("/ProductShowcaseBoard")}
     style={{ cursor: "pointer" }}
    >
     <div className="bento-shoutout__content">
      <span className="bento-shoutout__emoji">🎉</span>
      <span className="bento-shoutout__text">Public Shoutout Board</span>
      <Icon name="arrow_forward" size={20} color="#F06922" />
     </div>
    </div>
    </div>

    {/* Footer Links (Below Public Shoutout Board) */}
    <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', padding: '24px 0 40px', position: 'relative', zIndex: 10 }}>
     <button 
      onClick={() => navigate("/privacy")}
      style={{
       background: 'transparent',
       border: 'none',
       color: '#888',
       fontSize: '14px',
       fontWeight: 500,
       cursor: 'pointer',
       padding: 0
      }}
     >
      Privacy Policy
     </button>
     
     <button 
      onClick={() => navigate("/terms")}
      style={{
       background: 'transparent',
       border: 'none',
       color: '#888',
       fontSize: '14px',
       fontWeight: 500,
       cursor: 'pointer',
       padding: 0
      }}
     >
      Terms & Conditions
     </button>
    </div>

  </div>
 );
}
