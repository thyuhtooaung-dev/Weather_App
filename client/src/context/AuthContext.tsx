import { createContext, useCallback, useContext, useState } from "react";
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
  logout: (redirectPath?: string) => void;
  refreshSession: () => Promise<boolean>;
}

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "https://weather-app-backend-bzxa.onrender.com";

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

  const loginWithGoogle = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  const loginWithGithub = () => {
    window.location.href = `${API_BASE_URL}/auth/github`;
  };

  const logout = async (redirectPath = "/login") => {
    setUser(null);

    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      window.location.href = redirectPath;
    }
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
