import { getSpasWithinRadius, getPopularSpas, getRecentSpas } from '../data/dummyData';
import { useContext, useEffect, useState } from 'react';
import { LocationContext } from '../context/LocationContext';
import { getSpas } from '../api/api.js';
import { Link } from 'react-router-dom';
import LocationDetector from '../components/location/LocationDetector';
import HeroSection from '../components/HeroSection.jsx';
import SpaList from '../components/spa/SpaList.jsx';
import InquiryForm from '../components/forms/InquiryForm';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

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
                {/* Trust Section */}
                <div className="mb-16 py-12 bg-gray-50 rounded-2xl px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-4">India's Most Trusted Spa Directory</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Connecting wellness seekers with premium spa experiences since 2018.
                            Trusted by thousands of users and spa businesses across India.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-2">180+</div>
                            <div className="text-gray-600">Verified Spas</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
                            <div className="text-gray-600">Happy Customers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-2">75+</div>
                            <div className="text-gray-600">Cities Covered</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-2">4.8★</div>
                            <div className="text-gray-600">User Rating</div>
                        </div>
                    </div>
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

                {/* Feature Banners */}
                <div className="mb-16 grid gap-8 md:grid-cols-2">
                    {/* Large Feature Banner */}
                    <div className="relative h-96 rounded-2xl overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                            alt="Luxury Spa Experience"
                            className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                            <h3 className="text-2xl font-bold text-white mb-2">Premium Spa Experiences</h3>
                            <p className="text-white/90">Discover handpicked luxury spas offering exceptional services</p>
                        </div>
                    </div>

                    {/* Split Banners */}
                    <div className="grid gap-8">
                        <div className="relative h-44 rounded-2xl overflow-hidden group">
                            <img
                                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                                alt="Special Offers"
                                className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                                <h3 className="text-xl font-bold text-white mb-1">Exclusive Deals</h3>
                                <p className="text-white/90 text-sm">Special offers and packages just for you</p>
                            </div>
                        </div>

                        <div className="relative h-44 rounded-2xl overflow-hidden group">
                            <img
                                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                                alt="Instant Booking"
                                className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                                <h3 className="text-xl font-bold text-white mb-1">Instant Booking</h3>
                                <p className="text-white/90 text-sm">Reserve your spa session in just a few clicks</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Testimonials Section */}
                <div className="mb-16 py-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
                        <p className="text-gray-600">Real experiences from our satisfied customers</p>
                    </div>

                    <div className="px-4">
                        <Slider {...sliderSettings}>
                            {[
                                {
                                    name: "Raj Malhotra",
                                    role: "Business Traveler",
                                    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
                                    text: "As someone who travels frequently, this platform helps me find quality spas wherever I go. Highly recommended!",
                                    rating: 5
                                },

                                {
                                    name: "Ravi Kumar",
                                    role: "Frequent Visitor",
                                    image: "https://images.unsplash.com/photo-1586072485394-4b7f3e4f3e4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
                                    text: "I love how easy it is to book my spa appointments through this site. The customer service is excellent!",
                                    rating: 5
                                },
                                {
                                    name: "Karan Singh",
                                    role: "Wellness Blogger",
                                    image: "https://images.unsplash.com/photo-1584697964210-9a3f3e4f3e4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
                                    text: "As a blogger, I appreciate the attention to detail and quality of service. This platform truly cares about its users.",
                                    rating: 5
                                }
                            ].map((testimonial, index) => (
                                <div key={index} className="px-4">
                                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-center mb-4">
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                className="w-12 h-12 rounded-full object-cover mr-4"
                                            />
                                            <div>
                                                <h4 className="font-semibold">{testimonial.name}</h4>
                                                <p className="text-sm text-gray-600">{testimonial.role}</p>
                                            </div>
                                        </div>
                                        <div className="mb-3 text-yellow-400">
                                            {'★'.repeat(testimonial.rating)}
                                            <span className="text-gray-300">{'★'.repeat(5 - testimonial.rating)}</span>
                                        </div>
                                        <p className="text-gray-600">{testimonial.text}</p>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>

                {/* Wellness Benefits */}
                <div className="mb-16 py-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Experience Ultimate Wellness</h2>
                        <p className="text-gray-600">Discover the benefits of regular spa treatments</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Stress Relief",
                                description: "Regular spa treatments help reduce stress and anxiety, promoting mental wellness",
                                image: "https://images.unsplash.com/photo-1591343395082-e120087004b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                                icon: "🧘‍♀️"
                            },
                            {
                                title: "Physical Health",
                                description: "Improve circulation, reduce muscle tension and enhance overall physical well-being",
                                image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                                icon: "💆‍♀️"
                            },
                            {
                                title: "Beauty & Care",
                                description: "Enhance your natural beauty with our specialized treatments and therapies",
                                image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
                                icon: "✨"
                            }
                        ].map((benefit, index) => (
                            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm group hover:shadow-md transition-shadow">
                                <div className="relative h-48">
                                    <img
                                        src={benefit.image}
                                        alt={benefit.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-sm">
                                        {benefit.icon}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                                    <p className="text-gray-600">{benefit.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trust Indicators */}
                {/* <div className="mb-16 py-8 border-t border-gray-100">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <img
                                src="https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                                alt="Verified Spas"
                                className="w-16 h-16 mx-auto mb-3 rounded-lg object-cover"
                            />
                            <h3 className="font-semibold mb-1">Verified Listings</h3>
                            <p className="text-sm text-gray-600">All spas are personally verified</p>
                        </div>
                        <div className="text-center">
                            <img
                                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                                alt="Best Prices"
                                className="w-16 h-16 mx-auto mb-3 rounded-lg object-cover"
                            />
                            <h3 className="font-semibold mb-1">Best Prices</h3>
                            <p className="text-sm text-gray-600">Guaranteed best rates</p>
                        </div>
                        <div className="text-center">
                            <img
                                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                                alt="Customer Support"
                                className="w-16 h-16 mx-auto mb-3 rounded-lg object-cover"
                            />
                            <h3 className="font-semibold mb-1">24/7 Support</h3>
                            <p className="text-sm text-gray-600">Always here to help you</p>
                        </div>
                        <div className="text-center">
                            <img
                                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                                alt="Secure Booking"
                                className="w-16 h-16 mx-auto mb-3 rounded-lg object-cover"
                            />
                            <h3 className="font-semibold mb-1">Secure Booking</h3>
                            <p className="text-sm text-gray-600">100% secure transactions</p>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default HomePage;