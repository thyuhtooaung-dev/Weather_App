import { createContext, useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await apiClient.get("/users/profile");
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };

    void fetchSession();
  }, []);

  const refreshSession = async () => {
    try {
      const res = await apiClient.get("/users/profile");
      setUser(res.data);
      return true;
    } catch {
      setUser(null);
      return false;
    }
  };

  const loginWithGoogle = () => {
    window.location.href =
      "https://weather-app-backend-bzxa.onrender.com/auth/google";
  };

  const loginWithGithub = () => {
    window.location.href =
      "https://weather-app-backend-bzxa.onrender.com/auth/github";
  };

  const logout = () => {
    setUser(null);
    void apiClient.post("/auth/logout");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginWithGoogle,
        loginWithGithub,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
