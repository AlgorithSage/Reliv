import MaterialButton from '../components/material/MaterialButton';
import { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import Icon from '../utils/Icon';

export default function HelpScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const faqs = [
    {
      id: 'f1',
      category: 'Workouts & Diet',
      question: 'Can I change my celebrity coach?',
      answer: 'Yes! Go to Settings > Coach Preferences to switch between available celebrities at any time.'
    },
    {
      id: 'f2',
      category: 'Workouts & Diet',
      question: 'Is the diet plan strictly vegetarian or keto?',
      answer: 'Your AI coach adapts entirely to the dietary inputs you provided during onboarding. You can update these via your Profile.'
    },
    {
      id: 'f3',
      category: 'Squad & Partner Modes',
      question: 'How do I add a partner if I bought the "Me + Partner" plan?',
      answer: 'You will receive a unique invite link in your dashboard. Simply share that link with your partner so they can sync their account with yours.'
    },
    {
      id: 'f4',
      category: 'Squad & Partner Modes',
      question: 'Can my squad see my specific weight or health data?',
      answer: 'No, your squad members only see activity completions, current streaks, and points on the group leaderboard. Your personal health data is private.'
    },
    {
      id: 'f5',
      category: 'Billing & Account',
      question: 'How does the "Just for Today" pass work?',
      answer: 'It gives you exactly 24 hours of total access to a celebrity workout routine. There are zero recurring charges.'
    },
    {
      id: 'f6',
      category: 'Technical Issues',
      question: 'Why didn\'t my AI Coach drop today\'s message on WhatsApp?',
      answer: 'Please ensure your timezone settings are correct in your profile. If issue persists, check that you haven\'t blocked or muted our verified WhatsApp business number.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout
      title="How can we help?"
      subtitle="Find answers to your questions or get in touch with our support team."
      showBack
    >
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        
        {/* Search Bar */}
        <div style={{
          position: 'relative',
          marginBottom: 40,
        }}>
          <div style={{
            position: 'absolute',
            left: 20,
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#F06922',
            display: 'flex',
          }}>
            <Icon name="search" size={20} />
          </div>
          <input 
            type="text"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '18px 20px 18px 52px',
              borderRadius: 20,
              border: '2px solid transparent',
              background: '#FAFAF8',
              fontSize: 16,
              color: '#333',
              outline: 'none',
              boxShadow: 'inset 4px 4px 8px rgba(0,0,0,0.05), inset -4px -4px 8px rgba(255,255,255,0.8), 4px 4px 12px rgba(0,0,0,0.05), -4px -4px 12px rgba(255,255,255,0.6)',
              transition: 'all 0.3s ease',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(240, 105, 34, 0.3)';
              e.target.style.boxShadow = 'inset 4px 4px 8px rgba(0,0,0,0.05), inset -4px -4px 8px rgba(255,255,255,0.8), 0 0 0 4px rgba(240, 105, 34, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'transparent';
              e.target.style.boxShadow = 'inset 4px 4px 8px rgba(0,0,0,0.05), inset -4px -4px 8px rgba(255,255,255,0.8), 4px 4px 12px rgba(0,0,0,0.05), -4px -4px 12px rgba(255,255,255,0.6)';
            }}
          />
        </div>

        {/* FAQ Section */}
        <div style={{ marginBottom: 48 }}>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: '#111', marginBottom: 20 }}>
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
                    borderRadius: 20,
                    overflow: 'hidden',
                    boxShadow: isExpanded 
                      ? '6px 6px 16px rgba(0,0,0,0.08), -6px -6px 16px rgba(255,255,255,0.6)' 
                      : '4px 4px 10px rgba(0,0,0,0.05), -4px -4px 10px rgba(255,255,255,0.6)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <MaterialButton
                    onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                    style={{
                      width: '100%',
                      padding: '20px',
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
                    <div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#F06922', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 6 }}>
                        {faq.category}
                      </span>
                      <span style={{ fontSize: 16, fontWeight: 700, color: '#333' }}>
                        {faq.question}
                      </span>
                    </div>
                    <div style={{ 
                      color: isExpanded ? '#F06922' : '#999',
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      display: 'flex',
                    }}>
                      <Icon name="chevron_down" size={24} />
                    </div>
                  </MaterialButton>
                  
                  <div style={{
                    maxHeight: isExpanded ? 500 : 0,
                    opacity: isExpanded ? 1 : 0,
                    transition: 'all 0.3s ease',
                    padding: isExpanded ? '0 20px 20px' : '0 20px',
                  }}>
                    <div style={{ 
                      height: 1, 
                      background: 'linear-gradient(to right, rgba(0,0,0,0.05), transparent)',
                      marginBottom: 16,
                      opacity: isExpanded ? 1 : 0
                    }} />
                    <p style={{ margin: 0, color: '#666', fontSize: 15, lineHeight: 1.6 }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            }) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px 20px', 
                color: '#888',
                background: '#FAFAF8',
                borderRadius: 20,
              }}>
                <Icon name="search" size={32} color="#ccc" />
                <p style={{ marginTop: 12 }}>No questions found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Support Section */}
        <div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: '#111', marginBottom: 20 }}>
            Still need help?
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {/* WhatsApp Card */}
            <a 
              href="https://wa.me/1234567890" 
              target="_blank" 
              rel="noreferrer"
              style={{
                textDecoration: 'none',
                background: '#FAFAF8',
                borderRadius: 20,
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                boxShadow: '4px 4px 10px rgba(0,0,0,0.05), -4px -4px 10px rgba(255,255,255,0.6)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '6px 6px 14px rgba(0,0,0,0.08), -6px -6px 14px rgba(255,255,255,0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '4px 4px 10px rgba(0,0,0,0.05), -4px -4px 10px rgba(255,255,255,0.6)';
              }}
            >
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 16,
                background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
                color: '#2E7D32',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </div>
              <div>
                <h4 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 700, color: '#111' }}>WhatsApp Us</h4>
                <p style={{ margin: 0, fontSize: 13, color: '#666' }}>Usually replies instantly</p>
              </div>
            </a>

            {/* Email Card */}
            <a 
              href="mailto:support@reliv.ai" 
              style={{
                textDecoration: 'none',
                background: '#FAFAF8',
                borderRadius: 20,
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                boxShadow: '4px 4px 10px rgba(0,0,0,0.05), -4px -4px 10px rgba(255,255,255,0.6)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '6px 6px 14px rgba(0,0,0,0.08), -6px -6px 14px rgba(255,255,255,0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '4px 4px 10px rgba(0,0,0,0.05), -4px -4px 10px rgba(255,255,255,0.6)';
              }}
            >
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 16,
                background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)',
                color: '#F06922',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div>
                <h4 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 700, color: '#111' }}>Email Support</h4>
                <p style={{ margin: 0, fontSize: 13, color: '#666' }}>Replies within 2-4 hours</p>
              </div>
            </a>
          </div>
        </div>

      </div>
    </Layout>
  );
}
