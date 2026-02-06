import type { WeatherData } from "@/types/weather.ts";
import { getWeatherConfig } from "@/utils/weatherUtils.ts";
import { useFormatWeather } from "@/hooks/useFormatWeather.ts";
import LikeButton from "@/components/LikeButton.tsx";
import { useAuth } from "@/context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "@/context/FavoritesContext.tsx";

export default function TodayCard({
  weather,
  city,
  country,
  lat,
  lon
}: {
  weather: WeatherData;
  city: string;
  country: string;
  lat: number;
  lon: number;
}) {
  const currentConfig = getWeatherConfig(weather.current.weather_code);
  const currentHour = new Date(weather.current.time).getHours();
  const { formatTemp, formatTodayTime } = useFormatWeather();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite, favorites } = useFavorites();
  const isLiked = isFavorite(lat, lon);
  const isNight = currentHour >= 18 || currentHour < 6;
  const bgSmall = isNight
    ? "bg-[url('/images/bg-today-small.svg')]"
    : "bg-[url('/images/bg-today-small-day.svg')]";

  const bgLarge = isNight
    ? "md:bg-[url('/images/bg-today-large.svg')]"
    : "md:bg-[url('/images/bg-today-large-day.svg')]";

  const handleHeartClick = async (likedState: boolean) => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (likedState) {
      await addFavorite({ name: city, country, lat, lon });
    } else {
      const fav = favorites.find((f) => f.lat === lat && f.lon === lon);
      if (fav) await removeFavorite(fav.id);
    }
  };

  return (
    <div
      className={`
              flex flex-col items-center gap-5 px-8 py-10 lg:py-15 xl:py-21 rounded-xl text-white
              bg-no-repeat bg-cover bg-center lg:flex-row lg:justify-between
              ${bgSmall} ${bgLarge}
            `}
    >
      <div className="text-center lg:text-start flex flex-col gap-3">
        <h2 className="text-3xl font-semibold">
          {city}, {country}
        </h2>
        <div className={"flex flex-col items-center gap-3 lg:flex-row"}>
          <p className="text-base opacity-80">
            {formatTodayTime(weather.current.time)}
          </p>
          <LikeButton
            className="w-18 h-18"
            onToggle={handleHeartClick}
            initialLiked={isLiked}
          />
        </div>
      </div>

      <div className="flex justify-between md:mt-auto lg:justify-end lg:gap-4 w-full lg:w-fit items-center">
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
