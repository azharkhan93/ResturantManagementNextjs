"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Restaurant, OrderAnalytics } from "@/types";
import { restaurantApi, formatCurrencyWithoutDecimals, formatCurrencyWithDecimals } from "@/utils";

export default function RestaurantDetailPage() {
  const params = useParams();
  const restaurantId = params.id as string;

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [analytics, setAnalytics] = useState<OrderAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRestaurantData = async () => {
      if (!restaurantId) return;

      setIsLoading(true);
      setError(null);

      try {
        console.log("Loading restaurant data for ID:", restaurantId);

       
        const restaurantData = await restaurantApi.getRestaurant(
          parseInt(restaurantId)
        );
        console.log("Restaurant data:", restaurantData);
        setRestaurant(restaurantData);

       
        try {
          const analyticsData = await restaurantApi.getRestaurantAnalytics(
            parseInt(restaurantId)
          );
          console.log("Analytics data:", analyticsData);
          setAnalytics(analyticsData);

          
        } catch (analyticsError) {
          console.warn(
            "Analytics failed to load, but continuing with restaurant data:",
            analyticsError
          );
          setError(
            "Restaurant data loaded, but analytics are currently unavailable."
          );
        }
      } catch (err) {
        console.error("Error loading restaurant data:", err);
        let errorMessage = "Failed to load restaurant data";

        if (err instanceof Error) {
          if (err.message.includes("500")) {
            errorMessage =
              "Server error: The analytics service is currently unavailable. Please try again later.";
          } else if (err.message.includes("404")) {
            errorMessage = "Analytics not found for this restaurant.";
          } else {
            errorMessage = `Failed to load restaurant data: ${err.message}`;
          }
        }

        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadRestaurantData();
  }, [restaurantId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">
          Loading restaurant details...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🍽️</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Restaurant not found
        </h3>
        <p className="text-gray-600">
          The restaurant you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {restaurant.name}
            </h1>
            <p className="mt-2 text-gray-600">
              {restaurant.cuisine} • {restaurant.location}
            </p>
            <p className="text-sm text-gray-500">ID: {restaurant.id}</p>
          </div>
          <Link
            href="/restaurants"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
          >
            ← Back to Restaurants
          </Link>
        </div>
      </div>

    
      {analytics ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Order Analytics
          </h2>

        
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-3xl font-bold text-blue-600">
                {analytics.data.summary.total_orders}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-3xl font-bold text-green-600">
                {formatCurrencyWithoutDecimals(analytics.data.summary.total_revenue)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Average Order Value</p>
              <p className="text-3xl font-bold text-purple-600">
                {formatCurrencyWithDecimals(analytics.data.summary.average_order_value)}
              </p>
            </div>
          </div>

         
          {analytics.data.daily_trends &&
            analytics.data.daily_trends.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Daily Trends
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Orders
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Revenue
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Avg Order Value
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Peak Hour
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {analytics.data.daily_trends.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(item.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.order_count}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrencyWithoutDecimals(item.revenue)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrencyWithDecimals(item.average_order_value)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.peak_hour}:00 ({item.peak_hour_orders} orders)
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

        
          {analytics.data.peak_hours &&
            analytics.data.peak_hours.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Peak Hours
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {analytics.data.peak_hours.map((hour, index) => (
                    <div
                      key={index}
                      className="text-center p-4 bg-gray-50 rounded-lg"
                    >
                      <p className="text-sm text-gray-500">{hour.hour}:00</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {hour.order_count} orders
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatCurrencyWithoutDecimals(parseFloat(hour.revenue))}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          
          {analytics.data.summary && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Restaurant Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Most Active Day</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(
                      analytics.data.summary.most_active_day
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Most Active Hour</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {analytics.data.summary.most_active_hour}:00
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ): null}
    </div>
  );
}
