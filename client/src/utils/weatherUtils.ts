export type WeatherFileKey =
  | "clearSky"
  | "partlyCloudy"
  | "overcast"
  | "fog"
  | "drizzle"
  | "rain"
  | "heavyRain"
  | "snow"
  | "snowGrains"
  | "thunderstorm"
  | "unknown";

export const getWeatherFileKey = (code: number): WeatherFileKey => {
  switch (code) {
    case 0:
      return "clearSky";
    case 1:
    case 2:
      return "partlyCloudy";
    case 3:
      return "overcast";
    case 45:
    case 48:
      return "fog";
    case 51:
    case 53:
    case 55:
      return "drizzle";
    case 61:
    case 63:
    case 65:
      return "rain";
    case 71:
    case 73:
    case 75:
      return "snow";
    case 77:
      return "snowGrains";
    case 80:
    case 81:
    case 82:
      return "heavyRain";
    case 95:
    case 96:
    case 99:
      return "thunderstorm";
    default:
      return "unknown";
  }
};

export const getBackgroundImages = (code: number, isNight: boolean) => {
  let baseName = getWeatherFileKey(code);

  if (isNight) {
    if (baseName === "clearSky") baseName = "nightClearSky" as any;
    if (baseName === "partlyCloudy") baseName = "nightPartlyCloudy" as any;
  }

  if (baseName === "unknown") {
    return {
      small: `/images/bg-today-small-day.svg`,
      large: `/images/bg-today-large-day.svg`,
    };
  }

  return {
    small: `/images/bg-today-${baseName}-small.svg`,
    large: `/images/bg-today-${baseName}-large.svg`,
  };
};

export const getWeatherConfig = (code: number) => {
  switch (code) {
    case 0:
      return { label: "Clear Sky", icon: "icon-sunny" };
    case 1:
    case 2:
      return { label: "Partly Cloudy", icon: "icon-partly-cloudy" };
    case 3:
      return { label: "Overcast", icon: "icon-overcast" };
    case 45:
    case 48:
      return { label: "Fog", icon: "icon-fog" };
    case 51:
    case 53:
    case 55:
      return { label: "Drizzle", icon: "icon-drizzle" };
    case 61:
    case 63:
    case 65:
      return { label: "Rain", icon: "icon-rain" };
    case 71:
    case 73:
    case 75:
      return { label: "Snow", icon: "icon-snow" };
    case 77:
      return { label: "Snow Grains", icon: "icon-snow" };
    case 80:
    case 81:
    case 82:
      return { label: "Heavy Rain", icon: "icon-storm" };
    case 95:
    case 96:
    case 99:
      return { label: "Thunderstorm", icon: "icon-storm" };
    default:
      return { label: "Unknown", icon: "icon-loading" };
  }
};