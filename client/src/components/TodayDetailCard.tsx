import type { WeatherData } from "@/types/weather.ts";
import { useFormatWeather } from "@/hooks/useFormatWeather.ts";

const detailCardStyle =
  "bg-neutral-800 py-3 px-5 flex flex-col gap-6 rounded-lg";


export default function TodayDetailCard({weather}: { weather: WeatherData }) {
  const { formatTemp, formatSpeed, formatPrecipitation } = useFormatWeather();
  return (
    <div className={"grid grid-cols-2 lg:grid-cols-4 gap-4"}>
      <div className={`${detailCardStyle}`}>
        <p>Feels Like</p>
        <span className={"text-neutral-0 text-2xl"}>
          {formatTemp(weather.current.apparent_temperature)}
        </span>
      </div>
      <div className={`${detailCardStyle}`}>
        <p>Humidity</p>
        <span className={"text-neutral-0 text-2xl"}>
          {weather.current.relative_humidity_2m}%
        </span>
      </div>
      <div className={`${detailCardStyle}`}>
        <p>Wind</p>
        <span className={"text-neutral-0 text-2xl"}>
          {formatSpeed(weather.current.wind_speed_10m)}
        </span>
      </div>
      <div className={`${detailCardStyle}`}>
        <p>Precipitation</p>
        <span className={"text-neutral-0 text-2xl"}>
          {formatPrecipitation(weather.current.precipitation)}
        </span>
      </div>
    </div>
  );
}