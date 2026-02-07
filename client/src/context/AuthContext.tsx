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
  token: string | null;
  isAuthenticated: boolean;
  loginWithGoogle: () => void;
  loginWithGithub: () => void;
  logout: () => void;
  setTokenManual: (token: string) => void;
  refreshSession: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await apiClient.get("/users/profile");
        setUser(res.data);
        if (token) {
          localStorage.setItem("token", token);
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        if (token) {
          localStorage.removeItem("token");
          setToken(null);
        }
        setUser(null);
      }
    };

    if (token) {
      void fetchSession();
    } else {
      void fetchSession();
    }
  }, [token]);

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
    setToken(null);
    localStorage.removeItem("token");
    void apiClient.post("/auth/logout");
    window.location.href = "/login";
  };

  const setTokenManual = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loginWithGoogle,
        loginWithGithub,
        logout,
        setTokenManual,
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
