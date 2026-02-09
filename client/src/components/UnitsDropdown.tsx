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

export default function UnitsDropdown() {
  const { units, updateUnits, toggleSystem } = useWeatherUnits();

  const itemFocusClasses =
    "focus:bg-neutral-200 dark:focus:bg-neutral-700 focus:text-neutral-900 dark:focus:text-neutral-200 cursor-pointer";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="p-5 border border-neutral-200 dark:border-none rounded-sm
            bg-neutral-0 dark:bg-neutral-700
            text-neutral-900 dark:text-neutral-200
            hover:bg-neutral-200 dark:hover:bg-neutral-600
            hover:text-neutral-900 dark:hover:text-neutral-200
            data-[state=open]:bg-neutral-200 dark:data-[state=open]:bg-neutral-600"
        >
          <img
            src="/images/icon-units.svg"
            alt="settings icon"
            className="dark:hidden"
          />
          <img
            src="/images/icon-units-light.svg"
            alt="settings icon"
            className="hidden dark:block"
          />
          Units
          <img
            src="/images/icon-dropdown-light.svg"
            alt="dropdown-icon"
            className="dark:hidden"
          />
          <img
            src="/images/icon-dropdown.svg"
            alt="dropdown-icon"
            className="hidden dark:block"
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 p-2 bg-neutral-0 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-200"
        align="end"
      >
        <DropdownMenuItem
          className={`font-bold text-sm mb-2 ${itemFocusClasses}`}
          onClick={toggleSystem}
        >
          {units.Celsius ? "Switch to Imperial" : "Switch to Metric"}
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-neutral-200 dark:bg-neutral-600" />

        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-neutral-500 dark:text-neutral-400 text-xs">
            Temperature
          </DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={units.Celsius}
            onCheckedChange={() => updateUnits("Celsius")}
            className={itemFocusClasses}
          >
            Celsius (°C)
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={units.Fahrenheit}
            onCheckedChange={() => updateUnits("Fahrenheit")}
            className={itemFocusClasses}
          >
            Fahrenheit (°F)
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-neutral-200 dark:bg-neutral-600" />

        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-neutral-500 dark:text-neutral-400 text-xs">
            Wind Speed
          </DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={units.kmh}
            onCheckedChange={() => updateUnits("kmh")}
            className={itemFocusClasses}
          >
            km/h
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={units.mph}
            onCheckedChange={() => updateUnits("mph")}
            className={itemFocusClasses}
          >
            mph
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-neutral-200 dark:bg-neutral-600" />

        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-neutral-500 dark:text-neutral-400 text-xs">
            Precipitation
          </DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={units.mm}
            onCheckedChange={() => updateUnits("mm")}
            className={itemFocusClasses}
          >
            Millimeters (mm)
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={units.in}
            onCheckedChange={() => updateUnits("in")}
            className={itemFocusClasses}
          >
            Inches (in)
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
