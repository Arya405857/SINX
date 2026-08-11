import { createContext, useMemo, useState } from "react";
import { authService } from "../services/authService";

// Context is intentionally colocated with its provider to keep the auth boundary cohesive.
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => authService.getSession());
  const [isLoading, setIsLoading] = useState(false);
  const value = useMemo(() => ({
    user: session?.user ?? null,
    isAuthenticated: Boolean(session?.accessToken),
    isLoading,
    async signIn(credentials) { setIsLoading(true); try { const next = await authService.signIn(credentials); setSession(next); return next; } finally { setIsLoading(false); } },
    async register(details) { setIsLoading(true); try { return await authService.register(details); } finally { setIsLoading(false); } },
    async verifyOtp(code, purpose) { setIsLoading(true); try { const next = await authService.verifyOtp(code, purpose); if (next.accessToken) setSession(next); return next; } finally { setIsLoading(false); } },
    async signOut() { authService.signOut(); setSession(null); },
  }), [session, isLoading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
