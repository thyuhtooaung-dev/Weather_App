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

  const formatPressure = (hPa: number) => {
    return `${Math.round(hPa)} hPa`;
  };

  const formatVisibility = (meters: number) => {
    if (units.mph) {
      const miles = meters / 1609.34;
      return `${miles.toFixed(1)} mi`;
    }
    const km = meters / 1000;
    return `${km.toFixed(1)} km`;
  };

  const formatUv = (index: number) => {
    return Math.round(index).toString();
  };

  const formatSunTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

   const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatTodayTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      hour12: true,
    });
  };

  return { formatTemp, formatSpeed, formatPrecipitation, formatVisibility, formatPressure, formatUv, formatSunTime, formatTime, formatTodayTime };
};
