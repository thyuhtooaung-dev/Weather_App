import { createContext, useContext, useEffect, useState } from "react";
import { favoritesApi, type FavoriteCity } from "@/services/favorites.api";
import { useAuth } from "./AuthContext";

interface FavoritesContextType {
  favorites: FavoriteCity[];
  addFavorite: (city: Omit<FavoriteCity, "id">) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  isFavorite: (lat: number, lon: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [internalFavorites, setInternalFavorites] = useState<FavoriteCity[]>([]);
  const favorites = user ? internalFavorites : [];

  useEffect(() => {
    if (user) {
      favoritesApi.getAll().then(setInternalFavorites).catch(console.error);
    }
  }, [user]);

  const addFavorite = async (city: Omit<FavoriteCity, "id">) => {
    if (!user) return;
    try {
      const newFav = await favoritesApi.add(city);
      setInternalFavorites((prev) => [...prev, newFav]);
    } catch (error) {
      console.error("Failed to add favorite", error);
    }
  };

  const removeFavorite = async (id: string) => {
    if (!user) return;
    try {
      await favoritesApi.remove(id);
      setInternalFavorites((prev) => prev.filter((fav) => fav.id !== id));
    } catch (error) {
      console.error("Failed to remove favorite", error);
    }
  };

  const isFavorite = (lat: number, lon: number) => {
    return favorites.some((fav) => fav.lat === lat && fav.lon === lon);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites must be used within FavoritesProvider");
  return context;
};