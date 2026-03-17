const OTP_SESSION_KEY = 'reliv-otp-session';

export function readOtpSession() {
  if (typeof window === 'undefined') return {};

  try {
    const raw = window.sessionStorage.getItem(OTP_SESSION_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.error('Failed to read OTP session:', err);
    return {};
  }
}

export function storeOtpSession(nextSession) {
  if (typeof window === 'undefined') return;

  const current = readOtpSession();
  const merged = { ...current, ...nextSession };
  window.sessionStorage.setItem(OTP_SESSION_KEY, JSON.stringify(merged));
}

export function clearOtpSession() {
  if (typeof window === 'undefined') return;
  window.sessionStorage.removeItem(OTP_SESSION_KEY);
}
