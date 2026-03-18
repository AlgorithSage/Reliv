import MaterialButton from '../components/material/MaterialButton';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, db } from '../utils/firebase';
import { PhoneAuthProvider, RecaptchaVerifier, signInWithCredential, signInWithPhoneNumber } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Layout from '../components/Layout';
import { C, api } from '../utils/constants';
import Icon from '../utils/Icon';
import { clearOtpSession, readOtpSession, storeOtpSession } from '../utils/otpSession';

const generateAccessCode = async () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

export default function OTPScreen() {
    const navigate = useNavigate();
    const location = useLocation();
    const otpSession = readOtpSession();
    const phone = location.state?.phone || otpSession.phone || localStorage.getItem('phone') || '';
    const sessionId = location.state?.sessionId;
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [resendTimer, setResendTimer] = useState(30);
    const [success, setSuccess] = useState(false);
    const inputRefs = useRef([]);
    const isSubmitting = useRef(false);
    const hasFailedOnce = useRef(false);
    const verifyBtnRef = useRef(null);

    const teardownRecaptcha = useCallback(() => {
        if (window.recaptchaVerifier) {
            try { window.recaptchaVerifier.clear(); } catch (e) { /* ignore */ }
            window.recaptchaVerifier = null;
        }
    }, []);

    const setupRecaptcha = useCallback(async () => {
        teardownRecaptcha();
        const container = document.getElementById('recaptcha-container-otp');
        if (!container) {
            throw new Error('reCAPTCHA container not found');
        }

        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container-otp', {
            size: 'invisible',
            callback: () => {},
            'expired-callback': () => {
                teardownRecaptcha();
            },
        });
        await window.recaptchaVerifier.render();
        return window.recaptchaVerifier;
    }, [teardownRecaptcha]);

    useEffect(() => {
        if (!phone && !sessionId) navigate('/phone');
    }, [phone, sessionId]);

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer]);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const doSubmit = useCallback(async (code) => {
        if (code.length !== 6 || isSubmitting.current) return;
        isSubmitting.current = true;
        setLoading(true);
        setError('');

        console.log("Submitting code to Firebase:", code);

        try {
            let result;
            
            if (location.state?.isBypass) {
                // DEV BYPASS: Skip Firebase confirm completely
                if (code !== '123456') throw new Error('Invalid bypass OTP. Use 123456');
                
                result = {
                    user: {
                        uid: 'dev-bypass-user-12345',
                        phoneNumber: phone || '+919999999999',
                        accessToken: 'mock-token-123'
                    }
                };
                console.log("Bypass OTP Verified! User:", result.user.uid);
            } else {
                const verificationId = window.confirmationResult?.verificationId || readOtpSession().verificationId;
                if (!verificationId) {
                    console.error("No verificationId found for OTP session.");
                    throw new Error('OTP session expired. Please go back and request a new OTP.');
                }
                
                console.log("Signing in with verificationId...");
                const credential = PhoneAuthProvider.credential(verificationId, code);
                result = await signInWithCredential(auth, credential);
                console.log("OTP Verified! User:", result.user.uid);
            }
            console.log("OTP Verified! User:", result.user.uid);
            
            // Don't null confirmationResult here — null it only after navigation
            
            const user = result.user;
            
            let accessCode;
            
            if (location.state?.isBypass) {
                console.log("Bypass enabled. Skipping Firestore...");
                accessCode = '1234'; // Dummy access code for bypass
            } else {
                const userDocRef = doc(db, 'users', user.uid);
                
                console.log("Checking Firestore for existing user...");
                // Force fetch from server to avoid "offline" cache errors in dev
                let userDocSnap;
                try {
                    userDocSnap = await getDoc(userDocRef, { source: 'server' });
                } catch (fsErr) {
                    console.warn("Server fetch failed, trying default getDoc:", fsErr);
                    userDocSnap = await getDoc(userDocRef);
                }
                
                if (userDocSnap.exists()) {
                    console.log("User exists in Firestore.");
                    accessCode = userDocSnap.data().accessCode;
                } else {
                    console.log("New user. Generating access code and saving to Firestore...");
                    accessCode = await generateAccessCode();
                    await setDoc(userDocRef, {
                        uid: user.uid,
                        phone: user.phoneNumber,
                        accessCode: accessCode,
                        createdAt: new Date().toISOString(),
                        planType: null,
                        subscriptionStatus: 'inactive',
                        hasBot: false,
                        streak: 0,
                        stars: 0
                    });
                    console.log("Saved new user to Firestore.");
                }
            }
            
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('userId', user.uid);
            localStorage.setItem('accessCode', accessCode);
            
            // Now safe to clear confirmationResult
            window.confirmationResult = null;
            clearOtpSession();
            
            setSuccess(true);
            setTimeout(() => navigate('/code-generated'), 800);
        } catch (err) {
            console.error("🔥 Firebase Auth Error:", err);
            if (err.code) console.error("Error Code:", err.code);
            if (err.message) console.error("Error Message:", err.message);

            hasFailedOnce.current = true;
            setAttempts(a => {
                const next = a + 1;
                if (next >= 3) navigate('/otp-fail');
                return next;
            });
            
            // Debugging: Show exact Firebase error on screen
            let errorMessage = `Error: ${err.code || err.message || 'Unknown'}`;
            if (err.code === 'auth/network-request-failed') errorMessage = 'Network error. Please try again.';
            if (err.code === 'auth/invalid-verification-code') errorMessage = 'Incorrect code. Please try again.';

            setError(errorMessage);
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } finally {
            setLoading(false);
            isSubmitting.current = false;
        }
    }, [navigate, phone]);

    const handleChange = (i, val) => {
        const digits = val.replace(/\D/g, '');
        if (!digits) {
            const clearedOtp = [...otp];
            clearedOtp[i] = '';
            setOtp(clearedOtp);
            setError('');
            return;
        }

        if (digits.length > 1) {
            const newOtp = [...otp];
            for (let offset = 0; offset < digits.length && i + offset < newOtp.length; offset += 1) {
                newOtp[i + offset] = digits[offset];
            }
            setOtp(newOtp);
            setError('');

            const lastFilledIndex = Math.min(i + digits.length - 1, newOtp.length - 1);
            if (newOtp.every(d => d !== '') && !hasFailedOnce.current) {
                setTimeout(() => {
                    if (verifyBtnRef.current) {
                        verifyBtnRef.current.click();
                    } else {
                        doSubmit(newOtp.join(''));
                    }
                }, 250);
            } else if (lastFilledIndex < newOtp.length - 1) {
                inputRefs.current[lastFilledIndex + 1]?.focus();
            } else {
                inputRefs.current[lastFilledIndex]?.focus();
            }
            return;
        }

        const valToStore = digits[0];
        const newOtp = [...otp];
        newOtp[i] = valToStore;
        setOtp(newOtp);
        setError('');

        if (valToStore && i < 5) {
            inputRefs.current[i + 1]?.focus();
        }

        // Auto-click the verify button when all 6 digits are filled (first attempt only)
        if (valToStore && i === 5 && newOtp.every(d => d !== '') && !hasFailedOnce.current) {
            setTimeout(() => {
                if (verifyBtnRef.current) {
                    verifyBtnRef.current.click();
                } else {
                    doSubmit(newOtp.join(''));
                }
            }, 250);
        }
    };

    const handleKeyDown = (i, e) => {
        if (e.key === 'Backspace' && !otp[i] && i > 0) {
            inputRefs.current[i - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        const newOtp = [...otp];
        for (let i = 0; i < pasted.length; i++) {
            newOtp[i] = pasted[i];
        }
        setOtp(newOtp);
        if (pasted.length === 6) {
            inputRefs.current[5]?.focus();
            // Auto-click on full paste (first attempt only)
            if (!hasFailedOnce.current) {
                setTimeout(() => {
                    if (verifyBtnRef.current) {
                        verifyBtnRef.current.click();
                    } else {
                        doSubmit(newOtp.join(''));
                    }
                }, 250);
            }
        }
    };

    const isComplete = otp.every(d => d);

    return (
        <Layout
            title="Verify Your Number"
            subtitle={`We've sent a 6-digit code to ${phone || 'your phone'}`}
            showBack
        >
            <div style={{ maxWidth: 520, margin: '0 auto' }}>{/* Main Card */}
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
                        background: success
                            ? 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)'
                            : 'linear-gradient(135deg, #FFF5F0 0%, #FFEEDD 100%)',
                        borderRadius: 26,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 28px',
                        border: success ? 'none' : '1px solid rgba(240, 105, 34, 0.15)',
                        fontSize: 44,
                        transition: 'all 0.5s ease',
                        transform: success ? 'scale(1.1)' : 'scale(1)',
                        boxShadow: success ? '0 12px 40px rgba(34, 197, 94, 0.3)' : 'none',
                    }}>
                        {success ? '' : ''}
                    </div>

                    {/* Instruction */}
                    <p style={{
                        fontSize: 15,
                        color: '#666666',
                        marginBottom: 32,
                        lineHeight: 1.6,
                    }}>
                        Check your SMS for the verification code
                    </p>

                    {/* OTP Input Boxes */}
                    <div
                        style={{
                            display: 'flex',
                            gap: 16,
                            justifyContent: 'center',
                            marginBottom: 32,
                        }}
                        onPaste={handlePaste}
                    >
                        {otp.map((d, i) => (
                            <input
                                key={i}
                                ref={(el) => inputRefs.current[i] = el}
                                type="tel"
                                maxLength="1"
                                value={d}
                                onChange={(e) => handleChange(i, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(i, e)}
                                style={{
                                    width: 50,
                                    height: 88,
                                    background: d ? 'linear-gradient(135deg, #FFFAF7 0%, #FFF5F0 100%)' : '#FAFAFA',
                                    border: `3px solid ${d ? '#F06922' : error ? '#EF4444' : '#E5E7EB'}`,
                                    borderRadius: 20,
                                    fontSize: 36,
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
                                    Attempts remaining: {3 - attempts}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Verify Button */}
                    <button
                        ref={verifyBtnRef}
                        onClick={() => doSubmit(otp.join(''))}
                        disabled={loading || !isComplete}
                        style={{
                            width: '100%',
                            background: isComplete
                                ? success
                                    ? 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)'
                                    : 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)'
                                : 'linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)',
                            border: 'none',
                            borderRadius: 16,
                            padding: '20px',
                            fontSize: 18,
                            fontWeight: 700,
                            color: isComplete ? '#FFFFFF' : '#9CA3AF',
                            cursor: isComplete && !loading ? 'pointer' : 'not-allowed',
                            boxShadow: isComplete ? '0 10px 40px rgba(34, 197, 94, 0.35)' : 'none',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 12,
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
                                Verifying...
                            </>
                        ) : success ? (
                            <>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                                Verified!
                            </>
                        ) : (
                            'Verify & Continue'
                        )}
                    </button>

                    {/* Resend Link */}
                    <div style={{
                        marginTop: 28,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6,
                    }}>
                        <span style={{ fontSize: 14, color: '#9CA3AF' }}>Didn't receive?</span>
                        {resendTimer > 0 ? (
                            <span style={{ fontSize: 14, color: '#666666', fontWeight: 600 }}>
                                Resend in {resendTimer}s
                            </span>
                        ) : (
                            <MaterialButton
                                onClick={async () => {
                                    setResendTimer(30);
                                    setError('');
                                    try {
                                        const appVerifier = await setupRecaptcha();
                                        const result = await signInWithPhoneNumber(auth, phone, appVerifier);
                                        window.confirmationResult = result;
                                        storeOtpSession({
                                            phone,
                                            verificationId: result.verificationId,
                                        });
                                        setOtp(['', '', '', '', '', '']);
                                        inputRefs.current[0]?.focus();
                                    } catch (err) {
                                        console.error('Resend OTP error:', err);
                                        let resendError = 'Failed to resend OTP. Please go back and try again.';
                                        if (err.code === 'auth/captcha-check-failed') resendError = 'reCAPTCHA verification failed. Please try again.';
                                        if (err.code === 'auth/too-many-requests') resendError = 'Too many attempts. Please wait a few minutes.';
                                        if (err.code === 'auth/invalid-app-credential') resendError = 'App verification failed. Refresh the page and try again.';
                                        setError(resendError);
                                        clearOtpSession();
                                        teardownRecaptcha();
                                    }
                                }}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: 14,
                                    color: '#F06922',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                }}
                            >
                                Resend OTP
                            </MaterialButton>
                        )}
                    </div>
                </div>

                {/* Phone Change Link */}
                <div
                    id="recaptcha-container-otp"
                    style={{
                        position: 'absolute',
                        width: 1,
                        height: 1,
                        overflow: 'hidden',
                        opacity: 0.01,
                        pointerEvents: 'none',
                    }}
                />

                <p style={{
                    textAlign: 'center',
                    marginTop: 24,
                    fontSize: 13,
                    color: '#9CA3AF',
                }}>
                    Wrong number?{' '}
                    <span
                        onClick={() => navigate('/phone')}
                        style={{
                            color: '#F06922',
                            fontWeight: 600,
                            cursor: 'pointer',
                            textDecoration: 'underline',
                        }}
                    >
                        Change phone
                    </span>
                </p>
            </div>

            {/* Animation Keyframes */}
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
