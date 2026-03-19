/**
 * Auth API client — calls the backend for OTP operations.
 * No reCAPTCHA needed. OTP is sent via WhatsApp.
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Send OTP to the given phone number via WhatsApp.
 *
 * @param {string} phone - 10-digit phone number (without country code)
 * @returns {Promise<{ success: boolean, message?: string, error?: string }>}
 */
export async function sendOtp(phone) {
  const formattedPhone = `+91${phone.replace(/\D/g, '')}`;

  const response = await fetch(`${API_URL}/api/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: formattedPhone }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to send OTP');
  }

  return data;
}

/**
 * Verify OTP and get Firebase custom token.
 *
 * @param {string} phone - 10-digit phone number (without country code)
 * @param {string} code - 6-digit OTP code
 * @returns {Promise<{ success: boolean, customToken: string, uid: string, isNewUser: boolean, accessCode: string }>}
 */
export async function verifyOtp(phone, code) {
  const formattedPhone = `+91${phone.replace(/\D/g, '')}`;

  const response = await fetch(`${API_URL}/api/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: formattedPhone, code }),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.error || 'Verification failed');
    error.attemptsRemaining = data.attemptsRemaining;
    throw error;
  }

  return data;
}

/**
 * Login with access code (returning user).
 *
 * @param {string} code - 6-digit access code
 * @returns {Promise<{ success: boolean, customToken: string, uid: string, phone: string, accessCode: string, userData: object }>}
 */
export async function loginWithCode(code) {
  const response = await fetch(`${API_URL}/api/login-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Login failed');
  }

  return data;
}
