import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import SignupPage from "@/pages/signup/page.tsx";
import LoginPage from "@/pages/login/page.tsx";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
