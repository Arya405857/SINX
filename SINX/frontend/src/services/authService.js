const SESSION_KEY = "signix.session";

const wait = () => new Promise((resolve) => window.setTimeout(resolve, 450));

export const authService = {
  getSession() {
    try { return JSON.parse(window.localStorage.getItem(SESSION_KEY) || "null"); } catch { return null; }
  },
  async signIn(credentials) {
    await wait();
    const session = { user: { name: credentials.email.split("@")[0] || "Arya", email: credentials.email }, token: "frontend-placeholder" };
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  },
  async register(details) { await wait(); return { email: details.email, pendingVerification: true }; },
  signOut() { window.localStorage.removeItem(SESSION_KEY); },
};
