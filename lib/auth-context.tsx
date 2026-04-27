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
  return `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

function decodeJwt(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

function isTokenExpired(token: string) {
  const decoded = decodeJwt(token);
  if (!decoded?.exp) return true;
  return Date.now() / 1000 > decoded.exp;
}

function setAuthSessionCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `auth_session=1; path=/; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}`;
}

function clearAuthSessionCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `auth_session=; path=/; SameSite=Lax; Max-Age=0`;
}

type User = { id: number; email: string; username: string; isAdmin?: boolean };

interface AuthContextProps {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  /** True once the initial localStorage hydration (and optional token refresh) is complete. */
  isHydrated: boolean;
  login: (accessToken: string, user: User) => void;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const logout = useCallback(() => {
    setAccessToken(null);
    setUser(null);
    setIsAuthenticated(false);
    clearAuthSessionCookie();

    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }

    fetch(buildUrl("/auth/logout"), {
      method: "POST",
      credentials: "include",
    }).catch(() => {});
  }, []);

  const refreshToken = useCallback(async (): Promise<boolean> => {
    try {
      const res = await fetch(buildUrl("/auth/refresh"), {
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
        setAuthSessionCookie();

        const userData: User = data.user || decodeJwt(data.accessToken);
        if (userData) {
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);
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

  const login = useCallback((token: string, userData: User) => {
    setAccessToken(token);
    setUser(userData);
    setIsAuthenticated(true);
    setAuthSessionCookie();
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
  }, []);

  // Schedule silent refresh 30s before token expiry
  useEffect(() => {
    if (!accessToken) return;

    const decoded = decodeJwt(accessToken);
    if (!decoded?.exp) return;

    const expiresIn = decoded.exp * 1000 - Date.now();

    if (expiresIn < 60_000) {
      refreshToken();
      return;
    }

    const timeout = setTimeout(() => {
      refreshToken();
    }, expiresIn - 30_000);

    return () => clearTimeout(timeout);
  }, [accessToken, refreshToken]);

  // Hydrate auth state from localStorage on mount, then mark isHydrated
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    if (token && !isTokenExpired(token)) {
      setAccessToken(token);
      setIsAuthenticated(true);
      setAuthSessionCookie();

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          setUser(decodeJwt(token));
        }
      } else {
        setUser(decodeJwt(token));
      }
      setIsHydrated(true);
    } else if (token && isTokenExpired(token)) {
      // Try a silent refresh; mark hydrated after either outcome
      refreshToken().finally(() => setIsHydrated(true));
    } else {
      setIsHydrated(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Listen for authChanged events dispatched after login/register
  useEffect(() => {
    const handler = () => {
      const token = localStorage.getItem("accessToken");
      const storedUser = localStorage.getItem("user");
      if (token && storedUser && !isTokenExpired(token)) {
        setAccessToken(token);
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
        setAuthSessionCookie();
      }
    };
    window.addEventListener("authChanged", handler);
    return () => window.removeEventListener("authChanged", handler);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, accessToken, isAuthenticated, isHydrated, login, logout, refreshToken }}
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
