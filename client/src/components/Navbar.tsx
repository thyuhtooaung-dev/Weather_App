import { ChevronsDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";

export default function Navbar() {
  return (
    <nav className={"flex items-center justify-between w-full"}>
        <header className={"flex items-center"}>
          <img src="/images/logo.svg" alt="app logo"/>
        </header>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-neutral-600 border-none rounded-sm">
              <img src="/images/icon-units.svg" alt="settings icon" />
              Units <ChevronsDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={"w-full"}>
            <DropdownMenuLabel className={"font-bold text-sm"}>
              Switch to Imperial
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Temperature</DropdownMenuLabel>
              <DropdownMenuItem>Celsius (°C)</DropdownMenuItem>
              <DropdownMenuItem>Fahrenheit (°F)</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Wind Speed</DropdownMenuLabel>
              <DropdownMenuItem>km/h</DropdownMenuItem>
              <DropdownMenuItem>mph</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Precipitation</DropdownMenuLabel>
              <DropdownMenuItem>Millimeters (mm)</DropdownMenuItem>
              <DropdownMenuItem>Inch (in.)</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
    </nav>
  );
}