import React, { createContext, useState, useEffect, useCallback } from 'react';
import { getSpas } from '../api/api';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        keyword: '',
        country: '',
        state: '',
        district: '',
        locality: '',
        spaType: '',
        priceRange: '',
        category: '',
        duration: '',
    });

    const [availableFilters, setAvailableFilters] = useState({
        countries: [],
        states: [],
        districts: [],
        localities: [],
        spaTypes: ['Swedish Massage', 'Deep Tissue Massage', 'Thai Massage', 'Body Massage', 'Leg Massage', 'Shiatsu Massage'],
        categories: ['Massage', 'Facial'],
        priceRanges: ['0-1000', '1000-2000', '2000-3000', '3000+'],
        durations: ['45 mins', '60 mins', '90 mins']
    });

    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredSpasCount, setFilteredSpasCount] = useState(0);
    const [filteredSpas, setFilteredSpas] = useState([]);

    // Fetch locations data
    useEffect(() => {
        const fetchLocations = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getSpas();
                if (!data || !Array.isArray(data)) {
                    throw new Error('Invalid data format received');
                }
                setLocations(data);
            } catch (error) {
                console.error('Error fetching locations:', error);
                setError(error.message);
                setLocations([]);
            } finally {
                setLoading(false);
            }
        };
        fetchLocations();
    }, []);

    // Update available filters based on selected higher-level filters
    useEffect(() => {
        if (!locations || locations.length === 0) return;

        // console.log('Current locations:', locations); // Debug log

        const filteredResults = locations.filter(spa => {
            const matchesCountry = !filters.country || spa.location?.country === filters.country;
            const matchesState = !filters.state || spa.location?.state === filters.state;
            const matchesDistrict = !filters.district || spa.location?.district === filters.district;
            const matchesLocality = !filters.locality || spa.location?.locality === filters.locality;
            const matchesSpaType = !filters.spaType || spa.type?.includes(filters.spaType);

            // Enhanced keyword search matching
            const keyword = filters.keyword.toLowerCase().trim();
            const matchesKeyword = !keyword || [
                spa.name,
                spa.location?.country,
                spa.location?.state,
                spa.location?.district,
                spa.location?.locality,
                spa.location?.address,
                spa.location?.pincode
            ].some(field => field?.toLowerCase().includes(keyword));

            // console.log('Checking spa:', {
            //     spa: {
            //         name: spa.name,
            //         location: spa.location,
            //         searchFields: [
            //             spa.name,
            //             spa.location?.country,
            //             spa.location?.state,
            //             spa.location?.district,
            //             spa.location?.locality,
            //             spa.location?.address,
            //             spa.location?.pincode
            //         ]
            //     },
            //     keyword,
            //     matchesKeyword
            // });

            return matchesCountry && matchesState && matchesDistrict && matchesLocality && matchesSpaType && matchesKeyword;
        });

        setFilteredSpas(filteredResults);
        setFilteredSpasCount(filteredResults.length);

        // Update available filters from nested location data
        const countries = [...new Set(locations.map(loc => loc.location?.country).filter(Boolean))];

        let states = [];
        if (filters.country) {
            states = [...new Set(locations
                .filter(loc => loc.location?.country === filters.country)
                .map(loc => loc.location?.state)
                .filter(Boolean))];
        }

        let districts = [];
        if (filters.state) {
            districts = [...new Set(locations
                .filter((loc) =>
                    loc.location?.country === filters.country &&
                    loc.location?.state === filters.state)
                .map((loc) => loc.location?.district)
                .filter(Boolean))];
        }

        let localities = [];
        if (filters.district) {
            localities = [...new Set(locations
                .filter((loc) =>
                    loc.location?.country === filters.country &&
                    loc.location?.state === filters.state &&
                    loc.location?.district === filters.district
                )
                .map((loc) => loc.location?.locality)
                .filter(Boolean))];
        }

        setAvailableFilters((prev) => ({
            ...prev,
            countries,
            states,
            districts,
            localities,
        }));
    }, [filters.country, filters.state, filters.district, filters.locality, filters.spaType, filters.keyword, locations]);

    const updateFilter = useCallback((filterName, value) => {
        setFilters((prev) => {
            const newFilters = {
                ...prev,
                [filterName]: value,
            };

            if (filterName === 'country') {
                newFilters.state = '';
                newFilters.district = '';
                newFilters.locality = '';
            } else if (filterName === 'state') {
                newFilters.district = '';
                newFilters.locality = '';
            } else if (filterName === 'district') {
                newFilters.locality = '';
            }

            return newFilters;
        });
    }, []);

    const resetFilters = useCallback(() => {
        setFilters({
            keyword: '',
            country: '',
            state: '',
            district: '',
            locality: '',
            spaType: '',
            priceRange: '',
            category: '',
            duration: '',
        });
    }, []);

    return (
        <FilterContext.Provider
            value={{
                filters,
                availableFilters,
                updateFilter,
                resetFilters,
                loading,
                error,
                filteredSpasCount,
                filteredSpas // Add this to expose filtered results
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};