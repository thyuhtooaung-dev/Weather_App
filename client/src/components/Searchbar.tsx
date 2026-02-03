import * as React from "react";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner.tsx";
import type { GeoResult } from "@/types/country.ts";
import { searchCities } from "@/services/geoService.api.ts";

export default function Searchbar({onLocationSelect} : {onLocationSelect: (lat: number, long: number, city: string, country: string) => void}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeoResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(false);
  };

  const handleSearch = async () => {
    if (query.length > 2) {
      setIsLoading(true);
      setIsOpen(false);

      try {
        const data = await searchCities(query);
        setResults(data);
        setIsOpen(true);
      } catch (error) {
        console.error("Search failed", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 md:max-w-160 lg:max-w-190 gap-2 relative z-50 w-full">
      <div className="relative md:col-span-3">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600">
          <img
            src="/images/icon-search.svg"
            alt="search icon"
            className="h-6 w-4"
          />
        </span>
        <Input
          placeholder="Search for a place..."
          className="pl-12 py-6 border-none bg-neutral-700 placeholder:text-neutral-200 text-white focus:outline cursor-pointer"
          value={query}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        {isLoading && (
          <div className="absolute top-full left-0 right-0 mt-2 flex gap-2 bg-neutral-800 rounded-md shadow-lg overflow-hidden border border-neutral-700 p-4 text-white items-center">
            <Spinner />
            <span>Search in progress</span>
          </div>
        )}

        {!isLoading && isOpen && results.length > 0 && (
          <ul className="absolute top-full left-0 right-0 mt-2 bg-neutral-800 rounded-md shadow-lg overflow-hidden border border-neutral-700">
            {results.map((city) => (
              <li
                key={city.id}
                className="p-3 hover:bg-neutral-700 cursor-pointer text-white border-b border-neutral-700 last:border-none flex justify-between"
                onClick={() => {
                  onLocationSelect(
                    city.latitude,
                    city.longitude,
                    city.country,
                    city.name,
                  );
                  setIsOpen(false);
                }}
              >
                <span>{city.name}</span>
                <span className="text-neutral-400 text-sm">
                  {city.admin1 ? `${city.admin1}, ` : ""}
                  {city.country}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Button
        className="w-full bg-blue-500 py-6 text-base font-bold text-neutral-200 hover:bg-blue-600 focus:outline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleSearch}
        disabled={isLoading}
      >
        {isLoading ? "..." : "Search"}
      </Button>
    </div>
  );
}
