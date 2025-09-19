export const NAVIGATION_LINKS = [
  { name: 'Overview', href: '/', icon: '📊' },
  { name: 'Restaurants', href: '/restaurants', icon: '🏪' },
  // { name: 'Orders', href: '/orders', icon: '📋' },
  // { name: 'Menu', href: '/menu', icon: '🍽️' },
  // { name: 'Customers', href: '/customers', icon: '👥' },
  // { name: 'Analytics', href: '/analytics', icon: '📈' },
  // { name: 'Settings', href: '/settings', icon: '⚙️' },
] as const;

export type NavigationLink = typeof NAVIGATION_LINKS[number];


export interface StatItem {
  title: string;
  value: string | number;
  icon: string;
  iconBgColor: string;
  iconTextColor?: string;
}

export const STATS_CONFIG = {
  STATIC_STATS: [
    {
      title: 'Active Customers',
      value: '1,234',
      icon: '👥',
      iconBgColor: 'bg-yellow-500'
    },
    {
      title: 'Menu Items',
      value: '89',
      icon: '🍽️',
      iconBgColor: 'bg-purple-500'
    }
  ] as StatItem[],
  
  DYNAMIC_STATS: {
    TOTAL_REVENUE: {
      title: 'Total Revenue',
      icon: '📊',
      iconBgColor: 'bg-blue-500'
    },
    TOTAL_ORDERS: {
      title: 'Total Orders',
      icon: '📋',
      iconBgColor: 'bg-green-500'
    }
  }
} as const;
