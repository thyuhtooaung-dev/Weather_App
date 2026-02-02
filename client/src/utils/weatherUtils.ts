export const getWeatherConfig = (code: number) => {
  switch (code) {
    case 0:
      return { label: "Clear Sky", icon: "sun" };
    case 1:
    case 2:
    case 3:
      return { label: "Partly Cloudy", icon: "cloud-sun" };
    case 45:
    case 48:
      return { label: "Fog", icon: "cloud-fog" };
    case 51:
    case 53:
    case 55:
      return { label: "Drizzle", icon: "cloud-drizzle" };
    case 61:
    case 63:
    case 65:
      return { label: "Rain", icon: "cloud-rain" };
    case 71:
    case 73:
    case 75:
      return { label: "Snow", icon: "snowflake" };
    case 77:
      return { label: "Snow Grains", icon: "snowflake" };
    case 80:
    case 81:
    case 82:
      return { label: "Heavy Rain", icon: "cloud-showers-heavy" };
    case 95:
    case 96:
    case 99:
      return { label: "Thunderstorm", icon: "cloud-bolt" };
    default:
      return { label: "Unknown", icon: "circle-help" };
  }
};

export const formatTime = (isoString: string) => {
  return new Date(isoString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
