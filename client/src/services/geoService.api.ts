import { geoApi } from "@/services/axios.ts";
import type { GeoResult } from "@/types/country.ts";

export const searchCities = async (query: string): Promise<GeoResult[]> => {
  const response = await geoApi.get(
    `/search?name=${query}&count=5&language=en&format=json`,
  );
  return response.data.results || [];
};
