import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../utils/Icon';

export default function CoachChatScreen() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Hi! I'm your Reliv AI Health Coach 👋\n\nI can help you build your diet plan, suggest workouts, or just answer any health questions you might have. How can I help you today?"
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setInput('');
        
        // Add user message to UI
        const newMessages = [...messages, { role: 'user', content: userMessage }];
        setMessages(newMessages);
        setLoading(true);

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
            const res = await fetch(`${API_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    // Send previous conversation history to keep context
                    messages: newMessages.map(m => ({ role: m.role, content: m.content })) 
                })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to get response');

            // Add coach response to UI
            setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
            
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: "I'm having a little trouble connecting right now. Please try again in a moment! 🤒" 
            }]);
        } finally {
            setLoading(false);
            // Refocus input
            setTimeout(() => {
                const inputEl = document.getElementById('chat-input');
                if (inputEl) inputEl.focus();
            }, 10);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100dvh',
            backgroundColor: '#FAFAFA',
            fontFamily: '"Outfit", sans-serif',
            overflow: 'hidden'
        }}>
            {/* ═══ Header ═══ */}
            <div style={{
                padding: '20px',
                background: '#fff',
                borderBottom: '1px solid #E5E7EB',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                zIndex: 10
            }}>
                <button 
                    onClick={() => navigate(-1)}
                    style={{
                        background: '#F3F4F6',
                        border: 'none',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                    }}
                    onMouseOver={e => e.currentTarget.style.background = '#E5E7EB'}
                    onMouseOut={e => e.currentTarget.style.background = '#F3F4F6'}
                >
                    <Icon name="back" size={20} color="#374151" />
                </button>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #F06922, #FF8C4B)',
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        border: '2px solid #FFF',
                        boxShadow: '0 4px 8px rgba(240, 105, 34, 0.2)'
                    }}>
                        <img 
                            src="/avatar-removebg-preview.png" 
                            alt="Coach" 
                            style={{ width: '85%', objectFit: 'cover' }}
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>AI Health Coach</h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#059669', fontWeight: 500 }}>
                            <span style={{ width: 8, height: 8, background: '#10B981', borderRadius: '50%', display: 'inline-block' }}></span>
                            Online
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══ Chat Area ═══ */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
            }}>
                {messages.map((m, idx) => (
                    <div key={idx} style={{
                        alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                        maxWidth: '85%',
                        display: 'flex',
                        gap: '12px',
                        flexDirection: m.role === 'user' ? 'row-reverse' : 'row',
                        alignItems: 'flex-end'
                    }}>
                        {m.role === 'assistant' && (
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: '#FFEEDD',
                                flexShrink: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid #FFE0C5'
                            }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F06922" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                            </div>
                        )}
                        <div style={{
                            background: m.role === 'user' ? 'linear-gradient(135deg, var(--primary), var(--primary-dark))' : 'var(--cream-200)',
                            color: m.role === 'user' ? 'var(--cream-50)' : 'var(--gray-900)',
                            padding: '14px 18px',
                            borderRadius: m.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            fontSize: '15px',
                            lineHeight: '1.5',
                            border: m.role === 'assistant' ? '1px solid var(--cream-300)' : 'none',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word'
                        }}>
                            {m.content}
                        </div>
                    </div>
                ))}

                {/* Loading indicator */}
                {loading && (
                    <div style={{
                        alignSelf: 'flex-start',
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'var(--cream-300)',
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                        </div>
                        <div style={{
                            background: 'var(--cream-200)',
                            border: '1px solid var(--cream-300)',
                            padding: '16px 20px',
                            borderRadius: '20px 20px 20px 4px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            display: 'flex',
                            gap: '6px'
                        }}>
                            <span className="dot-typing" style={dotStyle(0)}></span>
                            <span className="dot-typing" style={dotStyle(0.2)}></span>
                            <span className="dot-typing" style={dotStyle(0.4)}></span>
                        </div>
                    </div>
                )}
                
                <div ref={messagesEndRef} />
            </div>

            {/* ═══ Input Area ═══ */}
            <form 
                onSubmit={handleSend}
                style={{
                    padding: '20px 24px',
                    margin: '0 16px 16px',
                    background: '#FFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '28px',
                    display: 'flex',
                    gap: '14px',
                    alignItems: 'flex-end',
                    boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.06), 0 4px 16px rgba(0, 0, 0, 0.04)',
                    paddingBottom: 'max(20px, env(safe-area-inset-bottom))'
                }}
            >
                <div style={{
                    flex: 1,
                    background: '#F3F4F6',
                    borderRadius: '20px',
                    padding: '6px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    border: '1.5px solid #E5E7EB',
                    transition: 'border-color 0.2s',
                }}>
                    <textarea 
                        id="chat-input"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend(e);
                            }
                        }}
                        placeholder="Type your message..."
                        disabled={loading}
                        style={{
                            width: '100%',
                            background: 'transparent',
                            border: 'none',
                            color: '#1F2937',
                            fontSize: '16px',
                            resize: 'none',
                            height: '44px',
                            maxHeight: '140px',
                            padding: '10px 0',
                            outline: 'none',
                            fontFamily: 'inherit',
                            lineHeight: '24px',
                        }}
                        rows={1}
                        // Auto-resize textarea
                        ref={(el) => {
                            if (el) {
                                el.style.height = '44px';
                                el.style.height = Math.min(el.scrollHeight, 140) + 'px';
                            }
                        }}
                        onFocus={e => {
                            e.target.parentElement.style.borderColor = '#F06922';
                        }}
                        onBlur={e => {
                            e.target.parentElement.style.borderColor = '#E5E7EB';
                        }}
                    />
                </div>
                <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    style={{
                        background: input.trim() && !loading 
                            ? 'linear-gradient(135deg, #F06922, #E85C25)' 
                            : '#E5E7EB',
                        border: 'none',
                        width: '54px',
                        height: '54px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: input.trim() && !loading ? 'pointer' : 'default',
                        transition: 'all 0.25s ease',
                        flexShrink: 0,
                        boxShadow: input.trim() && !loading 
                            ? '0 4px 14px rgba(240, 105, 34, 0.3)' 
                            : 'none',
                    }}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                </button>
            </form>
            
            <style jsx="true">{`
                @keyframes typing {
                    0%, 100% { transform: translateY(0); opacity: 0.5; }
                    50% { transform: translateY(-4px); opacity: 1; }
                }
            `}</style>
        </div>
    );
}

const dotStyle = (delay) => ({
    width: '6px',
    height: '6px',
    background: '#F06922',
    borderRadius: '50%',
    animation: 'typing 1s infinite ease-in-out',
    animationDelay: `${delay}s`
});
