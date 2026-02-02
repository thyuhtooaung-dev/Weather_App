import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import { searchMockData } from "@/mock/searchMockData.ts";

export default function Searchbar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e: { target: { value: any; }; }) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      const filtered = searchMockData.filter((city) =>
        city.name.toLowerCase().includes(value.toLowerCase()),
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <div className={"grid grid-cols-1 gap-2"}>
      <div className={"relative"}>
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600">
          <img
            src="/images/icon-search.svg"
            alt="dollar sign logo"
            className="h-6 w-4"
          />
        </span>
        <Input placeholder="Search for a place..." className={"pl-12 py-6 border-none bg-neutral-700 placeholder:text-neutral-200"} />
      </div>
      <Button className={"w-full bg-blue-500 py-6 text-base font-bold text-neutral-200"}>Search</Button>
    </div>
  );
}