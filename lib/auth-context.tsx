"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

function buildUrl(path: string) {
  if (!API_BASE) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
  }

  if (path.startsWith("/")) {
    return `${API_BASE}${path}`;
  }

  return `${API_BASE}/${path}`;
}

// Utility to decode JWT and check expiry
function decodeJwt(token: string) {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch {
    return null;
  }
}

function isTokenExpired(token: string) {
  const decoded = decodeJwt(token);
  if (!decoded || !decoded.exp) return true;
  return Date.now() / 1000 > decoded.exp;
}

interface AuthContextProps {
  user: any;
  accessToken: string | null;
  isAuthenticated: boolean;
  refreshToken: () => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = useCallback(() => {
    setAccessToken(null);
    setUser(null);
    setIsAuthenticated(false);

    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }

    // Fire and forget logout request to backend
    fetch(buildUrl("/api/auth/logout"), {
      method: "POST",
      credentials: "include",
    }).catch(() => {});
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const res = await fetch(buildUrl("/api/auth/refresh"), {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        logout();
        return false;
      }

      const data = await res.json();

      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        setAccessToken(data.accessToken);
        setIsAuthenticated(true);

        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          setUser(data.user);
        } else {
          setUser(decodeJwt(data.accessToken));
        }

        return true;
      }

      logout();
      return false;
    } catch {
      logout();
      return false;
    }
  }, [logout]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    if (token && !isTokenExpired(token)) {
      setAccessToken(token);
      setIsAuthenticated(true);

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          setUser(decodeJwt(token));
        }
      } else {
        setUser(decodeJwt(token));
      }
    } else if (token && isTokenExpired(token)) {
      refreshToken();
    }
  }, [refreshToken]);

  useEffect(() => {
    if (!accessToken) return;

    const decoded = decodeJwt(accessToken);
    if (!decoded || !decoded.exp) return;

    const expiresIn = decoded.exp * 1000 - Date.now();

    if (expiresIn < 60000) {
      refreshToken();
      return;
    }

    const timeout = setTimeout(() => {
      refreshToken();
    }, expiresIn - 30000);

    return () => clearTimeout(timeout);
  }, [accessToken, refreshToken]);

  return (
    <AuthContext.Provider
      value={{ user, accessToken, isAuthenticated, refreshToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}