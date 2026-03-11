import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Icon from '../utils/Icon';

export default function MealTimeScreen() {
 const navigate = useNavigate();
 const [times, setTimes] = useState({
        breakfast: '08:00',
        lunch: '13:00',
        dinner: '20:00',
 });
 const [showForm, setShowForm] = useState(false);

 useEffect(() => {
        setTimeout(() => setShowForm(true), 100);
 }, []);

 const handleContinue = () => {
        localStorage.setItem('mealTimes', JSON.stringify(times));
        navigate('/summary');
 };

 const meals = [
        { key: 'breakfast', label: 'Breakfast', icon: 'sunrise', desc: 'Start your day right' },
        { key: 'lunch', label: 'Lunch', icon: 'sun', desc: 'Midday fuel' },
        { key: 'dinner', label: 'Dinner', icon: 'moon', desc: 'Evening nourishment' },
 ];

 return (
        <Layout
            title="Meal Timings"
            subtitle="When do you usually eat?"
            showBack
            onBack={() => navigate('/goal')}
        >
            <div style={{ maxWidth: 550, margin: '0 auto' }}>
                {/* Info */}
                <div style={{
                    background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)',
                    borderRadius: 16,
                    padding: '18px 24px',
                    marginBottom: 32,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    border: 'none',
                    opacity: showForm ? 1 : 0,
                    transform: showForm ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'all 0.5s ease',
                }}>
                    <span style={{ fontSize: 24 }}>⏰</span>
                    <p style={{ fontSize: 14, color: '#666', margin: 0, lineHeight: 1.5 }}>
                        We'll send WhatsApp reminders 30 minutes before each meal.
                    </p>
                </div>

                {/* Meal Time Inputs */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20,
                    marginBottom: 40,
                }}>
                    {meals.map((meal, i) => (
                        <div
                            key={meal.key}
                            style={{
                                background: '#FAFAF8',
                                borderRadius: 18,
                                padding: '24px 28px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 20,
                                border: 'none',
                                boxShadow: '6px 6px 16px rgba(0,0,0,0.1), -6px -6px 16px rgba(255,255,255,0.6)',
                                opacity: showForm ? 1 : 0,
                                transform: showForm ? 'translateY(0)' : 'translateY(20px)',
                                transition: 'all 0.4s ease',
                                transitionDelay: `${i * 0.1}s`,
                            }}
                        >
                            {/* Icon */}
                            <Icon name={meal.icon} size={30} />

                            {/* Content */}
                            <div style={{ flex: 1 }}>
                                <p style={{
                                    fontSize: 17,
                                    fontWeight: 700,
                                    color: '#111',
                                    marginBottom: 4,
                                }}>
                                    {meal.label}
                                </p>
                                <p style={{ fontSize: 13, color: '#9CA3AF' }}>{meal.desc}</p>
                            </div>

                            {/* Time Input */}
                            <input
                                type="time"
                                value={times[meal.key]}
                                onChange={(e) => setTimes(prev => ({ ...prev, [meal.key]: e.target.value }))}
                                style={{
                                    background: '#F5F5F5',
                                    border: 'none',
                                    borderRadius: 12,
                                    padding: '14px 16px',
                                    fontSize: 16,
                                    fontWeight: 600,
                                    color: '#F06922',
                                    outline: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#F06922';
                                    e.target.style.boxShadow = '0 0 0 4px rgba(240, 105, 34, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#E5E7EB';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* Continue Button */}
                <button
                    onClick={handleContinue}
                    style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
                        border: 'none',
                        borderRadius: 16,
                        padding: '20px',
                        fontSize: 18,
                        fontWeight: 700,
                        color: '#FFFFFF',
                        cursor: 'pointer',
                        boxShadow: '8px 8px 22px rgba(0,0,0,0.18), -6px -6px 18px rgba(255,255,255,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 12,
                        opacity: showForm ? 1 : 0,
                        transform: showForm ? 'translateY(0)' : 'translateY(10px)',
                        transitionDelay: '0.4s',
                    }}
                >
                    Review Plan Summary
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </Layout>
 );
}
