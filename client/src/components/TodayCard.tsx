import type { WeatherData } from "@/types/weather.ts";
import { formatTodayTime, getWeatherConfig } from "@/utils/weatherUtils.ts";
import { useFormatWeather } from "@/hooks/useFormatWeather.ts";

export default function TodayCard({weather, city, country}: {weather: WeatherData, city: string, country: string}) {
  const currentConfig = getWeatherConfig(weather.current.weather_code);
  const { formatTemp } = useFormatWeather();
  return (
    <div
      className="
              flex flex-col items-center gap-5 px-8 py-10 lg:py-15 xl:py-21 rounded-xl text-white
              bg-no-repeat bg-cover bg-center lg:flex-row lg:justify-between
              bg-[url('/images/bg-today-small-day.svg')]
              md:bg-[url('/images/bg-today-large-day.svg')]
            "
    >
      <div className="text-center lg:text-start flex flex-col gap-3">
        <h2 className="text-3xl font-semibold">{city}, {country}</h2>
        <p className="text-base opacity-80">{formatTodayTime(weather.current.time)}</p>
      </div>

      <div className="flex justify-between lg:justify-end lg:gap-4 w-full lg:w-fit items-center">
        <img
          src={`/images/${currentConfig.icon}.webp`}
          alt={currentConfig.label}
          className="size-25"
        />
        <i className="text-7xl font-bold font-display">
          {formatTemp(weather.current.temperature_2m)}
        </i>
      </div>
    </div>
  );
}