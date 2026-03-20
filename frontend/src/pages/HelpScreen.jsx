import MaterialButton from '../components/material/MaterialButton';
import { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import Icon from '../utils/Icon';
import { useNavigate } from 'react-router-dom';

export default function HelpScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  const faqs = [
    {
      id: 'f1',
      category: 'Workouts & Diet',
      question: 'Can I change my celebrity coach?',
      answer: 'Yes! Go to Settings > Coach Preferences to switch between available celebrities at any time. Your past data will easily sync with the new coach.'
    },
    {
      id: 'f2',
      category: 'Workouts & Diet',
      question: 'Is the diet plan strictly vegetarian or keto?',
      answer: 'Your AI coach adapts entirely to the dietary inputs you provided during onboarding. You can update these preferences via your Profile at any point to switch dietary styles.'
    },
    {
      id: 'f3',
      category: 'Squad & Partner Modes',
      question: 'How do I add a partner if I bought the "Me + Partner" plan?',
      answer: 'You will receive a unique invite link in your dashboard. Simply click "Invite Partner", copy the link, and share it. Once they sign up using that link, your accounts will be synced.'
    },
    {
      id: 'f4',
      category: 'Squad & Partner Modes',
      question: 'Can my squad see my specific weight or health data?',
      answer: 'No, your squad members only see activity completions, current streaks, and points on the group leaderboard. Your personal sensitive health data is 100% private.'
    },
    {
      id: 'f5',
      category: 'Billing & Account',
      question: 'How does the "Just for Today" pass work?',
      answer: 'It gives you exactly 24 hours of total premium access without any commitments. It is a one-time purchase with absolutely zero hidden recurring charges.'
    },
    {
      id: 'f6',
      category: 'Technical Issues',
      question: 'Why didn\'t my AI Coach drop today\'s message on WhatsApp?',
      answer: 'Please ensure your timezone settings are correct in your profile. If the issue persists, check that you haven\'t blocked or muted our verified WhatsApp business number.'
    }
  ];

  const categories = ['All', ...Array.from(new Set(faqs.map(f => f.category)))];

  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, faqs]);

  return (
    <Layout
      title="How can we help?"
      subtitle="Find answers to your questions or get in touch with our support team."
      showBack
    >
      <div style={{ maxWidth: 680, margin: '0 auto', fontFamily: "'Outfit', 'Inter', sans-serif" }}>
        
        {/* ═══ Search Bar ═══ */}
        <div style={{
          position: 'relative',
          marginBottom: 32,
        }}>
          <div style={{
            position: 'absolute',
            left: 24,
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#F06922',
            display: 'flex',
          }}>
            <Icon name="search" size={22} />
          </div>
          <input 
            type="text"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '24px 24px 24px 64px',
              borderRadius: 24,
              border: '2px solid transparent',
              background: '#FAFAF8',
              fontSize: 18,
              fontWeight: 500,
              color: '#333',
              outline: 'none',
              boxShadow: 'inset 4px 4px 10px rgba(0,0,0,0.04), inset -4px -4px 10px rgba(255,255,255,0.9), 6px 6px 20px rgba(0,0,0,0.06), -6px -6px 20px rgba(255,255,255,0.7)',
              transition: 'all 0.3s ease',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(240, 105, 34, 0.4)';
              e.target.style.boxShadow = 'inset 4px 4px 8px rgba(0,0,0,0.05), inset -4px -4px 8px rgba(255,255,255,0.8), 0 0 0 4px rgba(240, 105, 34, 0.15)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'transparent';
              e.target.style.boxShadow = 'inset 4px 4px 10px rgba(0,0,0,0.04), inset -4px -4px 10px rgba(255,255,255,0.9), 6px 6px 20px rgba(0,0,0,0.06), -6px -6px 20px rgba(255,255,255,0.7)';
            }}
          />
        </div>

        {/* ═══ Category Filter Tabs ═══ */}
        <div style={{
          display: 'flex',
          gap: 12,
          overflowX: 'auto',
          paddingBottom: 20,
          marginBottom: 24,
          scrollbarWidth: 'none', // Firefox
          WebkitOverflowScrolling: 'touch',
        }}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '12px 24px',
                  borderRadius: 30,
                  fontSize: 15,
                  fontWeight: isActive ? 700 : 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: isActive ? 'none' : '1px solid #E5E7EB',
                  background: isActive ? 'linear-gradient(135deg, #F06922, #FF8C4B)' : '#FAFAF8',
                  color: isActive ? '#FFF' : '#666',
                  boxShadow: isActive ? '0 6px 16px rgba(240, 105, 34, 0.25)' : '4px 4px 10px rgba(0,0,0,0.04)',
                  transition: 'all 0.3s ease',
                  flexShrink: 0,
                }}
                onMouseOver={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#111';
                    e.currentTarget.style.borderColor = '#D1D5DB';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#666';
                    e.currentTarget.style.borderColor = '#E5E7EB';
                  }
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ═══ FAQ Accordion Section ═══ */}
        <div style={{ marginBottom: 56 }}>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: '#111', marginBottom: 24, letterSpacing: '-0.5px' }}>
            Frequently Asked Questions
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filteredFaqs.length > 0 ? filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              
              return (
                <div 
                  key={faq.id}
                  style={{
                    background: '#FAFAF8',
                    borderRadius: 24,
                    overflow: 'hidden',
                    border: '1px solid #E5E7EB',
                    boxShadow: isExpanded 
                      ? '6px 6px 20px rgba(0,0,0,0.08), -6px -6px 20px rgba(255,255,255,0.7)' 
                      : '4px 4px 12px rgba(0,0,0,0.03), -4px -4px 12px rgba(255,255,255,0.5)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  onMouseOver={(e) => !isExpanded && (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseOut={(e) => !isExpanded && (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                    style={{
                      width: '100%',
                      padding: '24px 32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: 'inherit',
                      outline: 'none',
                    }}
                  >
                    <div style={{ paddingRight: 24 }}>
                      <div style={{ 
                        display: 'inline-block',
                        background: '#FFF7F0',
                        color: '#F06922',
                        padding: '6px 12px',
                        borderRadius: 12,
                        fontSize: 12, 
                        fontWeight: 700, 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.5px', 
                        marginBottom: 12 
                      }}>
                        {faq.category}
                      </div>
                      <span style={{ 
                        fontSize: 18, 
                        fontWeight: 700, 
                        color: isExpanded ? '#F06922' : '#222',
                        display: 'block',
                        lineHeight: 1.4,
                        transition: 'color 0.3s ease'
                      }}>
                        {faq.question}
                      </span>
                    </div>
                    <div style={{ 
                      color: isExpanded ? '#F06922' : '#999',
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      background: isExpanded ? '#FFF7F0' : '#F3F4F6',
                      padding: 8,
                      borderRadius: '50%',
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </button>
                  
                  <div style={{
                    maxHeight: isExpanded ? 500 : 0,
                    opacity: isExpanded ? 1 : 0,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    padding: isExpanded ? '0 32px 32px' : '0 32px',
                  }}>
                    <div style={{ 
                      height: 1, 
                      background: 'linear-gradient(to right, rgba(240, 105, 34, 0.1), transparent)',
                      marginBottom: 20,
                      opacity: isExpanded ? 1 : 0
                    }} />
                    <p style={{ margin: 0, color: '#555', fontSize: 16, lineHeight: 1.6, fontWeight: 400 }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            }) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '60px 20px', 
                color: '#888',
                background: '#FAFAF8',
                borderRadius: 24,
                border: '1px dashed #D1D5DB'
              }}>
                <Icon name="search" size={40} color="#ccc" />
                <p style={{ marginTop: 16, fontSize: 18, fontWeight: 500 }}>No results found for "{searchQuery}"</p>
                <p style={{ marginTop: 8, fontSize: 15 }}>Try adjusting your search or category filter.</p>
              </div>
            )}
          </div>
        </div>

        {/* ═══ Contact Support Section (CTA) ═══ */}
        <div style={{
          background: 'linear-gradient(145deg, #FFF7F0 0%, #FAFAF8 100%)',
          borderRadius: 32,
          padding: '48px 40px',
          textAlign: 'center',
          boxShadow: '6px 6px 24px rgba(0,0,0,0.04), -6px -6px 24px rgba(255,255,255,0.8)',
          border: '1px solid #FFE0C5',
          marginBottom: 40
        }}>
          <div style={{
            width: 72,
            height: 72,
            background: 'linear-gradient(135deg, #F06922, #FF8C4B)',
            borderRadius: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 8px 24px rgba(240, 105, 34, 0.3)'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <h3 style={{ fontSize: 28, fontWeight: 800, color: '#111', margin: '0 0 16px', letterSpacing: '-0.5px' }}>
            Still need help?
          </h3>
          <p style={{ fontSize: 16, color: '#666', margin: '0 0 32px', lineHeight: 1.6, maxWidth: 400, marginInline: 'auto' }}>
            Can't find the answer you're looking for? Chat with our AI Health Coach or reach out to our dedicated support team.
          </p>
          
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/coach')}
              style={{
                background: 'linear-gradient(135deg, #F06922, #E85C25)',
                color: '#FFF',
                border: 'none',
                padding: '16px 32px',
                borderRadius: 16,
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(240, 105, 34, 0.25)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 10
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"></path>
                <path d="M12 8v4l3 3"></path>
              </svg>
              Chat with AI
            </button>
            <a
              href="mailto:support@reliv.ai"
              style={{
                background: '#FFF',
                color: '#F06922',
                border: '2px solid #FFE0C5',
                padding: '14px 32px', // Slight adjustment for border
                borderRadius: 16,
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 10
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = '#F06922';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(240, 105, 34, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#FFE0C5';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Email Support
            </a>
          </div>
        </div>

      </div>
    </Layout>
  );
}
