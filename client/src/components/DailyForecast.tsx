import { dailyForecasts } from "@/utils/weatherZipper.ts";
import { getWeatherConfig } from "@/utils/weatherUtils.ts";
import type { WeatherData } from "@/types/weather.ts";
import { useFormatWeather } from "@/hooks/useFormatWeather.ts";

export default function DailyForecast({weather}: {weather: WeatherData}) {
  const {formatTemp} = useFormatWeather()
  return (
    <div>
      <header className={"text-neutral-0 my-4 text-xl font-semibold"}>
        Daily forecast
      </header>
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
        {dailyForecasts(weather).map((day) => (
          <div
            key={day.time}
            className="dark:bg-neutral-800 bg-neutral-100 p-2 rounded-xl flex flex-col gap-4"
          >
            <p className={"text-center dark:text-neutral-0 text-neutral-900"}>
              {new Date(day.time).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <img
              src={`/images/${getWeatherConfig(day.code).icon}.webp`}
              alt={getWeatherConfig(day.code).label}
              className="size-20 mx-auto"
            />
            <div className="flex justify-between items-center">
              <p className="font-bold dark:text-neutral-0 text-neutral-900">
                {formatTemp(day.maxTemp)}
              </p>
              <span className="dark:text-neutral-200 text-neutral-900 text-sm">
                {formatTemp(day.minTemp)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}