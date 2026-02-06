import { useState } from "react";
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
import { Heart, LogInIcon, LogOutIcon } from "lucide-react";
import {
  AvatarFallback,
  AvatarImage,
  Avatar,
} from "@/components/ui/avatar.tsx";
import { useAuth } from "@/context/AuthContext.tsx";
import { Link } from "react-router-dom";
import { FavoritesModal } from "@/components/FavoritesModal.tsx";

interface NavbarProps {
  onSelectCity: (
    lat: number,
    lon: number,
    name: string,
    country: string,
  ) => void;
}

export default function Navbar({ onSelectCity }: NavbarProps) {
  const { units, updateUnits, toggleSystem } = useWeatherUnits();
  const { user, logout } = useAuth();
  const [showFavorites, setShowFavorites] = useState(false); // <--- Modal State

  const displayName = user?.firstName || "Guest";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);


  return (
    <>
      <nav className={"flex items-center justify-between w-full gap-3"}>
        <header className={"flex items-center"}>
          <img src="/images/logo.svg" alt="app logo" />
        </header>
        <div className={"flex items-center gap-1 md:gap-5"}>
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-10 h-10 border border-neutral-700"
              >
                <Avatar>
                  <AvatarImage src={user?.avatar} alt={displayName} />
                  <AvatarFallback className="bg-neutral-700 text-neutral-200">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-neutral-800 border-neutral-700 text-neutral-200"
            >
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.firstName || "Guest User"}
                  </p>
                  <p className="text-xs leading-none text-neutral-400">
                    {user?.email || "Sign in to sync settings"}
                  </p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="bg-neutral-600" />

              {user && (
                <>
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className="cursor-pointer focus:bg-neutral-700 focus:text-neutral-200"
                      onSelect={(e) => {
                        e.preventDefault();
                        setShowFavorites(true);
                      }}
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Favorite Cities</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-neutral-600" />
                  </DropdownMenuGroup>
                </>
              )}

              {user ? (
                <DropdownMenuItem
                  className="cursor-pointer focus:bg-neutral-700 focus:text-red-400 text-red-400"
                  onClick={logout}
                >
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              ) : (
                <Link to="/login">
                  <DropdownMenuItem className="cursor-pointer focus:bg-neutral-700 focus:text-blue-500 text-blue-500">
                    <LogInIcon className="mr-2 h-4 w-4" />
                    <span>Log In / Sign Up</span>
                  </DropdownMenuItem>
                </Link>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      <FavoritesModal
        open={showFavorites}
        onOpenChange={setShowFavorites}
        onSelectCity={onSelectCity}
      />
    </>
  );
}
