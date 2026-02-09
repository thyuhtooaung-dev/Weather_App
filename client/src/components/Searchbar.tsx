import * as React from "react";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner.tsx";
import type { GeoResult } from "@/types/country.ts";
import { searchCities } from "@/services/geoService.api.ts";

export default function Searchbar({
  onLocationSelect,
}: {
  onLocationSelect: (
    lat: number,
    long: number,
    city: string,
    country: string,
  ) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeoResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(false);
  };

  const handleSearch = async () => {
    if (query.length > 2) {
      setIsLoading(true);
      setIsOpen(false);
      setHasSearched(true);
      try {
        const data = await searchCities(query);
        setResults(data);
        setIsOpen(true);
      } catch (error) {
        setResults([]);
        setIsOpen(true);
      } finally {
        setIsLoading(false);
      }
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const dropdownClasses =
    "absolute top-full left-0 right-0 mt-2 rounded-md shadow-lg overflow-hidden border bg-neutral-0 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700";

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 md:max-w-160 lg:max-w-190 gap-2 relative z-50 w-full">
      <div className="relative md:col-span-3">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
          <img
            src="/images/icon-search-light.svg"
            alt="search icon"
            className="h-6 w-4 dark:hidden"
          />
          <img
            src="/images/icon-search.svg"
            alt="search icon"
            className="h-6 w-4 hidden dark:block"
          />
        </span>

        <Input
          placeholder="Search for a place..."
          className="pl-12 py-6 border-none cursor-pointer focus:outline transition-colors
            bg-neutral-100 dark:bg-neutral-700
            text-neutral-900 dark:text-neutral-200
            placeholder:text-neutral-600 dark:placeholder:text-neutral-400"
          value={query}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        {isLoading && (
          <div
            className={`${dropdownClasses} p-4 flex gap-2 items-center text-neutral-900 dark:text-neutral-200`}
          >
            <Spinner />
            <span>Search in progress...</span>
          </div>
        )}

        {!isLoading && isOpen && results.length > 0 && (
          <ul className={dropdownClasses}>
            {results.map((city) => (
              <li
                key={city.id}
                className="p-3 cursor-pointer flex justify-between transition-colors border-b last:border-none
                  border-neutral-200 dark:border-neutral-700
                  text-neutral-900 dark:text-neutral-200
                  hover:bg-neutral-200 dark:hover:bg-neutral-700"
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
                <span className="text-neutral-600 dark:text-neutral-400 text-sm">
                  {city.admin1 ? `${city.admin1}, ` : ""}
                  {city.country}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Button
        className="w-full py-6 text-base font-bold text-neutral-200 focus:outline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
          bg-blue-500 hover:bg-blue-700"
        onClick={handleSearch}
        disabled={isLoading}
      >
        {isLoading ? "..." : "Search"}
      </Button>

      {!isLoading &&
        isOpen &&
        results.length === 0 &&
        hasSearched &&
        query.length > 2 && (
          <div
            className={`${dropdownClasses} p-6 flex flex-col items-center gap-2 text-center`}
          >
            <span className="text-neutral-900 dark:text-neutral-200 font-bold">
              No locations found
            </span>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              We couldn't find "{query}". <br /> Try searching for a larger city
              nearby.
            </p>
          </div>
        )}
    </div>
  );
}
