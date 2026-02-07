import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Home from "@/pages/Home";
import SignupPage from "@/pages/signup/page.tsx";
import LoginPage from "@/pages/login/page.tsx";
import { useAuth } from "@/context/AuthContext";

function TokenHandler({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { refreshSession } = useAuth();

  useEffect(() => {
    const syncSession = async () => {
      const hasSession = await refreshSession();
      if (!hasSession) {
        navigate("/login", { replace: true });
      }
    };

    void syncSession();
  }, [refreshSession, navigate]);

  return <>{children}</>;
}

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/weather"
        element={
          <TokenHandler>
            <Home />
          </TokenHandler>
        }
      />
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
