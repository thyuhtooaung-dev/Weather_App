import { useState } from "react";
import { FavoritesModal } from "@/components/FavoritesModal.tsx";
import UnitsDropdown from "@/components/UnitsDropdown.tsx";
import ProfileDropdown from "@/components/ProfileDropdown.tsx";

interface NavbarProps {
  onSelectCity: (
    lat: number,
    lon: number,
    name: string,
    country: string,
  ) => void;
}

export default function Navbar({ onSelectCity }: NavbarProps) {
  const [showFavorites, setShowFavorites] = useState(false);

  return (
    <>
      <nav className={"flex items-center justify-between w-full gap-3"}>
        <header className={"flex items-center"}>
          <img
            src="/images/logo-dark.svg"
            alt="app logo"
            className="dark:hidden"
          />

          <img
            src="/images/logo-light.svg"
            alt="app logo"
            className="hidden dark:block"
          />
        </header>
        <div className={"flex items-center gap-1 md:gap-5"}>
          <ProfileDropdown setShowFavorites={setShowFavorites} />
          <UnitsDropdown />
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
