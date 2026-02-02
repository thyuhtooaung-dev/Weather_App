import { useState } from "react";
import { weatherMockData } from "./mock/weatherMockData";
import Navbar from "@/components/Navbar.tsx";
import Searchbar from "@/components/Searchbar.tsx";
import TodayCard from "@/components/TodayCard.tsx";
import TodayDetailCard from "@/components/TodayDetailCard.tsx";
import HourlyForecast from "@/components/HourlyForecast.tsx";
import DailyForecast from "@/components/DailyForecast.tsx";

function App() {
  const [weather] = useState(weatherMockData);

  return (
    <div className={"w-full p-4 flex flex-col gap-6"}>
      <Navbar />
      <header className="w-full">
        <h1 className={"text-5xl text-center font-bold font-display my-6 px-4"}>
          How's the sky looking today?
        </h1>
      </header>
      <Searchbar />
      <main className="grid grid-cols-1 w-full">
        <section className={"flex flex-col gap-4"}>
          <TodayCard weather={weather} />
          <TodayDetailCard weather={weather} />
          <DailyForecast weather={weather}/>
        </section>
        <section>
          <HourlyForecast weather={weather}/>
        </section>
      </main>
    </div>
  );
}

export default App;
