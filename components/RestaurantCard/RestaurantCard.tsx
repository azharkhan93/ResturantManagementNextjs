import Link from "next/link";
import { Restaurant } from "@/types";

type RestaurantCardProps = {
  restaurant: Restaurant;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
}) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-4xl">{restaurant.image || "🍽️"}</div>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              (restaurant.status || "Active") === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {restaurant.status || "Active"}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {restaurant.name}
        </h3>
        <p className="text-gray-600 mb-1">
          {restaurant.cuisine} • {restaurant.location}
        </p>

        <div className="flex items-center mb-4">
          <span className="text-sm text-gray-600 font-medium">
            ID: {restaurant.id}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-lg font-semibold text-gray-900">
              {(restaurant.totalOrders || 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="text-lg font-semibold text-gray-900">
              ${(restaurant.revenue || 0).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <Link
            href={`/restaurants/${restaurant.id}`}
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            View Analytics →
          </Link>
        </div>
      </div>
    </div>
  );
};
