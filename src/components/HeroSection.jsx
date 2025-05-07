import React, { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const images = [
    "https://res.cloudinary.com/djdrpfhdz/image/upload/v1746182128/2_bhspwj.png",
    "https://res.cloudinary.com/djdrpfhdz/image/upload/v1746181738/4_z2sn1n.png",
    "https://res.cloudinary.com/djdrpfhdz/image/upload/v1746181737/3_nomg94.png",
    "https://res.cloudinary.com/djdrpfhdz/image/upload/v1746182127/1_oloovk.png"
];

const HeroSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        const interval = setInterval(goToNext, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[200px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
            {/* Image Container */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Slide ${index + 1}`}
                        className={`absolute w-full h-full object-contain transition-all duration-700 ${index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
                            }`}
                    />
                ))}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-white w-4" : "bg-white/50"
                            }`}
                    />
                ))}
            </div>

            {/* Control Buttons */}
            <button
                onClick={goToPrev}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 text-black p-2 rounded-full hover:bg-white transition-all"
                aria-label="Previous slide"
            >
                <AiOutlineLeft size={24} />
            </button>
            <button
                onClick={goToNext}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 text-black p-2 rounded-full hover:bg-white transition-all"
                aria-label="Next slide"
            >
                <AiOutlineRight size={24} />
            </button>
        </div>
    );
};

export default HeroSection;
