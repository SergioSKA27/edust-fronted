import React, { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ 
  onSearch, 
  placeholder = "Search...", 
  className = "" 
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`relative flex items-center ${className}`}
    >
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-gray-500" />
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full py-2 pl-10 pr-4 text-sm bg-white border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder={placeholder}
        />
      </div>
      <button
        type="submit"
        className="absolute right-2.5 px-3 py-1 text-xs text-white bg-primary rounded-lg hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-primary/50"
      >
        Search
      </button>
    </form>
  );
}