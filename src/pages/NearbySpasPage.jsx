import React, { useContext, useEffect, useState } from 'react';
import { LocationContext } from '../context/LocationContext';
import { getSpas } from '../api/api.js';
import { getSpasWithinRadius } from '../data/dummyData';
import SpaList from '../components/spa/SpaList';
import LocationDetector from '../components/location/LocationDetector';

const NearbySpasPage = () => {
    const { userLocation } = useContext(LocationContext);
    const [nearbySpas, setNearbySpas] = useState([]);
    const [radius, setRadius] = useState(10);
    const [sortBy, setSortBy] = useState('distance');

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchSpas();
    }, [userLocation, radius]);

    const fetchSpas = async () => {
        try {
            const response = await getSpas();
            if (userLocation) {
                const nearby = getSpasWithinRadius(response, userLocation, radius);
                const sorted = sortSpas(nearby, sortBy);
                setNearbySpas(sorted);
            }
        } catch (error) {
            console.error("Error fetching spas:", error);
        }
    };

    const sortSpas = (spas, criteria) => {
        return [...spas].sort((a, b) => {
            if (criteria === 'rating') return b.rating - a.rating;
            if (criteria === 'distance') return a.distance - b.distance;
            return 0;
        });
    };

    const handleSort = (newSortBy) => {
        setSortBy(newSortBy);
        setNearbySpas(sortSpas(nearbySpas, newSortBy));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Nearby Spas</h1>
            
            <div className="mb-8">
                <LocationDetector />
            </div>

            <div className="flex gap-4 mb-6">
                <select 
                    value={radius} 
                    onChange={(e) => setRadius(Number(e.target.value))}
                    className="p-2 border rounded-md"
                >
                    <option value={5}>Within 5km</option>
                    <option value={10}>Within 10km</option>
                    <option value={20}>Within 20km</option>
                    <option value={50}>Within 50km</option>
                </select>

                <select 
                    value={sortBy} 
                    onChange={(e) => handleSort(e.target.value)}
                    className="p-2 border rounded-md"
                >
                    <option value="distance">Sort by Distance</option>
                    <option value="rating">Sort by Rating</option>
                </select>
            </div>

            {userLocation ? (
                nearbySpas.length > 0 ? (
                    <SpaList spas={nearbySpas} />
                ) : (
                    <p className="text-gray-600 text-center py-10">
                        No spas found within {radius}km of your location.
                    </p>
                )
            ) : (
                <p className="text-gray-600 text-center py-10">
                    Enable location to see spas near you.
                </p>
            )}
        </div>
    );
};

export default NearbySpasPage;
