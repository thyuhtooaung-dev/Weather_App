import * as React from "react";
import { Routes, Route, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import Home from "@/pages/Home";
import SignupPage from "@/pages/signup/page.tsx";
import LoginPage from "@/pages/login/page.tsx";

function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      window.location.href = "/weather";
    }
  }, [token, navigate]);

  return <div className="p-10 text-white">Logging you in...</div>;
}

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <TokenHandler>
            <Home />
          </TokenHandler>
        }
      />
    </Routes>
  );
}

function TokenHandler({ children }: { children: React.ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      setSearchParams({});
      window.location.reload();
    }
  }, [token, setSearchParams]);

  return <>{children}</>;
}

export default App;
