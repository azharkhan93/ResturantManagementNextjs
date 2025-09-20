import React from 'react';

type AdvancedFiltersProps = {
  filterLocation: string;
  dateRange: string;
  amountRange: string;
  hourRange: string;
  startDate: string;
  endDate: string;
  locations: string[];
  onLocationChange: (value: string) => void;
  onDateRangeChange: (value: string) => void;
  onAmountRangeChange: (value: string) => void;
  onHourRangeChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filterLocation,
  dateRange,
  amountRange,
  hourRange,
  startDate,
  endDate,
  locations,
  onLocationChange,
  onDateRangeChange,
  onAmountRangeChange,
  onHourRangeChange,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <>
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <select
            value={filterLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Range
          </label>
          <select
            value={dateRange}
            onChange={(e) => onDateRangeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Time</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

    
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Revenue Range
          </label>
          <select
            value={amountRange}
            onChange={(e) => onAmountRangeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Amounts</option>
            <option value="0-10000">₹0 - ₹10,000</option>
            <option value="10000-30000">₹10,000 - ₹30,000</option>
            <option value="30000-50000">₹30,000 - ₹50,000</option>
            <option value="50000+">₹50,000+</option>
          </select>
        </div>

        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Peak Hour Range
          </label>
          <select
            value={hourRange}
            onChange={(e) => onHourRangeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Hours</option>
            <option value="morning">Morning (6AM-12PM)</option>
            <option value="afternoon">Afternoon (12PM-6PM)</option>
            <option value="evening">Evening (6PM-12AM)</option>
            <option value="night">Night (12AM-6AM)</option>
          </select>
        </div>
      </div>

     
      {dateRange === "custom" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
    </>
  );
};
