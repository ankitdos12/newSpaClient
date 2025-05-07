import React, { useEffect, useState } from 'react';
import { getSpas } from '../api/api.js';
import { getPopularSpas } from '../data/dummyData';
import SpaList from '../components/spa/SpaList';
import LoadingSpinner from '../components/common/LoadingSpinner';

const PopularSpasPage = () => {
    const [popularSpas, setPopularSpas] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchSpas();
    }, []);

    const fetchSpas = async () => {
        try {
            setIsLoading(true);
            const response = await getSpas();
            const popular = getPopularSpas(response, 'rating');
            setPopularSpas(popular);
        } catch (error) {
            console.error("Error fetching spas:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSort = (order) => {
        setSortOrder(order);
        const sorted = [...popularSpas].sort((a, b) => {
            return order === 'desc' ? b.rating - a.rating : a.rating - b.rating;
        });
        setPopularSpas(sorted);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Popular Spas</h1>
            
            <div className="flex justify-end mb-6">
                <select 
                    value={sortOrder} 
                    onChange={(e) => handleSort(e.target.value)}
                    className="p-2 border rounded-md"
                >
                    <option value="desc">Highest Rated First</option>
                    <option value="asc">Lowest Rated First</option>
                </select>
            </div>

            {isLoading ? (
                <LoadingSpinner />
            ) : popularSpas.length > 0 ? (
                <SpaList spas={popularSpas} />
            ) : (
                <p className="text-gray-600 text-center py-10">No spas available.</p>
            )}
        </div>
    );
};

export default PopularSpasPage;
