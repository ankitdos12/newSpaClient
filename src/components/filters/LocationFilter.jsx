// src/components/filters/LocationFilter.jsx
import React, { useContext, useEffect } from 'react';
import { FilterContext } from '../../context/FilterContext';

const LocationFilter = () => {
    const { filters, availableFilters, updateFilter, loading, error, filteredSpasCount } = useContext(FilterContext);

    // Add logging effect
    useEffect(() => {
        console.log('Current Filters:', filters);
        console.log('Available Filters:', availableFilters);
        console.log('Filtered Spas Count:', filteredSpasCount);
    }, [filters, availableFilters, filteredSpasCount]);

    if (loading) {
        return <div className="text-center py-4">Loading locations...</div>;
    }

    if (error) {
        return <div className="text-red-500 py-4">Error: {error}</div>;
    }

    if (!availableFilters.countries.length) {
        return <div className="text-gray-500 py-4">No locations available</div>;
    }

    return (
        <>
            <div className="space-y-3">
                {/* Country dropdown */}
                <div>
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <select
                        value={filters.country}
                        onChange={(e) => updateFilter('country', e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Countries</option>
                        {availableFilters.countries.map(country => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </select>
                </div>

                {/* State dropdown (only show if country is selected) */}
                {filters.country && (
                    <div>
                        <label className="block text-sm font-medium mb-1">State/Province</label>
                        <select
                            value={filters.state}
                            onChange={(e) => updateFilter('state', e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All States</option>
                            {availableFilters.states.map(state => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                    </div>
                )}

                {/* District dropdown (only show if state is selected) */}
                {filters.state && (
                    <div>
                        <label className="block text-sm font-medium mb-1">District</label>
                        <select
                            value={filters.district}
                            onChange={(e) => updateFilter('district', e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Districts</option>
                            {availableFilters.districts.map(district => (
                                <option key={district} value={district}>{district}</option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Locality dropdown (only show if district is selected) */}
                {filters.district && (
                    <div>
                        <label className="block text-sm font-medium mb-1">Locality</label>
                        <select
                            value={filters.locality}
                            onChange={(e) => updateFilter('locality', e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Localities</option>
                            {availableFilters.localities.map(locality => (
                                <option key={locality} value={locality}>{locality}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
            <div className="mt-4 text-center">
                {filteredSpasCount > 0 ? (
                    <div className="text-green-600">
                        Found {filteredSpasCount} spas matching your criteria
                    </div>
                ) : !loading && (
                    <div className="text-red-500">
                        No spas found matching your selected criteria
                    </div>
                )}
            </div>
        </>
    );
};

export default LocationFilter;