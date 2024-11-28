'use client';

import { Input } from "@/components/ui/input";
import { Search, X } from 'lucide-react';

interface FilterBannerProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export function FilterBanner({ searchQuery, setSearchQuery }: FilterBannerProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Search banners..."
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
    </div>
  );
} 