import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../common/Rating';

const SpaCard = ({ spa }) => {

    const mainImage = spa.images && spa.images.length > 0 ? spa.images[0] : 'https://spaadvisor.in/storage/images/653bac32bab49.jpeg';
    const spaType = ["Day Spa",
        " Massage Center",
        "Spa Center"];


    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <Link to={`/spas/${spa._id}`}>
                <div className="relative h-48 overflow-hidden">
                    {spa.discount > 0 && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
                            {spa.discount}% OFF
                        </div>
                    )}
                    <img
                        // src={`/images/dummy-spa-images/${mainImage}`}
                        src={mainImage}
                        alt={spa.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">{spa.name}</h3>
                        <div className="text-right">
                            <div className="text-sm text-gray-500">Starting from</div>
                            <div className="text-lg font-bold text-blue-600">₹{spa.startingPrice}</div>
                        </div>
                    </div>

                    <div className="text-sm text-gray-600 mb-2">
                        <div>{spa.location.address}</div>
                        {/* <div>{spa.location.locality}, {spa.location.district}</div> */}
                        <div>{spa.location.state}, {spa.location.country}</div>
                    </div>

                    <div className="flex items-center mb-2">
                        {Array.isArray(spaType) &&
                            spaType.map((type, index) => (
                                <div
                                    key={index}
                                    className="mr-2 px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium"
                                >
                                    {type}
                                </div>
                            ))}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Rating value={spa.rating} />
                            <span className="ml-1 text-sm text-gray-600">({spa.reviewCount})</span>
                        </div>

                        <div className="text-sm text-blue-600 font-medium">
                            View Details
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default SpaCard;