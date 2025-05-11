import React from "react";
import { MainBreadcrumb } from "@/components/breadcrumb/MainBreadcrumb";
import { SearchBar } from "./searchbar";

// Using the same BreadcrumbItemType from MainBreadcrumb
interface NavigationBarProps {
  items: BreadcrumbItemType[];
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
}

export function NavigationBar({ 
  items, 
  onSearch, 
  searchPlaceholder = "Search..." 
}: NavigationBarProps) {
  return (
    // make the background goes blurry when scrolling

    <div className="w-full sticky top-0 z-100 backdrop-blur-md transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <MainBreadcrumb items={items} />
          </div>
          <div className="w-full md:w-64 lg:w-96">
            <SearchBar 
              onSearch={onSearch} 
              placeholder={searchPlaceholder} 
              className="w-full" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}