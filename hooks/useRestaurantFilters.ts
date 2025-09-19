import { useState, useMemo, useCallback } from 'react';

type Restaurant = {
  id: number;
  name: string;
  cuisine: string;
  location: string;
  created_at: string;
  updated_at: string;
  totalOrders: number;
  revenue: number;
  rating?: number;
  status?: string;
  image?: string;
}

interface UseRestaurantFiltersProps {
  restaurantsWithStats: Restaurant[];
  debouncedSearchTerm: string;
}

export const useRestaurantFilters = ({ restaurantsWithStats, debouncedSearchTerm }: UseRestaurantFiltersProps) => {
  
  const [filterCuisine, setFilterCuisine] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [amountRange, setAmountRange] = useState("all");
  const [hourRange, setHourRange] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  
  const handleFilterChange = useCallback(
    (filterType: string, value: string) => {
      switch (filterType) {
        case "search":
          
          break;
        case "sort":
          setSortBy(value);
          break;
        case "cuisine":
          setFilterCuisine(value);
          break;
        case "status":
          setFilterStatus(value);
          break;
        case "location":
          setFilterLocation(value);
          break;
        case "dateRange":
          setDateRange(value);
          break;
        case "amountRange":
          setAmountRange(value);
          break;
        case "hourRange":
          setHourRange(value);
          break;
      }
    },
    []
  );

  
  const clearAllFilters = useCallback(() => {
    setFilterCuisine("all");
    setFilterStatus("all");
    setFilterLocation("all");
    setDateRange("all");
    setStartDate("");
    setEndDate("");
    setAmountRange("all");
    setHourRange("all");
    setSortBy("name");
  }, []);

 
  const filteredRestaurants = useMemo(() => {
    const filtered = restaurantsWithStats
      .filter((restaurant) => {
        const searchTerm = debouncedSearchTerm.trim().toLowerCase();
        const matchesSearch =
          searchTerm === "" ||
          restaurant.name.toLowerCase().includes(searchTerm) ||
          restaurant.cuisine.toLowerCase().includes(searchTerm) ||
          restaurant.location.toLowerCase().includes(searchTerm);
        const matchesCuisine =
          filterCuisine === "all" || restaurant.cuisine === filterCuisine;
        const matchesStatus =
          filterStatus === "all" || restaurant.status === filterStatus;
        const matchesLocation =
          filterLocation === "all" || restaurant.location === filterLocation;

        // Amount range filter
        let matchesAmount = true;
        if (amountRange !== "all") {
          const revenue = restaurant.revenue || 0;
          switch (amountRange) {
            case "0-10000":
              matchesAmount = revenue >= 0 && revenue <= 10000;
              break;
            case "10000-30000":
              matchesAmount = revenue > 10000 && revenue <= 30000;
              break;
            case "30000-50000":
              matchesAmount = revenue > 30000 && revenue <= 50000;
              break;
            case "50000+":
              matchesAmount = revenue > 50000;
              break;
          }
        }

        // Date range filter (simplified - in real app would check actual dates)
        let matchesDateRange = true;
        if (dateRange !== "all") {
          matchesDateRange = true; // Mock implementation
        }

        // Hour range filter (simplified - in real app would check peak hours)
        let matchesHourRange = true;
        if (hourRange !== "all") {
          matchesHourRange = true; // Mock implementation
        }

        return (
          matchesSearch &&
          matchesCuisine &&
          matchesStatus &&
          matchesLocation &&
          matchesAmount &&
          matchesDateRange &&
          matchesHourRange
        );
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "name":
            return a.name.localeCompare(b.name);
          case "rating":
            return (b.rating || 0) - (a.rating || 0);
          case "revenue":
            return (b.revenue || 0) - (a.revenue || 0);
          case "orders":
            return (b.totalOrders || 0) - (a.totalOrders || 0);
          default:
            return 0;
        }
      });

    return filtered;
  }, [
    restaurantsWithStats,
    debouncedSearchTerm,
    filterCuisine,
    filterStatus,
    filterLocation,
    amountRange,
    dateRange,
    hourRange,
    sortBy,
  ]);

  return {
    // Filter states
    filterCuisine,
    filterStatus,
    filterLocation,
    dateRange,
    startDate,
    endDate,
    amountRange,
    hourRange,
    sortBy,
    // Setters
    setFilterCuisine,
    setFilterStatus,
    setFilterLocation,
    setDateRange,
    setStartDate,
    setEndDate,
    setAmountRange,
    setHourRange,
    setSortBy,
    // Functions
    handleFilterChange,
    clearAllFilters,
    // Computed
    filteredRestaurants,
  };
};
