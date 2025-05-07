import React, { useContext } from 'react';
import { FilterContext } from '../../context/FilterContext';

const TypeFilter = () => {
    const { filters, availableFilters, updateFilter } = useContext(FilterContext);

    return (
        <div>
            <select
                value={filters.spaType}
                onChange={(e) => updateFilter('spaType', e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All Types</option>
                {availableFilters.spaTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
        </div>
    );
};

export default TypeFilter;