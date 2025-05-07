import React, { useState, useEffect } from 'react';

const SpaImageGallery = ({ images }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        if (!isFullscreen) {
            const timer = setInterval(() => {
                setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
            }, 3000);
            return () => clearInterval(timer);
        }
    }, [isFullscreen, images.length]);

    // If no images, show a placeholder
    if (!images || images.length === 0) {
        return (
            <div className="h-70 w-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500">No images available</span>
            </div>
        );
    }

    return (
        <div>
            {/* Main large image */}
            <div className="h-[500px] overflow-hidden rounded-lg mb-4 cursor-pointer">
                <div
                    onClick={() => setIsFullscreen(true)}
                    className="relative w-full h-full"
                >
                    <img
                        key={activeIndex}
                        src={images[activeIndex]}
                        alt={`Spa image ${activeIndex + 1}`}
                        className="w-full h-full object-cover animate-slide-in"
                    />
                </div>
            </div>

            {/* Thumbnail strip */}
            <div className="grid grid-flow-col auto-cols-max gap-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`h-20 w-20 overflow-hidden rounded cursor-pointer 
                            transition-all duration-300 hover:scale-105
                            ${activeIndex === index ? 'ring-2 ring-blue-500 scale-105' : 'opacity-70 hover:opacity-100'}`}
                        onClick={() => {
                            setActiveIndex(index);
                        }}
                    >
                        <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-300"
                        />
                    </div>
                ))}
            </div>

            {/* Fullscreen Modal */}
            {isFullscreen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
                    onClick={() => setIsFullscreen(false)}
                >
                    {/* Previous button */}
                    <button
                        className="absolute left-4 p-2 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-75"
                        onClick={(e) => {
                            e.stopPropagation();
                            setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                        }}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <img
                        src={images[activeIndex]}
                        alt={`Spa image ${activeIndex + 1}`}
                        className="max-h-[90vh] max-w-[90vw] object-contain"
                    />

                    {/* Next button */}
                    <button
                        className="absolute right-4 p-2 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-75"
                        onClick={(e) => {
                            e.stopPropagation();
                            setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                        }}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

// Add these styles to your global CSS or style tag
const styles = `
    .animate-slide-in {
        animation: slideFromRight 0.5s ease-out;
    }
    
    @keyframes slideFromRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default SpaImageGallery;