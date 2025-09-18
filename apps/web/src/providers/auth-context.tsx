import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { devLogin, getMe } from '../auth';

export type UserProfile = { email: string; name: string; role: string } | null;

type AuthContextValue = {
  authState: { accessToken: string | null; user: UserProfile };
  signInDev: (email: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const ACCESS_TOKEN_KEY = 'atslite_access_token';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem(ACCESS_TOKEN_KEY),
  );
  const [user, setUser] = useState<UserProfile>(null);

  useEffect(() => {
    if (!accessToken) return;
    let cancelled = false;
    (async () => {
      try {
        const me = await getMe(accessToken);
        if (!cancelled) setUser(me);
      } catch {
        if (!cancelled) {
          setAccessToken(null);
          setUser(null);
          localStorage.removeItem(ACCESS_TOKEN_KEY);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [accessToken]);

  async function signInDev(email: string) {
    const token = await devLogin(email);
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    setAccessToken(token);
    const me = await getMe(token);
    setUser(me);
  }

  function signOut() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    setAccessToken(null);
    setUser(null);
  }

  const value = useMemo<AuthContextValue>(
    () => ({ authState: { accessToken, user }, signInDev, signOut }),
    [accessToken, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
