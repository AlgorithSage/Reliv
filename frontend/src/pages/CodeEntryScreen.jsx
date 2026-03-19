import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { auth } from '../utils/firebase';
import { signInWithCustomToken } from 'firebase/auth';
import { loginWithCode } from '../utils/authApi';
import Icon from '../utils/Icon';
import MaterialButton from '../components/material/MaterialButton';

export default function CodeEntryScreen() {
    const navigate = useNavigate();
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const inputRefs = useRef([]);
    const continueBtnRef = useRef(null);
    const hasFailedOnce = useRef(false);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (i, val) => {
        const chars = val.toUpperCase();
        if (!chars) {
            const newCode = [...code];
            newCode[i] = '';
            setCode(newCode);
            setError('');
            return;
        }

        // Handle paste / multi-digit input
        if (chars.length > 1) {
            const newCode = [...code];
            for (let offset = 0; offset < chars.length && i + offset < newCode.length; offset++) {
                newCode[i + offset] = chars[offset];
            }
            setCode(newCode);
            setError('');
            const lastIdx = Math.min(i + chars.length - 1, newCode.length - 1);
            if (newCode.every(d => d !== '') && !hasFailedOnce.current) {
                setTimeout(() => continueBtnRef.current?.click(), 250);
            } else if (lastIdx < newCode.length - 1) {
                inputRefs.current[lastIdx + 1]?.focus();
            }
            return;
        }

        const newCode = [...code];
        newCode[i] = chars[0];
        setCode(newCode);
        setError('');

        if (chars[0] && i < 5) {
            inputRefs.current[i + 1]?.focus();
        }

        // Auto-submit when all 6 characters filled (first attempt only)
        if (chars[0] && i === 5 && newCode.every(d => d !== '') && !hasFailedOnce.current) {
            setTimeout(() => continueBtnRef.current?.click(), 250);
        }
    };

    const handleKeyDown = (i, e) => {
        if (e.key === 'Backspace' && !code[i] && i > 0) {
            inputRefs.current[i - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').trim().toUpperCase().slice(0, 6);
        const newCode = [...code];
        for (let i = 0; i < pasted.length; i++) {
            newCode[i] = pasted[i];
        }
        setCode(newCode);
        if (pasted.length === 6) {
            inputRefs.current[5]?.focus();
            if (!hasFailedOnce.current) {
                setTimeout(() => continueBtnRef.current?.click(), 250);
            }
        }
    };

    const handleSubmit = async () => {
        const accessCode = code.join('');
        if (accessCode.length !== 6) return;

        setLoading(true);
        setError('');

        try {
            // 1. Look up user by access code via backend
            const result = await loginWithCode(accessCode);

            // 2. Sign into Firebase with custom token
            await signInWithCustomToken(auth, result.customToken);

            // 3. Store auth data locally
            const user = auth.currentUser;
            localStorage.setItem('token', await user.getIdToken());
            localStorage.setItem('userId', result.uid);
            localStorage.setItem('accessCode', result.accessCode);
            localStorage.setItem('phone', result.phone);
            localStorage.setItem('userType', 'returning');

            // 4. Navigate based on subscription status
            const subStatus = result.userData?.subscriptionStatus;
            if (subStatus === 'active') {
                navigate('/return-active');
            } else if (subStatus === 'expired') {
                navigate('/return-expired');
            } else {
                navigate('/return-active');
            }
        } catch (err) {
            console.error('Code login error:', err);
            hasFailedOnce.current = true;
            setError(err.message || 'Code not found');
            setLoading(false);
        }
    };

    const isComplete = code.every(d => d);

    return (
        <Layout
            title="Welcome Back!"
            subtitle="Enter your 6-digit access code to continue"
            showBack
        >
            <div style={{ maxWidth: 520, margin: '0 auto' }}>
                {/* Main Card */}
                <div style={{
                    background: '#FAFAF8',
                    borderRadius: 28,
                    padding: '48px 44px',
                    boxShadow: '12px 12px 28px rgba(0,0,0,0.12), -12px -12px 28px rgba(255,255,255,0.65)',
                    border: 'none',
                    textAlign: 'center',
                }}>
                    {/* Icon */}
                    <div style={{
                        width: 90,
                        height: 90,
                        background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)',
                        borderRadius: 26,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 28px',
                        border: '1px solid rgba(240, 105, 34, 0.15)',
                        fontSize: 44,
                    }}>
                        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#F06922" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0px 4px 8px rgba(240,105,34,0.3))' }}>
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                            <path d="M12 15v2" />
                        </svg>
                    </div>

                    {/* Info */}
                    <p style={{
                        fontSize: 13,
                        color: '#9CA3AF',
                        marginBottom: 28,
                    }}>
                        Enter the code you received on WhatsApp when you first registered
                    </p>

                    {/* Code Input Boxes — 6 digits */}
                    <div
                        style={{
                            display: 'flex',
                            gap: 12,
                            justifyContent: 'center',
                            marginBottom: 28,
                        }}
                        onPaste={handlePaste}
                    >
                        {code.map((d, i) => (
                            <input
                                key={i}
                                ref={(el) => inputRefs.current[i] = el}
                                type="text"
                                maxLength="1"
                                value={d}
                                onChange={(e) => handleChange(i, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(i, e)}
                                style={{
                                    width: 52,
                                    height: 72,
                                    background: d ? 'linear-gradient(135deg, #FFFAF7 0%, #FFF5F0 100%)' : '#FAFAFA',
                                    border: `3px solid ${d ? '#F06922' : error ? '#EF4444' : '#E5E7EB'}`,
                                    borderRadius: 18,
                                    fontSize: 30,
                                    fontWeight: 800,
                                    color: '#111111',
                                    textAlign: 'center',
                                    outline: 'none',
                                    transition: 'all 0.3s ease',
                                    boxShadow: d ? '0 8px 30px rgba(240, 105, 34, 0.15)' : 'none',
                                    caretColor: '#F06922',
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#F06922';
                                    e.target.style.boxShadow = '0 0 0 4px rgba(240, 105, 34, 0.15)';
                                    e.target.style.transform = 'scale(1.05)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = d ? '#F06922' : '#E5E7EB';
                                    e.target.style.boxShadow = d ? '0 8px 30px rgba(240, 105, 34, 0.15)' : 'none';
                                    e.target.style.transform = 'scale(1)';
                                }}
                            />
                        ))}
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div style={{
                            background: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
                            border: '1px solid #EF4444',
                            borderRadius: 14,
                            padding: '16px 20px',
                            marginBottom: 24,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 10,
                            animation: 'shake 0.5s ease',
                        }}>
                            <div>
                                <p style={{ fontSize: 14, color: '#DC2626', fontWeight: 600, margin: 0 }}>{error}</p>
                                <p style={{ fontSize: 12, color: '#9CA3AF', margin: '4px 0 0' }}>
                                    Check your WhatsApp for the code
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Continue Button */}
                    <button
                        ref={continueBtnRef}
                        disabled={loading || !isComplete}
                        onClick={handleSubmit}
                        style={{
                            width: '100%',
                            height: 56,
                            background: isComplete
                                ? 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)'
                                : 'linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)',
                            border: 'none',
                            borderRadius: 16,
                            fontSize: 18,
                            fontWeight: 700,
                            color: isComplete ? '#FFFFFF' : '#9CA3AF',
                            cursor: isComplete && !loading ? 'pointer' : 'not-allowed',
                            boxShadow: isComplete ? '0 10px 40px rgba(240, 105, 34, 0.35)' : 'none',
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
                                    display: 'inline-block',
                                }} />
                                Logging in...
                            </>
                        ) : 'Continue'}
                    </button>

                    {/* Divider */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                        margin: '28px 0',
                        color: '#9CA3AF',
                        fontSize: 13,
                    }}>
                        <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
                        <span>or</span>
                        <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
                    </div>

                    {/* New User Button */}
                    <MaterialButton
                        onClick={() => navigate('/phone')}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#EFECE9',
                            border: 'none',
                            borderRadius: 16,
                            padding: '16px',
                            fontSize: 17,
                            fontWeight: 700,
                            color: '#F06922',
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
                            e.currentTarget.style.color = '#F06922';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '4px 4px 10px rgba(0, 0, 0, 0.08), -4px -4px 10px rgba(255, 255, 255, 0.6)';
                        }}
                    >
                        Start Fresh with Phone Number
                    </MaterialButton>
                </div>

                {/* Help Text */}
                <p style={{
                    textAlign: 'center',
                    marginTop: 24,
                    fontSize: 13,
                    color: '#9CA3AF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                }}>
                    Your code was sent to your WhatsApp when you registered
                </p>
            </div>

            <style>{`
 @keyframes shake {
 0%, 100% { transform: translateX(0); }
 10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
 20%, 40%, 60%, 80% { transform: translateX(4px); }
 }
 @keyframes spin {
 from { transform: rotate(0deg); }
 to { transform: rotate(360deg); }
 }
 `}</style>
        </Layout>
    );
}
