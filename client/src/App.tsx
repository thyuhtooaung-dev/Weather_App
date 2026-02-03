import { useState } from "react";
import Navbar from "@/components/Navbar.tsx";
import Searchbar from "@/components/Searchbar.tsx";
import TodayCard from "@/components/TodayCard.tsx";
import TodayDetailCard from "@/components/TodayDetailCard.tsx";
import HourlyForecast from "@/components/HourlyForecast.tsx";
import DailyForecast from "@/components/DailyForecast.tsx";
import { useWeather } from "@/hooks/useWeather.ts";
import {
  DailyForecastSkeleton,
  HourlyForecastSkeleton,
  TodayCardSkeleton,
  TodayDetailSkeleton
} from "@/components/WeatherSkeleton.tsx";
import ApiErrorState from "@/components/ApiErrorState.tsx";

export default function App() {
  const [location, setLocation] = useState({
    lat: 52.52,
    lon: 13.41,
    name: "Berlin",
    country: "Germany",
  });
  const {
    data: weather,
    isLoading,
    isError,
    refetch,
  } = useWeather(location.lat, location.lon);

  const handleLocationSelect = (
    lat: number,
    long: number,
    name: string,
    country: string,
  ) => {
    setLocation({ lat, lon: long, name, country });
  };

  if (isLoading) {
    return (
      <div className="w-full p-4 flex flex-col gap-6 justify-center items-center xl:p-8 lg:px-10 lg:py-6 xl:px-18">
        <Navbar />
        <header className="w-full">
          <h1 className="text-5xl lg:text-6xl text-center font-extrabold font-display my-6 px-4 text-neutral-0">
            How's the sky looking today?
          </h1>
        </header>

        <Searchbar onLocationSelect={handleLocationSelect} />

        <main className="grid grid-cols-1 lg:grid-cols-[70%_30%] xl:grid-cols-[65%_35%] gap-4 w-full">
          <section className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
              <TodayCardSkeleton />
              <TodayDetailSkeleton />
            </div>
            <DailyForecastSkeleton />
          </section>
          <section>
            <HourlyForecastSkeleton />
          </section>
        </main>
      </div>
    );
  }

  if (isError || !weather) {
    return (
      <div className="w-full h-screen bg-neutral-900 text-white flex flex-col items-center gap-4">
        <Navbar />
        <div className="mt-20 text-center space-y-4">
          <h2 className="text-2xl font-bold text-red-400">
            Oops! Failed to load weather.
          </h2>
          <p className="text-neutral-400">Check your internet connection.</p>
          <ApiErrorState refetch={refetch} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        "w-full p-4 flex flex-col gap-6 justify-center items-center xl:p-8 lg:px-10 lg:py-6 xl:px-18"
      }
    >
      <Navbar />
        <header className="w-full">
          <h1 className={"text-5xl lg:text-6xl text-center font-extrabold font-display my-6 px-4 text-neutral-0"}>
            How's the sky looking today?
          </h1>
        </header>
        <Searchbar onLocationSelect={handleLocationSelect} />
        <main className="grid grid-cols-1 lg:grid-cols-[70%_30%] xl:grid-cols-[65%_35%]  gap-4 w-full">
        <section className={"flex flex-col gap-4"}>
      <div
        className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4"}
      >
        <TodayCard weather={weather} city={location.name} country={location.country} />
        <TodayDetailCard weather={weather} />
      </div>
      <DailyForecast weather={weather} />
      </section>
      <section>
        <HourlyForecast weather={weather} />
      </section>
    </main>
    </div>
  );
}
