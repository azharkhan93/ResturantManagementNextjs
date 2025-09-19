"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  RestaurantCard,
  Pagination,
  SearchFilter,
  SortFilter,
  BasicFilters,
  AdvancedFilters,
  FilterActions,
  ResultsControls,
} from "@/components";
import {
  useRestaurantData,
  useRestaurantFilters,
  usePagination,
  useRestaurantSearch,
  useLoadingError,
  useApiOperations,
} from "@/hooks";

export default function RestaurantsPage() {
  const pathname = usePathname();

 
  const { clearError } = useLoadingError();
  const { refreshRestaurants: refreshRestaurantsApi } = useApiOperations();


  const {
    searchTerm,
    debouncedSearchTerm,
    isSearching,
    handleSearchChange,
    clearSearch,
  } = useRestaurantSearch();

  
  const {
    restaurantsWithStats,
    cuisines,
    locations,
    isLoading,
    error,
    refreshRestaurants,
  } = useRestaurantData({
    searchTerm: debouncedSearchTerm,
    filterLocation: "all",
    filterCuisine: "all",
  });

 
  const {
    filterCuisine,
    filterStatus,
    filterLocation,
    dateRange,
    startDate,
    endDate,
    amountRange,
    hourRange,
    sortBy,
    setFilterCuisine,
    setFilterStatus,
    setFilterLocation,
    setDateRange,
    setStartDate,
    setEndDate,
    setAmountRange,
    setHourRange,
    setSortBy,
    handleFilterChange,
    clearAllFilters,
    filteredRestaurants,
  } = useRestaurantFilters({
    restaurantsWithStats,
    debouncedSearchTerm,
  });

 
  const {
    currentPage,
    itemsPerPage,
    totalPages,
    startIndex,
    endIndex,
    handlePageChange,
    handleItemsPerPageChange,
    resetToFirstPage,
  } = usePagination({
    totalItems: filteredRestaurants.length,
  });

  
  const paginatedRestaurants = filteredRestaurants.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Filters & Search
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          <SearchFilter
            searchTerm={searchTerm}
            isSearching={isSearching}
            onSearchChange={handleSearchChange}
          />
          <SortFilter
            sortBy={sortBy}
            onSortChange={(value) => handleFilterChange("sort", value)}
          />
          <BasicFilters
            filterCuisine={filterCuisine}
            filterStatus={filterStatus}
            cuisines={cuisines}
            onCuisineChange={(value) => handleFilterChange("cuisine", value)}
            onStatusChange={(value) => handleFilterChange("status", value)}
          />
        </div>

        <AdvancedFilters
          filterLocation={filterLocation}
          dateRange={dateRange}
          amountRange={amountRange}
          hourRange={hourRange}
          startDate={startDate}
          endDate={endDate}
          locations={locations}
          onLocationChange={(value) => handleFilterChange("location", value)}
          onDateRangeChange={(value) => handleFilterChange("dateRange", value)}
          onAmountRangeChange={(value) =>
            handleFilterChange("amountRange", value)
          }
          onHourRangeChange={(value) => handleFilterChange("hourRange", value)}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />

        <FilterActions
          onRefresh={refreshRestaurantsApi}
          onClearAll={() => {
            clearSearch();
            clearAllFilters();
            resetToFirstPage();
            clearError();
          }}
        />
      </div>

      <ResultsControls
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={filteredRestaurants.length}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex justify-between items-start">
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <div className="mt-3 flex space-x-3">
                <button
                  onClick={refreshRestaurantsApi}
                  className="text-sm font-medium text-red-600 hover:text-red-800 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-md transition-colors"
                >
                  Retry
                </button>
                <button
                  onClick={clearError}
                  className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">
            {isSearching ? "Searching restaurants..." : "Loading restaurants..."}
          </span>
        </div>
      ): null}

      {!isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ):null}

      {!isLoading && filteredRestaurants.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredRestaurants.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      )}

      {!isLoading && filteredRestaurants.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No restaurants found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}
