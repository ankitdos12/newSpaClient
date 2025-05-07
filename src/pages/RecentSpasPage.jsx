import React, { useEffect, useState } from 'react';
import { getSpas } from '../api/api.js';
import { getRecentSpas } from '../data/dummyData';
import SpaList from '../components/spa/SpaList';
import LoadingSpinner from '../components/common/LoadingSpinner';

const RecentSpasPage = () => {
    const [recentSpas, setRecentSpas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchSpas();
    }, []);

    const fetchSpas = async () => {
        try {
            setIsLoading(true);
            const response = await getSpas();
            const recent = getRecentSpas(response);
            setRecentSpas(recent);
        } catch (error) {
            console.error("Error fetching spas:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Recently Added Spas</h1>

            {isLoading ? (
                <div className="text-center">
                    <LoadingSpinner />
                    <p className="text-gray-600 mt-4">Loading recent spas...</p>
                </div>
            ) : recentSpas.length > 0 ? (
                <SpaList spas={recentSpas} />
            ) : (
                <p className="text-gray-600 text-center py-10">No spas available.</p>
            )}
        </div>
    );
};

export default RecentSpasPage;
