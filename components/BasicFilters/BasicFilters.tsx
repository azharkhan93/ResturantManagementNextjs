import React from 'react';

type BasicFiltersProps = {
  filterCuisine: string;
  filterStatus: string;
  cuisines: string[];
  onCuisineChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export const BasicFilters: React.FC<BasicFiltersProps> = ({
  filterCuisine,
  filterStatus,
  cuisines,
  onCuisineChange,
  onStatusChange,
}) => {
  return (
    <>
     
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cuisine
        </label>
        <select
          value={filterCuisine}
          onChange={(e) => onCuisineChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Cuisines</option>
          {cuisines.map((cuisine) => (
            <option key={cuisine} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>
      </div>

     
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <select
          value={filterStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
    </>
  );
};
