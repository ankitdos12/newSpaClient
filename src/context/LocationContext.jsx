import React, { createContext, useState, useEffect, useCallback } from 'react';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [userLocation, setUserLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Detect user's location
    const detectLocation = useCallback(() => {
        if (!navigator.geolocation) {
            setLocationError('Geolocation is not supported by your browser');
            return;
        }

        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setIsLoading(false);
            },
            (error) => {
                setLocationError(error.message);
                setIsLoading(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            }
        );
    }, []);

    useEffect(() => {
        detectLocation();
    }, [detectLocation]);

    return (
        <LocationContext.Provider
            value={{
                userLocation,
                locationError,
                isLoading,
                detectLocation,
            }}
        >
            {children}
        </LocationContext.Provider>
    );
};