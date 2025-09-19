import { useCallback } from "react";
import { useLoadingError } from "./useLoadingError";
import { restaurantApi } from "@/utils";

type UseApiOperationsReturn = {
  isLoading: boolean;
  error: string | null;
  isSearching: boolean;
  clearError: () => void;
  fetchRestaurants: (filters?: any) => Promise<any>;
  fetchOrders: () => Promise<any>;
  refreshRestaurants: () => Promise<any>;
  fetchRestaurantById: (id: number) => Promise<any>;
  fetchRestaurantAnalytics: (id: number) => Promise<any>;
  fetchTopRestaurants: () => Promise<any>;
  fetchAnalyticsOverview: () => Promise<any>;
}

export const useApiOperations = (): UseApiOperationsReturn => {
  const {
    isLoading,
    error,
    isSearching,
    setSearching,
    clearError,
    executeWithLoading,
  } = useLoadingError();

  const fetchRestaurants = useCallback(
    async (filters: any = {}) => {
      return executeWithLoading(
        () => restaurantApi.getRestaurants(filters),
        {
          errorMessage: "Failed to fetch restaurants",
        }
      );
    },
    [executeWithLoading]
  );

  const fetchOrders = useCallback(
    async () => {
      return executeWithLoading(
        () => restaurantApi.getAllOrders(),
        {
          errorMessage: "Failed to fetch orders",
        }
      );
    },
    [executeWithLoading]
  );

  const refreshRestaurants = useCallback(
    async () => {
      return executeWithLoading(
        () => restaurantApi.getRestaurants({}),
        {
          errorMessage: "Failed to refresh restaurants",
        }
      );
    },
    [executeWithLoading]
  );

  const fetchRestaurantById = useCallback(
    async (id: number) => {
      return executeWithLoading(
        () => restaurantApi.getRestaurant(id),
        {
          errorMessage: `Failed to fetch restaurant with ID ${id}`,
        }
      );
    },
    [executeWithLoading]
  );

  const fetchRestaurantAnalytics = useCallback(
    async (id: number) => {
      return executeWithLoading(
        () => restaurantApi.getRestaurantAnalytics(id),
        {
          errorMessage: `Failed to fetch analytics for restaurant ${id}`,
        }
      );
    },
    [executeWithLoading]
  );

  const fetchTopRestaurants = useCallback(
    async () => {
      return executeWithLoading(
        () => restaurantApi.getTopRestaurants(),
        {
          errorMessage: "Failed to fetch top restaurants",
        }
      );
    },
    [executeWithLoading]
  );

  const fetchAnalyticsOverview = useCallback(
    async () => {
      return executeWithLoading(
        () => restaurantApi.getAnalyticsOverview(),
        {
          errorMessage: "Failed to fetch analytics overview",
        }
      );
    },
    [executeWithLoading]
  );

  return {
    isLoading,
    error,
    isSearching,
    clearError,
    fetchRestaurants,
    fetchOrders,
    refreshRestaurants,
    fetchRestaurantById,
    fetchRestaurantAnalytics,
    fetchTopRestaurants,
    fetchAnalyticsOverview,
  };
};
