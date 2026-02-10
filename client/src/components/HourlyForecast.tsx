import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";
import { allHours } from "@/utils/weatherZipper.ts";
import type { WeatherData } from "@/types/weather.ts";
import { getWeatherConfig } from "@/utils/weatherUtils.ts";
import { useFormatWeather } from "@/hooks/useFormatWeather.ts";

export default function HourlyForecast({ weather }: { weather: WeatherData }) {
  const [selectedDay, setSelectedDay] = useState(weather.daily.time[0]);
  const { formatTemp, formatTime } = useFormatWeather();
  const currentApiDate = weather.current.time.split("T")[0];

  const currentDayHours = allHours(weather).filter((hour) => {
    const isSelectedDay = hour.time.startsWith(selectedDay);
    if (!isSelectedDay) return false;
    if (selectedDay === currentApiDate) {
      return hour.time > weather.current.time;
    }

    return true;
  });

  return (
    <div className="bg-[#ececec] dark:bg-neutral-800 p-4 rounded-xl h-full flex flex-col max-h-200 transition-colors">
      <header className="flex items-center justify-between mb-4 shrink-0">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-0">
          Hourly forecast
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="px-4 py-3 border-none
                bg-neutral-200 dark:bg-neutral-600
                text-neutral-900 dark:text-neutral-200
                hover:bg-neutral-300 dark:hover:bg-neutral-500
                hover:text-neutral-900 dark:hover:text-neutral-200
                data-[state=open]:bg-neutral-300 dark:data-[state=open]:bg-neutral-500
                data-[state=open]:text-neutral-900 dark:data-[state=open]:text-neutral-200"
            >
              {new Date(selectedDay).toLocaleDateString("en-US", {
                weekday: "long",
              })}
              <img
                src="/images/icon-dropdown.svg"
                alt="dropdown icon"
                className="ml-2 w-4 h-4 dark:invert"
              />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="bg-neutral-0 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-200 p-2"
            align="end"
          >
            <DropdownMenuGroup>
              {weather.daily.time.map((dayStr) => (
                <DropdownMenuItem
                  key={dayStr}
                  onClick={() => setSelectedDay(dayStr)}
                  className="cursor-pointer focus:bg-neutral-200 dark:focus:bg-neutral-700 focus:text-neutral-900 dark:focus:text-neutral-200 mt-1"
                >
                  {new Date(dayStr).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 pb-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        {currentDayHours.map((hour) => (
          <div
            key={hour.time}
            className="min-w-20 flex justify-between items-center bg-neutral-0 dark:bg-neutral-700 p-3 rounded-md transition-colors"
          >
            <div className="flex gap-4 items-center">
              <img
                src={`/images/${getWeatherConfig(hour.code).icon}.webp`}
                alt={getWeatherConfig(hour.code).label}
                className="size-10"
              />

              <span className="text-lg text-neutral-900 dark:text-neutral-0 font-semibold">
                {formatTime(hour.time)}
              </span>
            </div>

            <span className="font-bold text-neutral-900 dark:text-neutral-200">
              {formatTemp(hour.temp)}
            </span>
          </div>
        ))}
        {currentDayHours.length < 8 && (
          <div className="md:col-span-2 lg:col-span-1 py-10 flex flex-col items-center justify-center opacity-40">
            <span className="w-16 h-px bg-neutral-400 mb-2"></span>
            <p className="text-neutral-600 dark:text-neutral-200 text-sm italic">
              End of the day
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
