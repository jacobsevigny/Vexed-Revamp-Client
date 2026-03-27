import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

// Utility to decode JWT and check expiry
function decodeJwt(token: string) {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch {
    return null;
  }
}

function isTokenExpired(token: string) {
  const decoded = decodeJwt(token);
  if (!decoded || !decoded.exp) return true;
  // exp is in seconds
  return Date.now() / 1000 > decoded.exp;
}

// Auth context
interface AuthContextProps {
  user: any;
  accessToken: string | null;
  isAuthenticated: boolean;
  refreshToken: () => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Try to refresh token
  const refreshToken = useCallback(async () => {
    try {
      // Call refresh endpoint (should use cookie refreshToken)
      const res = await fetch('/api/auth/refresh', { method: 'POST', credentials: 'include' });
      if (!res.ok) {
        logout();
        return false;
      }
      const data = await res.json();
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        setAccessToken(data.accessToken);
        setIsAuthenticated(true);
        setUser(data.user || null);
        return true;
      }
      logout();
      return false;
    } catch {
      logout();
      return false;
    }
  }, []);

  // Logout
  const logout = useCallback(() => {
    setAccessToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    // Optionally call server logout endpoint
    fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
  }, []);

  // On mount, check token
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token && !isTokenExpired(token)) {
      setAccessToken(token);
      setIsAuthenticated(true);
      // Optionally decode user info from token
      setUser(decodeJwt(token));
    } else if (token && isTokenExpired(token)) {
      refreshToken();
    }
  }, [refreshToken]);

  // Auto-refresh token before expiry
  useEffect(() => {
    if (!accessToken) return;
    const decoded = decodeJwt(accessToken);
    if (!decoded || !decoded.exp) return;
    const expiresIn = decoded.exp * 1000 - Date.now();
    if (expiresIn < 60000) {
      // If less than 1 min left, refresh
      refreshToken();
    } else {
      // Set timeout to refresh
      const timeout = setTimeout(() => {
        refreshToken();
      }, expiresIn - 30000); // refresh 30s before expiry
      return () => clearTimeout(timeout);
    }
  }, [accessToken, refreshToken]);

  return (
    <AuthContext.Provider value={{ user, accessToken, isAuthenticated, refreshToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
