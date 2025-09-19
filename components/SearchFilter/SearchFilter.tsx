import React from "react";

type SearchFilterProps = {
  searchTerm: string;
  isSearching: boolean;
  onSearchChange: (value: string) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  isSearching,
  onSearchChange,
}) => {
  return (
    <div className="lg:col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Search
        {isSearching ? (
          <span className="ml-2 text-blue-600 text-sm">
            <span className="animate-spin inline-block w-3 h-3 border border-blue-600 border-t-transparent rounded-full"></span>
            Searching...
          </span>
        ): null}
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="Search restaurants..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {isSearching ? (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          </div>
        ): null}
      </div>
    </div>
  );
};
