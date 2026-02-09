import { useFavorites } from "@/context/FavoritesContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, MapPin } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FavoritesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectCity: (
    lat: number,
    lon: number,
    name: string,
    country: string,
  ) => void;
}

export function FavoritesModal({
  open,
  onOpenChange,
  onSelectCity,
}: FavoritesModalProps) {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-neutral-0 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-200 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-neutral-900 dark:text-neutral-0">
            Favorite Cities
          </DialogTitle>
          <DialogDescription className="hidden">
            Manage your saved locations
          </DialogDescription>
        </DialogHeader>

        {favorites.length === 0 ? (
          <p className="text-center text-neutral-600 dark:text-neutral-400 py-8">
            No favorites saved yet.
          </p>
        ) : (
          <ScrollArea className="h-75 pr-4">
            <div className="flex flex-col gap-2">
              {favorites.map((city) => (
                <div
                  key={city.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 dark:border-neutral-700/50 bg-neutral-0 dark:bg-neutral-700/50 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors group"
                >
                  <button
                    className="flex items-center gap-3 flex-1 text-left"
                    onClick={() => {
                      onSelectCity(city.lat, city.lon, city.name, city.country);
                      onOpenChange(false);
                    }}
                  >
                    <MapPin className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                    <div>
                      <p className="font-medium text-neutral-900 dark:text-neutral-0">
                        {city.name}
                      </p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">
                        {city.country}
                      </p>
                    </div>
                  </button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-neutral-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-500/10 dark:hover:bg-red-400/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      void removeFavorite(city.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}
