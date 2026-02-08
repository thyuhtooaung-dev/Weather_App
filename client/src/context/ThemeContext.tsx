import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "auto";

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  setWeatherIsDay: (isDay: boolean) => void;
}

const initialState: ThemeProviderState = {
  theme: "auto",
  setTheme: () => null,
  setWeatherIsDay: () => null,
};

const ThemeContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem("vite-ui-theme") as Theme) || "auto",
  );
  const [weatherIsDay, setWeatherIsDay] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    let effectiveTheme = theme;
    if (theme === "auto") {
      effectiveTheme = weatherIsDay ? "light" : "dark";
    }
    root.classList.add(effectiveTheme);
    localStorage.setItem("vite-ui-theme", theme);
  }, [theme, weatherIsDay]);

  const setTheme = (theme: Theme) => {
    setThemeState(theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, setWeatherIsDay }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
