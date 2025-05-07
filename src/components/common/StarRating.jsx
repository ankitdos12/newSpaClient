import React, { useState } from 'react';

const StarRating = ({ value, onChange, maxValue = 5 }) => {
    const [hoverValue, setHoverValue] = useState(0);

    return (
        <div className="flex">
            {[...Array(maxValue)].map((_, index) => {
                const starValue = index + 1;

                return (
                    <div
                        key={index}
                        className="p-1 cursor-pointer"
                        onClick={() => onChange(starValue)}
                        onMouseEnter={() => setHoverValue(starValue)}
                        onMouseLeave={() => setHoverValue(0)}
                    >
                        <svg
                            className={`w-6 h-6 ${(hoverValue || value) >= starValue
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                                } fill-current transition-colors duration-150`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                    </div>
                );
            })}
        </div>
    );
};

export default StarRating;