import type { WeatherData } from "@/types/weather.ts";

export const dailyForecasts = (weather: WeatherData) =>
  weather.daily.time.map((time, index) => {
    return {
      time: time,
      maxTemp: weather.daily.temperature_2m_max[index],
      minTemp: weather.daily.temperature_2m_min[index],
      code: weather.daily.weather_code[index],
    };
  });

export const allHours = (data: WeatherData) => {
  return data.hourly.time.map((time, index) => {
    return {
      time: time,
      temp: data.hourly.temperature_2m[index],
      code: data.hourly.weather_code[index],
      isDay: data.hourly.is_day ? data.hourly.is_day[index] : 1,
    };
  });
};
