import axios from "axios";
import { geoClient } from "@/services/axios.ts";
import type { GeoResult } from "@/types/country.ts";

export const searchCities = async (query: string): Promise<GeoResult[]> => {
  const response = await geoClient.get(
    `/search?name=${query}&count=5&language=en&format=json`,
  );
  return response.data.results || [];
};

export const getCityName = async (
  lat: number,
  lon: number,
): Promise<GeoResult | null> => {
  try {
    // I used BigDataCloud because Open-Meteo doesn't support reverse geocoding
    const response = await axios.get(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
    );

    const data = response.data;
    return {
      id: 0,
      name: data.city || data.locality || "Unknown Location",
      country: data.countryName || "",
      latitude: lat,
      longitude: lon,
      admin1: data.principalSubdivision,
    };
  } catch (error) {
    console.error("Reverse geocoding failed", error);
    return null;
  }
};
