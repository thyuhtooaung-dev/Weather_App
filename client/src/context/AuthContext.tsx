import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import * as React from "react";
import { apiClient } from "@/services/axios.ts";

interface User {
  id: string;
  email: string;
  firstName: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loginWithGoogle: () => void;
  loginWithGithub: () => void;
  logout: () => void;
  refreshSession: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const refreshSession = useCallback(async () => {
    try {
      const res = await apiClient.get("/users/profile");
      setUser(res.data);
      return true;
    } catch {
      setUser(null);
      return false;
    }
  }, []);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  const loginWithGoogle = useCallback(() => {
    window.location.href =
      "https://weather-app-backend-bzxa.onrender.com/auth/google";
  }, []);

  const loginWithGithub = useCallback(() => {
    window.location.href =
      "https://weather-app-backend-bzxa.onrender.com/auth/github";
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    void apiClient.post("/auth/logout");
    window.location.href = "/login";
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      loginWithGoogle,
      loginWithGithub,
      logout,
      refreshSession,
    }),
    [user, loginWithGoogle, loginWithGithub, logout, refreshSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
