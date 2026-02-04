import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { WeatherUnitProvider } from "@/context/WeatherUnitContext.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <WeatherUnitProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WeatherUnitProvider>
    </QueryClientProvider>
  </StrictMode>,
);
