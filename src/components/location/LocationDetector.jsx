import React, { useContext } from 'react';
import { LocationContext } from '../../context/LocationContext';
import LocationDisplay from './LocationDisplay';
import { Link } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";

const LocationDetector = () => {
    const { userLocation, locationError, isLoading, detectLocation } = useContext(LocationContext);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <div className="flex lg:flex-row lg:justify-between flex-col gap-4 mb-6">
                <h2 className="text-2xl font-bold text-center">
                    Find Spas Near You
                </h2>
                <div className="flex justify-center">
                    <Link
                        to="/spas"
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg transition-all"
                    >
                        <span>Search Spa Near You</span>
                        <IoSearch size={20} />
                    </Link>
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center py-6">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                    <span className="mt-4 text-gray-600 text-lg text-center">Detecting your location...</span>
                </div>
            ) : (
                <>
                    {locationError ? (
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="bg-red-100 text-red-700 p-4 rounded-lg w-full">
                                {locationError}
                            </div>
                            <button
                                onClick={detectLocation}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : userLocation ? (
                        <LocationDisplay location={userLocation} />
                    ) : (
                        <div className="flex flex-col items-center text-center gap-4">
                            <p className="text-gray-600 text-lg">
                                Allow location access to find spas near you.
                            </p>
                            <button
                                onClick={detectLocation}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all"
                            >
                                Enable Location
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default LocationDetector;
