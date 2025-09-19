"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Restaurant, Order } from "@/types";
import { restaurantApi } from "@/utils";
import { StatsGrid } from "@/components";
import { STATS_CONFIG, StatItem } from "@/constants";

export default function Home() {
  const pathname = usePathname();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [topRestaurantsData, setTopRestaurantsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log("Loading restaurants and analytics for dashboard...");
        const [restaurantsData, topRestaurantsData, analyticsOverviewData] =
          await Promise.all([
            restaurantApi.getRestaurants({}),
            restaurantApi.getTopRestaurants(),
            restaurantApi.getAnalyticsOverview(),
          ]);
        console.log("Dashboard restaurants data:", restaurantsData);
        console.log("Top restaurants data:", topRestaurantsData);
        console.log("Analytics overview data:", analyticsOverviewData);
        setRestaurants(restaurantsData);
        setTopRestaurantsData(topRestaurantsData);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const topRestaurants = useMemo(() => {
    if (!topRestaurantsData?.data) return [];

    return topRestaurantsData.data.map((item: any) => ({
      ...item.restaurant,
      totalOrders: item.order_count,
      revenue: parseFloat(item.total_revenue),
    }));
  }, [topRestaurantsData]);

  const generateStatsData = (topRestaurants: any[]): StatItem[] => {
    const totalRevenue = topRestaurants.reduce(
      (sum: number, r: any) => sum + (r.revenue || 0),
      0
    );
    const totalOrders = topRestaurants.reduce(
      (sum: number, r: any) => sum + (r.totalOrders || 0),
      0
    );

    return [
      {
        ...STATS_CONFIG.DYNAMIC_STATS.TOTAL_REVENUE,
        value: `$${totalRevenue.toLocaleString()}`,
      },
      {
        ...STATS_CONFIG.DYNAMIC_STATS.TOTAL_ORDERS,
        value: totalOrders,
      },
      ...STATS_CONFIG.STATIC_STATS,
    ];
  };

  const statsData = useMemo(
    () => generateStatsData(topRestaurants),
    [topRestaurants]
  );

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome to your restaurant management dashboard
        </p>
      </div>

      <StatsGrid stats={statsData} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Top 3 Restaurants by Revenue
          </h3>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Loading...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">{error}</p>
            </div>
          ) : topRestaurants.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No restaurants found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {topRestaurants.map((restaurant: any, index: number) => {
                const medals = ["🥇", "🥈", "🥉"];
                const bgColors = ["bg-yellow-50", "bg-gray-50", "bg-orange-50"];

                return (
                  <Link
                    key={restaurant.id}
                    href={`/restaurants/${restaurant.id}`}
                    className="block"
                  >
                    <div
                      className={`flex items-center justify-between p-3 ${bgColors[index]} rounded-lg hover:shadow-md transition-shadow cursor-pointer`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{medals[index]}</span>
                        <div>
                          <p className="font-medium text-gray-900">
                            {restaurant.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {restaurant.location} • {restaurant.cuisine}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ${restaurant.revenue?.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          {restaurant.totalOrders?.toLocaleString()} orders
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recent Orders
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-900">Order #1234</p>
                <p className="text-xs text-gray-500">Table 5 • 2:30 PM</p>
              </div>
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                Completed
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-900">Order #1235</p>
                <p className="text-xs text-gray-500">Table 3 • 2:45 PM</p>
              </div>
              <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                In Progress
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900">Order #1236</p>
                <p className="text-xs text-gray-500">Table 8 • 3:00 PM</p>
              </div>
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                Pending
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/restaurants"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors text-center"
          >
            View Restaurants
          </Link>
          
        </div>
      </div>
    </div>
  );
}
