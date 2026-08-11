import api from './apiClient';
const SESSION_KEY = "signix.session";

export const authService = {
  getSession() {
    try { return JSON.parse(window.localStorage.getItem(SESSION_KEY) || "null"); } catch { return null; }
  },
  async signIn(credentials) {
    const session = await api.post('/auth/login', credentials);
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  },
  async register(details) { const result = await api.post('/auth/register', details); sessionStorage.setItem('signix.pendingEmail', result.email); return result; },
  async verifyOtp(code, purpose = 'verify-email') { const email = sessionStorage.getItem('signix.pendingEmail'); const result = await api.post('/auth/verify-otp', { email, code, purpose }); if (result.accessToken) { window.localStorage.setItem(SESSION_KEY, JSON.stringify(result)); sessionStorage.removeItem('signix.pendingEmail'); } return result; },
  async resendOtp(purpose = 'verify-email') { return api.post('/auth/resend-otp', { email: sessionStorage.getItem('signix.pendingEmail'), purpose }); },
  async forgotPassword(email) { sessionStorage.setItem('signix.pendingEmail', email); return api.post('/auth/forgot-password', { email }); },
  async resetPassword(resetToken, password) { return api.post('/auth/reset-password', { resetToken, password }); },
  signOut() { window.localStorage.removeItem(SESSION_KEY); },
};
