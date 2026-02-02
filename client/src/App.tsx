import { useState } from "react";
import { weatherMockData } from "./mock/weatherMockData";
import { getWeatherConfig } from "./utils/weatherUtils";
import { CloudSun, MapPin, Search } from "lucide-react";
import Navbar from "@/components/Navbar.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";

function App() {
  const [weather] = useState(weatherMockData);
  const currentConfig = getWeatherConfig(weather.current.weather_code);

  return (
    <div className={"w-full"}>
      <Navbar />
      <header>
        <h1>How's the sky looking today?</h1>
      </header>
      {/*this place will replace search component with (grid-1 in mobile and grid-4 (*span3) in desktop*/}
      <main className="grid grid-cols-1 w-full">
        <section>
          <div className={"flex flex-col items-center gap-3 p-5"}>
            <div className={"text-center"}>
              <h2>Berlin, Germany</h2>
              <p>Tuesday, Aug 5, 2025</p>
            </div>
            <div className={"flex justify-between w-full"}>
              <CloudSun />
              {weather.current.temperature_2m}
            </div>
          </div>
          <div className={"grid grid-cols-2 gap-4"}>
            <div>
              <p>Feels Like</p>
              <span>{weather.current.apparent_temperature}</span>
            </div>
            <div>
              <p>Humidity</p>
              <span>{weather.current.relative_humidity_2m}</span>
            </div>
            <div>
              <p>Wind</p>
              <span>{weather.current.wind_speed_10m}</span>
            </div>
            <div>
              <p>Precipitation</p>
              <span>{weather.current.precipitation}</span>
            </div>
          </div>
          <div>
            <header>Daily forecast</header>
            <div className={"grid grid-cols-3"}>
              {/*{weather.daily.time.map((day) => (*/}
              {/*  <div>*/}
              {/*  /!*  idk how to loop the daily={} *!/*/}
              {/*  </div>*/}
              {/*))}*/}
            </div>
          </div>
        </section>
        <section>
          <header className={"flex items-center justify-between"}>
            <h2>Hourly forecast</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Tuesday</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem>Monday</DropdownMenuItem>
                  <DropdownMenuItem>Tuesday</DropdownMenuItem>
                  <DropdownMenuItem>Wednesday</DropdownMenuItem>
                  <DropdownMenuItem>Thursday</DropdownMenuItem>
                  <DropdownMenuItem>Friday</DropdownMenuItem>
                  <DropdownMenuItem>Saturday</DropdownMenuItem>
                  <DropdownMenuItem>Sunday</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <div>
            {/* hourly map loop to show weather code, time(3pm), temperature*/}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
