import React, { useContext } from 'react';
import { FilterContext } from '../../context/FilterContext';
import LocationFilter from './LocationFilter';
import TypeFilter from './TypeFilter';

const FilterPanel = () => {
    const { filters, updateFilter, resetFilters } = useContext(FilterContext);

    return (
        <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Filters</h2>
                <button
                    onClick={resetFilters}
                    className="text-sm text-blue-600 hover:text-blue-800"
                >
                    Reset All
                </button>
            </div>

            {/* Keyword search */}
            <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Search</label>
                <input
                    type="text"
                    value={filters.keyword}
                    onChange={(e) => updateFilter('keyword', e.target.value)}
                    placeholder="Spa name, address..."
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Location filters */}
            <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Location</h3>
                <LocationFilter />
            </div>

            {/* Spa type filter */}
            <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Spa Type</h3>
                <TypeFilter />
            </div>

            {/* Apply filters button (for mobile) */}
            <div className="md:hidden">
                <button
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default FilterPanel;