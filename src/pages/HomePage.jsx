import { dummySpaData, getSpasWithinRadius, getPopularSpas, getRecentSpas } from '../data/dummyData';
import LocationDetector from '../components/location/LocationDetector';
import React, { useContext, useEffect, useState } from 'react';
import { LocationContext } from '../context/LocationContext';
import HeroSection from '../components/HeroSection.jsx';
import SpaList from '../components/spa/SpaList.jsx';
import { Link } from 'react-router-dom';
import { getSpas } from '../api/api.js';
import InquiryForm from '../components/forms/InquiryForm';

const HomePage = () => {
    const { userLocation } = useContext(LocationContext);
    const [nearbySpas, setNearbySpas] = useState([]);
    const [popularSpas, setPopularSpas] = useState([]);
    const [recentSpas, setRecentSpas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [whatsAppWidgetError, setWhatsAppWidgetError] = useState(false);
    const [showInquiryForm, setShowInquiryForm] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchSpas = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await getSpas();
                
                if (!response || response.length === 0) {
                    throw new Error('No spa data available');
                }

                if (userLocation) {
                    const nearby = getSpasWithinRadius(response, userLocation, 10);
                    setNearbySpas(nearby.slice(0, 3)); // Limit to 3 items
                }

                const popular = getPopularSpas(response, 'rating').slice(0, 3);
                setPopularSpas(popular);

                const recent = getRecentSpas(response).slice(0, 3);
                setRecentSpas(recent);
            } catch (error) {
                console.error("Error fetching spas: ", error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSpas();
    }, [userLocation]);

    useEffect(() => {
        try {
            const script = document.createElement('script');
            script.src = 'https://embed.direct.me/widget/dt/';
            script.async = true;
            script.onerror = () => setWhatsAppWidgetError(true);
            document.body.appendChild(script);

            return () => {
                if (document.body.contains(script)) {
                    document.body.removeChild(script);
                }
            };
        } catch (error) {
            setWhatsAppWidgetError(true);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowInquiryForm(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const LoadingPlaceholder = () => (
        <div className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-48 bg-gray-200 rounded-lg"></div>
        </div>
    );

    const ErrorMessage = ({ message }) => (
        <div className="text-center py-10">
            <p className="text-red-600">{message}</p>
            <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Retry
            </button>
        </div>
    );

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <div>
            {showInquiryForm && <InquiryForm onClose={() => setShowInquiryForm(false)} />}
            <HeroSection />
            <div className="container mx-auto px-4 py-8 zoom-in-up">

                {/* Location Detector */}
                <div className="mb-10">
                    <LocationDetector />
                </div>

                {/* Nearby Spas */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-semibold">Spas Near You</h2>
                            {userLocation && !isLoading && nearbySpas.length > 0 && (
                                <p className="text-sm text-gray-600">Within 10km of your location</p>
                            )}
                        </div>
                        {nearbySpas.length > 0 && (
                            <Link to="/nearby-spa" className="text-blue-600 hover:text-blue-800">View all</Link>
                        )}
                    </div>
                    {isLoading ? (
                        <LoadingPlaceholder />
                    ) : userLocation ? (
                        nearbySpas.length > 0 ? (
                            <SpaList spas={nearbySpas} />
                        ) : (
                            <p className="text-gray-600 text-center py-10">No spas found near your current location.</p>
                        )
                    ) : (
                        <p className="text-gray-600 text-center py-10">Enable location to see spas near you.</p>
                    )}
                </div>

                {/* Popular Spas */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold">Popular Spas</h2>
                        <Link to="/popular-spas" className="text-blue-600 hover:text-blue-800">View all</Link>
                    </div>
                    {isLoading ? <LoadingPlaceholder /> : <SpaList spas={popularSpas} />}
                </div>

                {/* Recent Spas */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold">Recently Added</h2>
                        <Link to="/recent-spas" className="text-blue-600 hover:text-blue-800">View all</Link>
                    </div>
                    {isLoading ? <LoadingPlaceholder /> : <SpaList spas={recentSpas} />}
                </div>
            </div>
        </div>
    );
};

export default HomePage;