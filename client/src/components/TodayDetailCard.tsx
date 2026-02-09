import type { WeatherData } from "@/types/weather.ts";
import { useFormatWeather } from "@/hooks/useFormatWeather.ts";
import { useSunPosition } from "@/hooks/useSunPosition.ts";

const detailCardStyle =
  "dark:bg-neutral-800 bg-neutral-100 py-3 px-5 flex flex-col gap-6 rounded-lg";

export default function TodayDetailCard({weather}: { weather: WeatherData }) {
  const { formatTemp, formatSpeed, formatPrecipitation, formatUv, formatPressure, formatVisibility, formatSunTime } = useFormatWeather();
  const { sunX, sunY, isNight } = useSunPosition(weather);
  return (
    <div className={"grid grid-cols-2 lg:grid-cols-4 gap-4"}>
      <div className={`${detailCardStyle}`}>
        <p>Feels Like</p>
        <span
          className={"dark:text-neutral-0 text-neutral-900 font-light text-2xl"}
        >
          {formatTemp(weather.current.apparent_temperature)}
        </span>
      </div>
      <div className={`${detailCardStyle}`}>
        <p>Humidity</p>
        <span
          className={"dark:text-neutral-0 text-neutral-900 font-light text-2xl"}
        >
          {weather.current.relative_humidity_2m}%
        </span>
      </div>
      <div className={`${detailCardStyle}`}>
        <p>Wind</p>
        <span
          className={"dark:text-neutral-0 text-neutral-900 font-light text-2xl"}
        >
          {formatSpeed(weather.current.wind_speed_10m)}
        </span>
      </div>
      <div className={`${detailCardStyle}`}>
        <p>Precipitation</p>
        <span
          className={"dark:text-neutral-0 text-neutral-900 font-light text-2xl"}
        >
          {formatPrecipitation(weather.current.precipitation)}
        </span>
      </div>
      <div className={`${detailCardStyle}`}>
        <p>Pressure</p>
        <span
          className={"dark:text-neutral-0 text-neutral-900 font-light text-2xl"}
        >
          {formatPressure(weather.current.pressure_msl)}
        </span>
      </div>
      <div className={`${detailCardStyle}`}>
        <p>Visibility</p>
        <span
          className={"dark:text-neutral-0 text-neutral-900 font-light text-2xl"}
        >
          {formatVisibility(weather.current.visibility)}
        </span>
      </div>
      <div className={`${detailCardStyle}`}>
        <p>Max UV Index</p>
        <span
          className={"dark:text-neutral-0 text-neutral-900 font-light text-2xl"}
        >
          {formatUv(weather.daily.uv_index_max[0])}
        </span>
      </div>
      <div className={`${detailCardStyle} justify-between`}>
        <div className="flex flex-col items-center justify-end w-full">
          <div className="w-full max-w-40 relative h-11 overflow-hidden mb-2">
            <svg
              viewBox="0 0 100 50"
              className="absolute bottom-0 w-full h-full overflow-visible"
            >
              <path
                d="M5,50 A45,45 0 0,1 95,50"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="text-neutral-600"
              />

              {!isNight && (
                <path
                  d={`M${sunX},${sunY} L${sunX},50`}
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  className="text-neutral-500 opacity-30"
                />
              )}

              <circle
                cx={sunX}
                cy={sunY}
                r="4"
                fill={isNight ? "#4b5563" : "#FDB813"}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
          </div>

          <div className="flex justify-between w-full text-sm">
            <div className="flex flex-col items-start">
              <span className="text-neutral-400 text-xs">Rise</span>
              <span className="dark:text-neutral-0 text-neutral-900 font-medium">
                {formatSunTime(weather.daily.sunrise[0])}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-neutral-400 text-xs">Set</span>
              <span className="dark:text-neutral-0 text-neutral-900 font-medium">
                {formatSunTime(weather.daily.sunset[0])}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}