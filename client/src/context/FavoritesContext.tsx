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
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);

  useEffect(() => {
    if (user) {
      favoritesApi.getAll().then(setFavorites).catch(console.error);
    } else {
      setFavorites([]);
    }
  }, [user]);

  const addFavorite = async (city: Omit<FavoriteCity, "id">) => {
    try {
      const newFav = await favoritesApi.add(city);
      setFavorites((prev) => [...prev, newFav]);
    } catch (error) {
      console.error("Failed to add favorite", error);
    }
  };

  const removeFavorite = async (id: string) => {
    try {
      await favoritesApi.remove(id);
      setFavorites((prev) => prev.filter((fav) => fav.id !== id));
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
