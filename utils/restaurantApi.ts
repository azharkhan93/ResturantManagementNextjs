import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "./config";
import {
  Restaurant,
  ApiResponse,
  OrderWithRestaurant,
  OrderAnalytics,
  Order,
  SearchApiResponse,
} from "@/types";

export interface RestaurantFilters {
  search?: string;
  location?: string;
  cuisine?: string;
  page?: number;
  per_page?: number;
}

export const restaurantApi = {
  getRestaurants: async (
    filters: RestaurantFilters = {}
  ): Promise<Restaurant[]> => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });

    const url = `${API_ENDPOINTS.RESTAURANTS}?${params.toString()}`;
    console.log("Fetching restaurants from:", url);

    const response = await apiClient.get<ApiResponse | SearchApiResponse>(url);
    console.log("Restaurants API response:", response);

    
    if ('data' in response && Array.isArray(response.data)) {
      
      return response.data;
    } else if ('data' in response && 'data' in response.data) {
      
      return response.data.data;
    } else {
      console.error("Unexpected API response format:", response);
      return [];
    }
  },

  getRestaurant: async (id: number): Promise<Restaurant> => {
    const response = await apiClient.get<{
      success: boolean;
      data: Restaurant;
    }>(`${API_ENDPOINTS.RESTAURANTS}/${id}`);
    return response.data;
  },

 
  getOrderById: async (id: number): Promise<OrderWithRestaurant> => {
    console.log("Fetching order from:", `${API_ENDPOINTS.ORDERS}/${id}`);
    const response = await apiClient.get<OrderWithRestaurant>(
      `${API_ENDPOINTS.ORDERS}/${id}`
    );
    console.log("Order API response:", response);
    return response;
  },

  
  getOrderAnalytics: async (id: number): Promise<OrderAnalytics> => {
    console.log(
      "Fetching analytics from:",
      `${API_ENDPOINTS.ORDERS}/${id}/analytics`
    );
    const response = await apiClient.get<OrderAnalytics>(
      `${API_ENDPOINTS.ORDERS}/${id}/analytics`
    );
    console.log("Analytics API response:", response);
    return response;
  },

  // Get restaurant analytics by restaurant ID
  getRestaurantAnalytics: async (
    restaurantId: number
  ): Promise<OrderAnalytics> => {
    const url = `${API_ENDPOINTS.RESTAURANT_TRENDS}/${restaurantId}/trends`;
    console.log("Fetching restaurant analytics from:", url);
    const response = await apiClient.get<OrderAnalytics>(url);
    console.log("Restaurant analytics API response:", response);
    return response;
  },

  // Get all orders
  getAllOrders: async (): Promise<Order[]> => {
    console.log("Fetching all orders from:", API_ENDPOINTS.ORDERS);
    const response = await apiClient.get<{ success: boolean; data: Order[] }>(
      API_ENDPOINTS.ORDERS
    );
    console.log("All orders API response:", response);
    return response.data;
  },

  
  getTopRestaurants: async (): Promise<any> => {
    console.log("Fetching top restaurants from:", API_ENDPOINTS.TOP_RESTAURANTS);
    const response = await apiClient.get<any>(API_ENDPOINTS.TOP_RESTAURANTS);
    console.log("Top restaurants API response:", response);
    return response;
  },

 
  getAnalyticsOverview: async (): Promise<any> => {
    console.log("Fetching analytics overview from:", API_ENDPOINTS.ANALYTICS_OVERVIEW);
    const response = await apiClient.get<any>(API_ENDPOINTS.ANALYTICS_OVERVIEW);
    console.log("Analytics overview API response:", response);
    return response;
  },
};
