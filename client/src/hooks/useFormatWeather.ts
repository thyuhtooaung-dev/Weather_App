import { useWeatherUnits } from "@/context/WeatherUnitContext";

export const useFormatWeather = () => {
  const { units } = useWeatherUnits();

  const formatTemp = (tempC: number) => {
    if (units.Fahrenheit) {
      return `${Math.round((tempC * 9) / 5 + 32)}°`;
    }
    return `${Math.round(tempC)}°`;
  };

  const formatSpeed = (speedKmh: number) => {
    if (units.mph) {
      return `${Math.round(speedKmh * 0.621371)} mph`;
    }
    return `${Math.round(speedKmh)} km/h`;
  };

  const formatPrecipitation = (precipMm: number) => {
    if (units.in) {
      return `${(precipMm / 25.4).toFixed(2)} in`;
    }
    return `${precipMm} mm`;
  };

  return { formatTemp, formatSpeed, formatPrecipitation };
};
