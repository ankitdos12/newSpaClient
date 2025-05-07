import React, { useState, useEffect } from 'react';

const LocationDisplay = ({ location }) => {
    const [address, setAddress] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lng}&format=json`
                );

                if (!response.ok) throw new Error('Failed to fetch address');

                const data = await response.json();
                setAddress(data.address);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchAddress();
    }, [location]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Locating your address...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-600">
                Error fetching location: {error}
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-start mb-4">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                </div>
                <div>
                    <p className="font-medium">Your current location:</p>
                    <p className="text-gray-600">
                        {address.road || address.suburb || ''},
                        <span> {address.city || address.town || address.village || ''}</span>
                    </p>
                    <p className="text-gray-600">
                        {address.state}, {address.country}
                    </p>
                </div>
            </div>

            <div className="flex items-center text-sm text-gray-600">
                <span>Coordinates: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}</span>
            </div>
        </div>
    );
};

export default LocationDisplay;