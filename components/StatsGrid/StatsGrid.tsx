import React from 'react';
import { StatsCard } from '../StatsCard';

interface StatItem {
  title: string;
  value: string | number;
  icon: string;
  iconBgColor: string;
  iconTextColor?: string;
}

interface StatsGridProps {
  stats: StatItem[];
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          iconBgColor={stat.iconBgColor}
          iconTextColor={stat.iconTextColor}
        />
      ))}
    </div>
  );
};


