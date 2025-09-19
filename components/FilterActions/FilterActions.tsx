import React from 'react';

type FilterActionsProps = {
  onRefresh: () => void;
  onClearAll: () => void;
}

export const FilterActions: React.FC<FilterActionsProps> = ({
  onRefresh,
  onClearAll,
}) => {
  return (
    <div className="flex justify-between">
      <button
        onClick={onRefresh}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors"
      >
        Refresh Data
      </button>
      <button
        onClick={onClearAll}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
};
