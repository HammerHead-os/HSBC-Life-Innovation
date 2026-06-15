import { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'mpf-user';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Clear any persisted session on refresh so demo restarts clean
  useEffect(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const login = useCallback((name) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const next = {
      name: trimmed.split(' ')[0],
      fullName: trimmed,
      plan: 'Basic',
      premium: 200,
    };
    setUser(next);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), login, logout }),
    [user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
