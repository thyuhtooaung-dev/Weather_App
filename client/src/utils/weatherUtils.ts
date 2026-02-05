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
