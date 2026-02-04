import type { WeatherData } from "@/types/weather.ts";
import { weatherApi } from "@/services/axios.ts";

export const getWeather = async (
  lat: number,
  lon: number,
): Promise<WeatherData> => {
  const response = await weatherApi.get<WeatherData>(`/forecast`, {
    params: {
      latitude: lat,
      longitude: lon,
      hourly: "temperature_2m,weather_code",
      daily: "temperature_2m_max,temperature_2m_min,weather_code,uv_index_max",
      current:
        "temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,precipitation,weather_code,pressure_msl,visibility",
      timezone: "auto",
    },
  });
  return response.data;
};
