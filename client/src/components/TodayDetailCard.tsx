import type { WeatherData } from "@/types/weather.ts";

const detailCardStyle =
  "bg-neutral-800 py-3 px-5 flex flex-col gap-6 rounded-lg";


export default function TodayDetailCard({weather}: { weather: WeatherData }) {
  return (
    <div className={"grid grid-cols-2 gap-4"}>
      <div className={`${detailCardStyle}`}>
        <p>Feels Like</p>
        <span className={"text-neutral-0 text-2xl"}>
          {weather.current.apparent_temperature}°
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
          {weather.current.wind_speed_10m} km/h
        </span>
      </div>
      <div className={`${detailCardStyle}`}>
        <p>Precipitation</p>
        <span className={"text-neutral-0 text-2xl"}>
          {weather.current.precipitation} mm
        </span>
      </div>
    </div>
  );
}