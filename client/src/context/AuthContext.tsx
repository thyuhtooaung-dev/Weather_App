import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as React from "react";

interface User {
  userId: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loginWithGoogle: () => void;
  loginWithGithub: () => void;
  logout: () => void;
  setTokenManual: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get("http://localhost:3000/users/profile")
        .then((res) => {
          setUser(res.data);
          localStorage.setItem("token", token);
        })
        .catch(() => {
          logout();
        });
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  const loginWithGoogle = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  const loginWithGithub = () => {
    window.location.href = "http://localhost:3000/auth/github";
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const setTokenManual = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
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
