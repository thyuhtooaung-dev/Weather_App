import { useQuery } from "@tanstack/react-query";
import { getWeather } from "@/services/weatherService.api.ts";

export const useWeather = (lat: number | null, lon: number | null) => {
  return useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => getWeather(lat!, lon!),
    enabled: !!lat && !!lon,
    staleTime: 1000 * 60 * 15,
    retry: 2,
  });
};
