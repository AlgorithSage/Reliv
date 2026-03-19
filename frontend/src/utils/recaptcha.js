import { RecaptchaVerifier } from 'firebase/auth';

/**
 * Tears down any existing RecaptchaVerifier instance.
 * Safely clears and nullifies window.recaptchaVerifier.
 * Also resets the container's innerHTML to allow re-rendering.
 *
 * @param {string} [containerId] - Optional container ID to clear innerHTML
 */
export function teardownRecaptcha(containerId) {
  if (window.recaptchaVerifier) {
    try {
      window.recaptchaVerifier.clear();
    } catch (e) {
      // Ignore — verifier may already be cleared
    }
    window.recaptchaVerifier = null;
  }

  // Clear the container's innerHTML so reCAPTCHA can be re-rendered
  if (containerId) {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = '';
    }
  }
}

/**
 * Sets up an invisible RecaptchaVerifier on the given container element.
 * Clears any existing verifier first to avoid duplicates.
 *
 * @param {import('firebase/auth').Auth} auth - Firebase Auth instance
 * @param {string} containerId - DOM element ID for the reCAPTCHA container
 * @returns {Promise<RecaptchaVerifier>} The rendered RecaptchaVerifier instance
 */
export async function setupRecaptcha(auth, containerId = 'recaptcha-container') {
  // Fully tear down previous instance AND clear the DOM container
  teardownRecaptcha(containerId);

  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`reCAPTCHA container '#${containerId}' not found in the DOM.`);
  }

  // Reset container innerHTML to guarantee a clean slate
  container.innerHTML = '';

  window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved — signInWithPhoneNumber will proceed
    },
    'expired-callback': () => {
      // reCAPTCHA expired — tear down so it can be re-initialized
      teardownRecaptcha(containerId);
    },
  });

  await window.recaptchaVerifier.render();
  return window.recaptchaVerifier;
}
