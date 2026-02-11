import { Heart, LogInIcon, LogOutIcon, Moon, Sun, Laptop } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  AvatarFallback,
  AvatarImage,
  Avatar,
} from "@/components/ui/avatar.tsx";
import { useAuth } from "@/context/AuthContext.tsx";
import { useTheme } from "@/context/ThemeContext.tsx";

export default function ProfileDropdown({setShowFavorites}: {setShowFavorites: (showFavorites: boolean) => void}) {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const displayName = user?.firstName || "Guest";
  const initials = displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const menuItemClasses = "cursor-pointer focus:bg-neutral-200 dark:focus:bg-neutral-700 focus:text-neutral-900 dark:focus:text-neutral-200";

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-10 h-10 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-800"
          >
            <Avatar className="h-full w-full">
              <AvatarImage src={user?.avatar} alt={displayName} />
              <AvatarFallback className="bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-200 font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
            align="end"
            className="w-56 bg-neutral-0 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-200"
        >
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user?.firstName || "Guest User"}
              </p>
              <p className="text-xs leading-none text-neutral-600 dark:text-neutral-300">
                {user?.email || "Sign in to sync settings"}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="bg-neutral-200 dark:bg-neutral-700" />

          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className={menuItemClasses}>
                <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span>Theme</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="bg-neutral-0 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-200">
                  <DropdownMenuRadioGroup
                      value={theme}
                      onValueChange={(v) =>
                          setTheme(v as "light" | "dark" | "auto")
                      }
                  >
                    <DropdownMenuRadioItem value="light" className={menuItemClasses}>
                      <Sun className="mr-2 h-4 w-4" /> Light
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark" className={menuItemClasses}>
                      <Moon className="mr-2 h-4 w-4" /> Dark
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="auto" className={menuItemClasses}>
                      <Laptop className="mr-2 h-4 w-4" /> Auto
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>

          {user && (
              <>
                <DropdownMenuGroup>
                  <DropdownMenuItem
                      className={menuItemClasses}
                      onSelect={(e) => {
                        e.preventDefault();
                        setShowFavorites(true);
                      }}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Favorite Cities</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-neutral-200 dark:bg-neutral-700" />
                </DropdownMenuGroup>
              </>
          )}

          {user ? (
              <DropdownMenuItem
                  className="cursor-pointer text-red-500 focus:text-red-600 focus:bg-neutral-200 dark:focus:bg-neutral-700"
                  onClick={() => logout()}
              >
                <LogOutIcon className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
          ) : (
              <Link to="/login" className="w-full cursor-pointer">
                <DropdownMenuItem className="cursor-pointer text-blue-500 focus:text-blue-600 focus:bg-neutral-200 dark:focus:bg-neutral-700">
                  <LogInIcon className="mr-2 h-4 w-4" />
                  <span>Log In / Sign Up</span>
                </DropdownMenuItem>
              </Link>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
  );
}