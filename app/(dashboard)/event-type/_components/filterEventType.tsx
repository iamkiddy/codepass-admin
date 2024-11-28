'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ListFilter, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface FilterEventTypeProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export function FilterEventType({ searchQuery, setSearchQuery }: FilterEventTypeProps) {
  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
  ];

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Search event types..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-100 pl-10 pr-10 focus:bg-white rounded-full border-0 focus:ring-2 focus:ring-primaryColor/20"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="border-gray-300 rounded hover:bg-gray-100 transition-colors"
          >
            <ListFilter className="h-4 w-4" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white">
          {countries.map((country) => (
            <DropdownMenuItem key={country}>
              {country}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
