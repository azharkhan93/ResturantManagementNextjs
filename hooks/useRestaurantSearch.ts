import { useState, useEffect } from 'react';
import { useDebouncedSearch } from './useDebounce';
import { useLoadingError } from './useLoadingError';

export const useRestaurantSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isSearching, setSearching } = useLoadingError();
  
  const debouncedSearchTerm = useDebouncedSearch(searchTerm, 300);

  useEffect(() => {
    if (searchTerm !== debouncedSearchTerm) {
      setSearching(true);
    } else {
      setSearching(false);
    }
  }, [searchTerm, debouncedSearchTerm, setSearching]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return {
    searchTerm,
    debouncedSearchTerm,
    isSearching,
    handleSearchChange,
    clearSearch,
  };
};
