export interface Restaurant {
  id: number;
  name: string;
  location: string;
  cuisine: string;
  created_at: string;
  updated_at: string;
 
  rating?: number;
  totalOrders?: number;
  revenue?: number;
  status?: string;
  image?: string;
}

export interface Order {
  id: number;
  restaurant_id: number;
  order_amount: string;
  order_time: string;
  created_at: string;
  updated_at: string;
  restaurant?: Restaurant;
}

export interface OrderWithRestaurant {
  success: boolean;
  data: Order;
}

export interface OrderAnalytics {
  success: boolean;
  data: {
    daily_trends: Array<{
      date: string;
      order_count: number;
      revenue: number;
      average_order_value: number;
      peak_hour: number;
      peak_hour_orders: number;
    }>;
    date_range: {
      start_date: string | null;
      end_date: string | null;
    };
    peak_hours: Array<{
      hour: number;
      order_count: number;
      revenue: string;
    }>;
    restaurant: Restaurant;
    summary: {
      total_orders: number;
      total_revenue: number;
      average_order_value: number;
      most_active_day: string;
      most_active_hour: number;
    };
  };
}

export interface OrdersResponse {
  success: boolean;
  data: {
    current_page: number;
    data: Order[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
      url: string | null;
      label: string;
      page: number | null;
      active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

export interface ApiResponse {
  success: boolean;
  data: {
    current_page: number;
    data: Restaurant[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
      url: string | null;
      label: string;
      page: number | null;
      active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

export interface SearchApiResponse {
  success: boolean;
  data: Restaurant[];
}
