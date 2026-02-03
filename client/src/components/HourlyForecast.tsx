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
import { formatTime, getWeatherConfig } from "@/utils/weatherUtils.ts";
import { useFormatWeather } from "@/hooks/useFormatWeather.ts";

export default function HourlyForecast({ weather }: { weather: WeatherData }) {
  const [selectedDay, setSelectedDay] = useState(weather.daily.time[0]);
  const {formatTemp} = useFormatWeather();
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
    <div className={"bg-neutral-800 p-4 rounded-xl"}>
      <header className="flex items-center justify-between mb-4">
        <h2 className={"text-xl font-semibold text-neutral-0"}>
          Hourly forecast
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={
                "text-neutral-200 bg-neutral-600 border-none px-4 py-3 hover:bg-neutral-500 hover:text-neutral-200 data-[state=open]:bg-neutral-600 data-[state=open]:text-neutral-200"
              }
            >
              {new Date(selectedDay).toLocaleDateString("en-US", {
                weekday: "long",
              })}
              <img
                src="/images/icon-dropdown.svg"
                alt="dropdown icon"
                className="ml-2 w-4 h-4"
              />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className={"bg-neutral-800 border-neutral-700 text-neutral-200 p-2"}
            align="end"
          >
            <DropdownMenuGroup>
              {weather.daily.time.map((dayStr) => (
                <DropdownMenuItem
                  key={dayStr}
                  onClick={() => setSelectedDay(dayStr)}
                  className="cursor-pointer focus:bg-neutral-700 focus:text-neutral-200 mt-1"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 overflow-x-auto gap-4 pb-4">
        {currentDayHours
          .map((hour) => (
            <div
              key={hour.time}
              className="min-w-20 flex justify-between items-center bg-neutral-700 p-3 rounded-md"
            >
              <div className={"flex gap-4 items-center"}>
                <img
                  src={`/images/${getWeatherConfig(hour.code).icon}.webp`}
                  alt={getWeatherConfig(hour.code).label}
                  className="size-10"
                />

                <span className="text-lg text-neutral-0 font-semibold">
                  {formatTime(hour.time)}
                </span>
              </div>

              <span className="font-bold">{formatTemp(hour.temp)}</span>
            </div>
          ))
          .slice(0, 7)}
      </div>
    </div>
  );
}
