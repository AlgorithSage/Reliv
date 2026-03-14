import { useState, useEffect } from 'react';
import { C } from '../utils/constants';
import Icon from '../utils/Icon';
import AntigravityBackground from './AntigravityBackground';
import { useNavStack } from '../contexts/NavigationStack';

// ═══ ANTIGRAVITY BACKGROUND FLAG ═══
// Set to true to show the floating dotted glassmorphic background
// Set to false to hide it (just the gradient background)
const ENABLE_ANTIGRAVITY = false;

export default function Layout({ children, title, subtitle, showBack, onBack }) {
 const [scrolled, setScrolled] = useState(false);
 const [pageLoaded, setPageLoaded] = useState(false);
 const { goBack } = useNavStack();

 // Use explicit onBack if provided, otherwise use stack-based LIFO goBack
 const handleBack = onBack || goBack;

 useEffect(() => {
  setPageLoaded(true);
  const handleScroll = () => setScrolled(window.scrollY > 20);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 return (
  <div style={{
   minHeight: '100vh',
   background: '#E4E0DC',
   fontFamily: "'Inter', 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
   position: 'relative',
  }}>
   {/* ═══ NEOMORPHIC HEADER ═══ */}
   <header
    style={{
     position: 'sticky',
     top: 0,
     zIndex: 1000,
     background: '#FAFAF8',
     padding: scrolled ? '10px 40px' : '14px 40px',
     boxShadow: scrolled
      ? '6px 6px 16px rgba(0, 0, 0, 0.1), -6px -6px 16px rgba(255, 255, 255, 0.5)'
      : '4px 4px 12px rgba(0, 0, 0, 0.08), -4px -4px 12px rgba(255, 255, 255, 0.6)',
     transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
     borderRadius: scrolled ? 0 : '0 0 24px 24px',
    }}
   >
    <div style={{
     maxWidth: 1200,
     margin: '0 auto',
     display: 'flex',
     alignItems: 'center',
     gap: 20,
    }}>
      {/* Back Button — Neomorphic (uses stack-based LIFO goBack) */}
      {showBack && (
       <button
        onClick={handleBack}
        style={{
         display: 'flex',
         alignItems: 'center',
         gap: 10,
         background: '#EFECE9',
         border: 'none',
         borderRadius: 16,
         padding: '14px 28px',
         fontSize: 17,
         fontWeight: 700,
         color: '#F06922',
         cursor: 'pointer',
         transition: 'all 0.3s ease',
         boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1), -4px -4px 10px rgba(255, 255, 255, 0.6)',
         fontFamily: 'inherit',
        }}
        onMouseEnter={(e) => {
         e.currentTarget.style.background = '#F06922';
         e.currentTarget.style.color = '#fff';
         e.currentTarget.style.transform = 'translateY(-2px)';
         e.currentTarget.style.boxShadow = '0 8px 24px rgba(240, 105, 34, 0.25)';
        }}
        onMouseLeave={(e) => {
         e.currentTarget.style.background = '#EFECE9';
         e.currentTarget.style.color = '#F06922';
         e.currentTarget.style.transform = 'translateY(0)';
         e.currentTarget.style.boxShadow = '4px 4px 10px rgba(0, 0, 0, 0.1), -4px -4px 10px rgba(255, 255, 255, 0.6)';
        }}
        onMouseDown={(e) => {
         e.currentTarget.style.boxShadow = 'inset 3px 3px 8px rgba(0, 0, 0, 0.1), inset -3px -3px 8px rgba(255, 255, 255, 0.5)';
         e.currentTarget.style.transform = 'translateY(0) scale(0.97)';
        }}
        onMouseUp={(e) => {
         e.currentTarget.style.background = '#F06922';
         e.currentTarget.style.color = '#fff';
         e.currentTarget.style.boxShadow = '0 8px 24px rgba(240, 105, 34, 0.25)';
         e.currentTarget.style.transform = 'translateY(0)';
        }}
       >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
         <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back
       </button>
     )}

     {/* Logo & Brand */}
     <div style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: showBack ? 'center' : 'flex-start',
      gap: 16,
     }}>
      <div style={{
       position: 'relative',
       display: 'flex',
       alignItems: 'center',
        gap: 14,
        cursor: 'pointer',
       }}
       onClick={() => { window.location.href = '/'; }}
       title="Go to Home"
      >
       {/* Logo — Neomorphic */}
       <div style={{ position: 'relative' }}>
        <img
         src="/relivlogo.jpeg"
         alt="Reliv AI"
         style={{
          width: scrolled ? 42 : 48,
          height: scrolled ? 42 : 48,
          borderRadius: 14,
          border: 'none',
          objectFit: 'cover',
          position: 'relative',
          zIndex: 1,
          transition: 'all 0.3s ease',
          boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1), -4px -4px 10px rgba(255, 255, 255, 0.6)',
         }}
        />
       </div>

       {/* Brand Name */}
       <div>
        <h1 style={{
         fontSize: scrolled ? 22 : 26,
         fontWeight: 800,
         background: 'linear-gradient(135deg, #1a1a1a 0%, #F06922 100%)',
         WebkitBackgroundClip: 'text',
         WebkitTextFillColor: 'transparent',
         backgroundClip: 'text',
         letterSpacing: '-0.5px',
         margin: 0,
         transition: 'all 0.3s ease',
         display: 'flex',
         alignItems: 'center',
         gap: 8,
        }}>
         Reliv AI
         <span style={{
          fontSize: 10,
          fontWeight: 700,
          background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
          WebkitBackgroundClip: 'initial',
          WebkitTextFillColor: 'initial',
          color: '#FFFFFF',
          padding: '4px 10px',
          borderRadius: 20,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          boxShadow: '2px 2px 6px rgba(240, 105, 34, 0.3), -2px -2px 6px rgba(255, 255, 255, 0.3)',
         }}>
          Beta
         </span>
        </h1>
        <p style={{
         fontSize: 12,
         color: '#888',
         margin: '2px 0 0',
         fontWeight: 500,
         transition: 'all 0.3s ease',
        }}>
         Your Personal AI Health Coach
        </p>
       </div>
      </div>
     </div>

     {/* Desktop Nav — Help Button Neomorphic */}
     <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
     }}>
      <button
       style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: '#EFECE9',
        border: 'none',
        borderRadius: 16,
        padding: '14px 28px',
        fontSize: 17,
        fontWeight: 700,
        color: '#666',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.08), -4px -4px 10px rgba(255, 255, 255, 0.6)',
        fontFamily: 'inherit',
       }}
       onMouseEnter={(e) => {
        e.currentTarget.style.background = '#F06922';
        e.currentTarget.style.color = '#fff';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(240, 105, 34, 0.25)';
       }}
       onMouseLeave={(e) => {
        e.currentTarget.style.background = '#EFECE9';
        e.currentTarget.style.color = '#666';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '4px 4px 10px rgba(0, 0, 0, 0.08), -4px -4px 10px rgba(255, 255, 255, 0.6)';
       }}
       onMouseDown={(e) => {
        e.currentTarget.style.boxShadow = 'inset 3px 3px 8px rgba(0, 0, 0, 0.1), inset -3px -3px 8px rgba(255, 255, 255, 0.5)';
        e.currentTarget.style.transform = 'translateY(0) scale(0.97)';
       }}
       onMouseUp={(e) => {
        e.currentTarget.style.background = '#F06922';
        e.currentTarget.style.color = '#fff';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(240, 105, 34, 0.25)';
        e.currentTarget.style.transform = 'translateY(0)';
       }}
      >
       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <path d="M12 17h.01"></path>
       </svg>
       Help
      </button>
     </div>
    </div>
   </header>

   {/* ═══ MAIN CONTENT ═══ */}
   <main style={{
    maxWidth: 900,
    margin: '0 auto',
    padding: '48px 40px 100px',
    opacity: pageLoaded ? 1 : 0,
    transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)',
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
   }}>
    {/* Page Title & Subtitle */}
    {(title || subtitle) && (
     <div style={{
      textAlign: 'center',
      marginBottom: 40,
      opacity: pageLoaded ? 1 : 0,
      transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.5s ease 0.1s',
     }}>
      {title && (
       <h2 style={{
        fontSize: 36,
        fontWeight: 800,
        color: '#111111',
        marginBottom: 12,
        letterSpacing: '-1px',
        lineHeight: 1.2,
       }}>
        {title}
       </h2>
      )}
      {subtitle && (
       <p style={{
        fontSize: 17,
        color: '#666666',
        lineHeight: 1.6,
        maxWidth: 500,
        margin: '0 auto',
       }}>
        {subtitle}
       </p>
      )}
     </div>
    )}

    {/* Page Content */}
    <div style={{
     opacity: pageLoaded ? 1 : 0,
     transform: pageLoaded ? 'translateY(0)' : 'translateY(30px)',
     transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.15s',
    }}>
     {children}
    </div>
   </main>

   {/* ═══ NEOMORPHIC FOOTER ═══ */}
   <footer style={{
    background: '#EFECE9',
    padding: '24px 40px',
    textAlign: 'center',
    boxShadow: 'inset 2px 2px 6px rgba(0, 0, 0, 0.05), inset -2px -2px 6px rgba(255, 255, 255, 0.5)',
   }}>
    <div style={{
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center',
     gap: 24,
     fontSize: 13,
     color: '#9CA3AF',
    }}><Icon name="credit_card" size={18} />
     <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      Bank-Grade Security
     </span>
     <span>•</span>
     <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      50,000+ Happy Users
     </span>
     <span>•</span>
     <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      Secure Payments
     </span>
    </div>
    <p style={{
     fontSize: 12,
     color: '#D1D5DB',
     marginTop: 16,
    }}>
     © 2025 Reliv AI. All rights reserved.
    </p>
   </footer>
  </div>
 );
}
