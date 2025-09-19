export const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const API_ENDPOINTS = {
  RESTAURANTS: '/restaurants',
  ORDERS: '/orders',
  MENU: '/menu',
  CUSTOMERS: '/customers',
  ANALYTICS: '/analytics',
  AUTH: '/auth',
  // Analytics endpoints
  RESTAURANT_TRENDS: '/analytics/restaurant',
  TOP_RESTAURANTS: '/analytics/top-restaurants',
  ANALYTICS_OVERVIEW: '/analytics/overview',
} as const;
export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  TIMEOUT: 10000, 
  HEADERS: {
    'Content-Type': 'application/json',
  },
} as const;
