import { useState, useEffect, useMemo } from 'react';
import { Restaurant, Order } from '@/types';
import { useApiOperations } from './useApiOperations';

interface UseRestaurantDataProps {
  searchTerm: string;
  filterLocation: string;
  filterCuisine: string;
}

export const useRestaurantData = ({ searchTerm, filterLocation, filterCuisine }: UseRestaurantDataProps) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  
  const {
    isLoading,
    error,
    clearError,
    fetchRestaurants,
    fetchOrders,
    refreshRestaurants: refreshRestaurantsApi,
  } = useApiOperations();

  useEffect(() => {
    const loadData = async () => {
      console.log("Loading restaurants and orders data...");

      const restaurantFilters = {
        search: searchTerm || undefined,
        location: filterLocation !== "all" ? filterLocation : undefined,
        cuisine: filterCuisine !== "all" ? filterCuisine : undefined,
      };

      console.log("Restaurant filters:", restaurantFilters);

      const [restaurantsData, ordersData] = await Promise.all([
        fetchRestaurants(restaurantFilters),
        fetchOrders(),
      ]);

      if (restaurantsData && ordersData) {
        console.log("Restaurants data:", restaurantsData);
        console.log("Search term:", searchTerm);
        console.log(
          "Filtered restaurants count:",
          restaurantsData?.length || 0
        );

        if (restaurantsData && Array.isArray(restaurantsData)) {
          console.log(
            "Available restaurant names:",
            restaurantsData.map((r) => r.name)
          );
        }

        setRestaurants(restaurantsData);
        setOrders(ordersData);
      }
    };

    loadData();
  }, [searchTerm, filterLocation, filterCuisine, fetchRestaurants, fetchOrders]);

  // Calculate restaurants with stats
  const restaurantsWithStats = useMemo(() => {
    if (!restaurants || !Array.isArray(restaurants)) {
      return [];
    }
    return restaurants.map((restaurant) => {
      const restaurantOrders = (orders || []).filter(
        (order) => order.restaurant_id === restaurant.id
      );

      const totalOrders = restaurantOrders.length;
      const revenue = restaurantOrders.reduce((sum, order) => {
        return sum + parseFloat(order.order_amount);
      }, 0);

      return {
        ...restaurant,
        totalOrders,
        revenue: Math.round(revenue * 100) / 100,
        rating: 4.0 + Math.random() * 1.0,
        status: "Active",
        image: "🍽️",
      };
    });
  }, [restaurants, orders]);

  // Get unique cuisines and locations
  const cuisines = useMemo(
    () => [...new Set(restaurantsWithStats.map((r) => r.cuisine))],
    [restaurantsWithStats]
  );
  const locations = useMemo(
    () => [...new Set(restaurantsWithStats.map((r) => r.location))],
    [restaurantsWithStats]
  );

  // Refresh function
  const refreshRestaurants = async () => {
    const restaurantsData = await refreshRestaurantsApi();
    if (restaurantsData) {
      setRestaurants(restaurantsData);
    }
  };

  return {
    restaurants,
    orders,
    restaurantsWithStats,
    cuisines,
    locations,
    isLoading,
    error,
    refreshRestaurants,
  };
};
