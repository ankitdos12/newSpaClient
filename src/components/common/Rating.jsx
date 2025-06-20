import React from 'react';

const Rating = ({ value, maxValue = 5 }) => {
    // Round to nearest half
    const roundedValue = Math.round(value * 2) / 2;

    return (
        <div className="flex items-center">
            {[...Array(maxValue)].map((_, index) => {
                const starValue = index + 1;

                // Full star
                if (starValue <= roundedValue) {
                    return (
                        <svg
                            key={index}
                            className="w-4 h-4 text-yellow-400 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                    );
                }

                // Half star
                if (starValue <= roundedValue + 0.5) {
                    return (
                        <svg
                            key={index}
                            className="w-4 h-4 text-yellow-400 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
                        </svg>
                    );
                }

                // Empty star
                return (
                    <svg
                        key={index}
                        className="w-4 h-4 text-gray-300 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                );
            })}

            <span className="ml-1 text-sm font-medium">{value.toFixed(1)}</span>
        </div>
    );
};

export default Rating;