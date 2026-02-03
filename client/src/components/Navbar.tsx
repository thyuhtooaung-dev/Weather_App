import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useWeatherUnits } from "@/context/WeatherUnitContext.tsx";

export default function Navbar() {
  const { units, updateUnits, toggleSystem } = useWeatherUnits();

  return (
    <nav className={"flex items-center justify-between w-full"}>
      <header className={"flex items-center"}>
        <img src="/images/logo.svg" alt="app logo" />
      </header>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="bg-neutral-700 border-none rounded-sm hover:cursor-pointer p-5 hover:bg-neutral-700 hover:text-neutral-200 text-neutral-200 data-[state=open]:bg-neutral-700 data-[state=open]:text-neutral-200"
          >
            <img src="/images/icon-units.svg" alt="settings icon" />
            Units
            <img src="/images/icon-dropdown.svg" alt="dropdown-icon" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className={
            "w-56 p-2 bg-neutral-800 border-neutral-700 text-neutral-200"
          }
          align="end"
        >
          <DropdownMenuItem
            className={
              "font-bold text-sm focus:bg-neutral-700 focus:text-neutral-200 cursor-pointer mb-2"
            }
            onClick={toggleSystem}
          >
            {units.Celsius ? "Switch to Imperial" : "Switch to Metric"}
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-neutral-600" />

          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-neutral-400 text-xs">
              Temperature
            </DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={units.Celsius}
              onCheckedChange={() => updateUnits("Celsius")}
              className="focus:bg-neutral-700 focus:text-neutral-200"
            >
              Celsius (°C)
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={units.Fahrenheit}
              onCheckedChange={() => updateUnits("Fahrenheit")}
              className="focus:bg-neutral-700 focus:text-neutral-200"
            >
              Fahrenheit (°F)
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="bg-neutral-600" />

          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-neutral-400 text-xs">
              Wind Speed
            </DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={units.kmh}
              onCheckedChange={() => updateUnits("kmh")}
              className="focus:bg-neutral-700 focus:text-neutral-200"
            >
              km/h
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={units.mph}
              onCheckedChange={() => updateUnits("mph")}
              className="focus:bg-neutral-700 focus:text-neutral-200"
            >
              mph
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="bg-neutral-600" />

          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-neutral-400 text-xs">
              Precipitation
            </DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={units.mm}
              onCheckedChange={() => updateUnits("mm")}
              className="focus:bg-neutral-700 focus:text-neutral-200"
            >
              Millimeters (mm)
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={units.in}
              onCheckedChange={() => updateUnits("in")}
              className="focus:bg-neutral-700 focus:text-neutral-200"
            >
              Inches (in)
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
