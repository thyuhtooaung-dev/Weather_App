import { ChevronsDown } from "lucide-react";
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

export default function HourlyForecast({weather}: {weather: WeatherData}) {
  const [selectedDay, setSelectedDay] = useState(weather.daily.time[0]);
  const currentDayHours = allHours(weather).filter((hour) =>
    hour.time.startsWith(selectedDay),
  );
  return (
    <div className={"bg-neutral-800 p-4 rounded-xl my-4"}>
      <header className="flex items-center justify-between mb-4">
        <h2 className={"text-xl font-semibold text-neutral-0"}>
          Hourly forecast
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={
                "text-neutral-200 bg-neutral-600 border-none px-4 py-3"
              }
            >
              {new Date(selectedDay).toLocaleDateString("en-US", {
                weekday: "long",
              })}
              <ChevronsDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              {weather.daily.time.map((dayStr) => (
                <DropdownMenuItem
                  key={dayStr}
                  onClick={() => setSelectedDay(dayStr)}
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

      <div className="flex flex-col overflow-x-auto gap-4 pb-4">
        {currentDayHours.map((hour) => (
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

            <span className="font-bold">{hour.temp}°</span>
          </div>
        ))}
      </div>
    </div>
  );
}