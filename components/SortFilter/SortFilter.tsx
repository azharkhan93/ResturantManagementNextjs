import React from 'react';

type SortFilterProps = {
  sortBy: string;
  onSortChange: (value: string) => void;
}

export const SortFilter: React.FC<SortFilterProps> = ({
  sortBy,
  onSortChange,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Sort By
      </label>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="name">Name</option>
        <option value="rating">Rating</option>
        <option value="revenue">Revenue</option>
        <option value="orders">Orders</option>
      </select>
    </div>
  );
};
