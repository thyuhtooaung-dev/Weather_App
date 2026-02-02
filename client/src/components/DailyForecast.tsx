import { dailyForecasts } from "@/utils/weatherZipper.ts";
import { getWeatherConfig } from "@/utils/weatherUtils.ts";
import type { WeatherData } from "@/types/weather.ts";

export default function DailyForecast({weather}: {weather: WeatherData}) {
  return (
    <div>
      <header className={"text-neutral-0 my-4 text-xl font-semibold"}>
        Daily forecast
      </header>
      <div className="grid grid-cols-3 gap-4">
        {dailyForecasts(weather).map((day) => (
          <div
            key={day.time}
            className="bg-neutral-800 p-2 rounded-xl flex flex-col gap-4"
          >
            <p className={"text-center text-neutral-0"}>
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
              <p className="font-bold">{day.maxTemp}° </p>
              <span className="text-neutral-200 text-sm">{day.minTemp}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}