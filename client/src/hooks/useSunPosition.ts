import type { WeatherData } from "@/types/weather.ts";

export const useSunPosition = (weather: WeatherData) => {
  const now = new Date(weather.current.time).getTime();
  const sunrise = new Date(weather.daily.sunrise[0]).getTime();
  const sunset = new Date(weather.daily.sunset[0]).getTime();

  let percent = (now - sunrise) / (sunset - sunrise);

  if (percent < 0) percent = 0;
  if (percent > 1) percent = 1;

  const angle = Math.PI * (1 - percent);

  const radius = 45;
  const centerX = 50;
  const centerY = 50;

  const sunX = centerX + radius * Math.cos(angle);
  const sunY = centerY - radius * Math.sin(angle);

  const isNight = now < sunrise || now > sunset;

  return { sunX, sunY, isNight };
};
