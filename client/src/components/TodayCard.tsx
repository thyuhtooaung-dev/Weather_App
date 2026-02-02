import type { WeatherData } from "@/types/weather.ts";
import { getWeatherConfig } from "@/utils/weatherUtils.ts";


export default function TodayCard({weather}: {weather: WeatherData}) {
  const currentConfig = getWeatherConfig(weather.current.weather_code);
  return (
    <div
      className="
              flex flex-col items-center gap-5 px-8 py-10 rounded-xl text-white
              bg-no-repeat bg-cover bg-center
              bg-[url('/images/bg-today-small-day.svg')]
              md:bg-[url('/images/bg-today-large-day.svg')]
            "
    >
      <div className="text-center flex flex-col gap-3">
        <h2 className="text-3xl font-semibold">Berlin, Germany</h2>
        <p className="text-base opacity-80">Tuesday, Aug 5, 2025</p>
      </div>

      <div className="flex justify-between w-full items-center">
        <img
          src={`/images/${currentConfig.icon}.webp`}
          alt={currentConfig.label}
          className="size-25"
        />
        <i className="text-7xl font-bold font-display">
          {weather.current.temperature_2m}°
        </i>
      </div>
    </div>
  );
}