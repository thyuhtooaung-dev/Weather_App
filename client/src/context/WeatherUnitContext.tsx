import { createContext, useContext, useState, type ReactNode } from "react";

type UnitState = {
  Celsius: boolean;
  Fahrenheit: boolean;
  kmh: boolean;
  mph: boolean;
  mm: boolean;
  in: boolean;
};

type WeatherUnitContextType = {
  units: UnitState;
  updateUnits: (key: string) => void;
  toggleSystem: () => void;
};

const INITIAL_METRIC_STATE: UnitState = {
  Celsius: true,
  Fahrenheit: false,
  kmh: true,
  mph: false,
  mm: true,
  in: false,
};

const WeatherUnitContext = createContext<WeatherUnitContextType | undefined>(
  undefined,
);

export function WeatherUnitProvider({ children }: { children: ReactNode }) {
  const [units, setUnits] = useState<UnitState>(INITIAL_METRIC_STATE);

  const updateUnits = (key: string) => {
    setUnits((prev) => {
      const newState = { ...prev };
      switch (key) {
        case "Celsius":
          newState.Celsius = true;
          newState.Fahrenheit = false;
          break;
        case "Fahrenheit":
          newState.Fahrenheit = true;
          newState.Celsius = false;
          break;
        case "kmh":
          newState.kmh = true;
          newState.mph = false;
          break;
        case "mph":
          newState.mph = true;
          newState.kmh = false;
          break;
        case "mm":
          newState.mm = true;
          newState.in = false;
          break;
        case "in":
          newState.in = true;
          newState.mm = false;
          break;
      }
      return newState;
    });
  };

  const toggleSystem = () => {
    if (units.Celsius) {
      setUnits({
        Celsius: false,
        Fahrenheit: true,
        kmh: false,
        mph: true,
        mm: false,
        in: true,
      });
    } else {
      setUnits(INITIAL_METRIC_STATE);
    }
  };

  return (
    <WeatherUnitContext.Provider value={{ units, updateUnits, toggleSystem }}>
      {children}
    </WeatherUnitContext.Provider>
  );
}

export const useWeatherUnits = () => {
  const context = useContext(WeatherUnitContext);
  if (!context)
    throw new Error(
      "useWeatherUnits must be used within a WeatherUnitProvider",
    );
  return context;
};
