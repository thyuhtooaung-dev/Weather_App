import { apiClient } from "@/services/axios.ts";

export interface FavoriteCity {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export const favoritesApi = {
  getAll: async () => {
    const res = await apiClient.get<FavoriteCity[]>("/favorites");
    return res.data;
  },

  add: async (city: Omit<FavoriteCity, "id">) => {
    const res = await apiClient.post<FavoriteCity>("/favorites", city);
    return res.data;
  },

  remove: async (id: string) => {
    await apiClient.delete(`/favorites/${id}`);
  },
};
