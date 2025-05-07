import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SpaImageGallery from '../components/spa/SpaImageGallery';
import SpaMap from '../components/spa/SpaMap';
import ReviewForm from '../components/reviews/ReviewForm';
import ReviewList from '../components/reviews/ReviewList.jsx';
import Rating from '../components/common/Rating';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import ServicesPage from "../pages/ServicesPage.jsx";
import { getSpaById } from '../api/api.js';

const SpaDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [spa, setSpa] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('info');
    const [services, setServices] = useState([]);

    const spaType = ["Day Spa",
        " Massage Center",
        "Spa Center"];

    useEffect(() => {
        const scrollToTop = () => {
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 10);
        };
        scrollToTop();
    }, [id]);

    useEffect(() => {
        let isMounted = true;

        const fetchSpaDetails = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const response = await getSpaById(id);

                if (!isMounted) return;

                if (!response) {
                    throw new Error('Spa not found');
                }

                setServices(response.services || []);
                setSpa(response);
                setReviews([]);
            } catch (error) {
                if (!isMounted) return;
                console.error("Error fetching spa:", error);
                setError(error.message || 'Failed to fetch spa details');
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchSpaDetails();

        return () => {
            isMounted = false;
        };
    }, [id]);

    const handleAddReview = async (newReview) => {
        if (!newReview.rating || !newReview.comment) {
            throw new Error('Please provide both rating and comment');
        }

        const review = {
            id: `new-${Date.now()}`,
            spaId: spa.id,
            userId: 'current-user',
            userName: 'Current User',
            ...newReview,
            date: new Date().toISOString()
        };

        setReviews(prevReviews => [review, ...prevReviews]);
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12 flex justify-center h-screen items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="bg-red-100 text-red-700 p-4 rounded">
                    {error}
                </div>
            </div>
        );
    }

    if (!spa) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="bg-red-100 text-red-700 p-4 rounded">
                    Spa not found.
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 mt-10 lg:mt-5">
                {/* Breadcrumb */}
                <div className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
                    <span>Spas</span>
                    <span className="mx-2">/</span>
                    <span>{spa.location.country}</span>
                    <span className="mx-2">/</span>
                    <span>{spa.location.state}</span>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 font-medium">{spa.name}</span>
                </div>

                {/* Header section */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">{spa.name}</h1>
                    <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center text-gray-600 mb-4 gap-2 sm:gap-4">
                        <div className="mb-2 sm:mb-0 sm:mr-6">
                            <div className="text-sm">{spa.location.address}</div>
                            <div className="text-sm">{spa.location.locality}, {spa.location.district}</div>
                            <div className="text-sm">{spa.location.state}, {spa.location.country}</div>
                        </div>

                        <div className="flex items-center mb-2 sm:mb-0 sm:mr-6">
                            <div className="mr-2">
                                <Rating value={spa.rating} />
                            </div>
                            <span className="text-sm">({spa.reviewCount} reviews)</span>
                        </div>

                        <div className="flex flex-wrap gap-1">
                            {Array.isArray(spaType) &&
                                spaType.map((type, index) => (
                                    <div
                                        key={index}
                                        className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium"
                                    >
                                        {type}
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* Contact and Subscription Buttons */}
                    <div className="flex flex-wrap gap-2 sm:gap-4">
                        <Link
                            to={`https://wa.me/${spa.contacts.number}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm sm:text-base"
                        >
                            <FaWhatsapp className="text-lg sm:text-xl" />
                            <span>WhatsApp</span>
                        </Link>

                        <Link
                            to={`tel:${spa?.contacts?.number || ''}`}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
                        >
                            <FaPhoneAlt className="text-lg sm:text-xl" />
                            <span>Call Now</span>
                        </Link>

                        <button
                            onClick={() => navigate('/book-an-appointment')}
                            className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm sm:text-base"
                        >
                            Book An Appointment
                        </button>
                    </div>
                </div>

                {/* Image gallery */}
                <div className="mb-8 ">
                    <SpaImageGallery images={spa.images} />
                </div>

                {/* Services */}
                <ServicesPage services={services} spaId={id} />

                {/* Tab navigation */}
                <div className="border-b mb-4 sm:mb-6 overflow-x-auto">
                    <nav className="flex whitespace-nowrap">
                        <button
                            className={`mr-6 py-4 font-medium ${activeTab === 'info'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                            onClick={() => setActiveTab('info')}
                        >
                            Information
                        </button>

                        <button
                            className={`mr-6 py-4 font-medium ${activeTab === 'map'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                            onClick={() => setActiveTab('map')}
                        >
                            Location
                        </button>

                        <button
                            className={`mr-6 py-4 font-medium ${activeTab === 'membership'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                            onClick={() => setActiveTab('membership')}
                        >
                            Membership
                        </button>

                        <button
                            className={`mr-6 py-4 font-medium ${activeTab === 'reviews'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                            onClick={() => setActiveTab('reviews')}
                        >
                            Reviews ({spa.reviewCount})
                        </button>
                    </nav>
                </div>

                {/* Tab content */}
                <div className="mb-8 sm:mb-12">
                    {activeTab === 'info' && (
                        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
                                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                                    <h2 className="text-2xl font-semibold mb-4 text-blue-600">{spa.name}</h2>
                                    <p className="text-gray-700 leading-relaxed">
                                        {spa.name} is a premier {spa.type} spa located in the heart of {spa.locality},
                                        offering a range of rejuvenating treatments designed to promote wellness and relaxation.
                                        Our experienced therapists provide personalized care in a serene environment.
                                    </p>

                                    <h3 className="text-xl font-semibold mt-8 mb-4 text-blue-600">Mode Of Payments</h3>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
                                        <li className="flex items-center p-2 bg-white rounded-md shadow-sm">
                                            <span className="mr-3 text-xl">💳</span> Credit/Debit Cards
                                        </li>
                                        <li className="flex items-center p-2 bg-white rounded-md shadow-sm">
                                            <span className="mr-3 text-xl">🅿️</span> PayPal
                                        </li>
                                        <li className="flex items-center p-2 bg-white rounded-md shadow-sm">
                                            <span className="mr-3 text-xl">📱</span> Mobile Wallets
                                        </li>
                                        <li className="flex items-center p-2 bg-white rounded-md shadow-sm">
                                            <span className="mr-3 text-xl">🏦</span> Bank Transfer
                                        </li>
                                        <li className="flex items-center p-2 bg-white rounded-md shadow-sm">
                                            <span className="mr-3 text-xl">💵</span> Cash
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                                    <h2 className="text-2xl font-semibold mb-6 text-blue-600">Hours & Details</h2>
                                    <div className="space-y-6">
                                        <div className="bg-white p-4 rounded-lg shadow-sm">
                                            <h3 className="font-semibold text-lg mb-2 text-gray-800">Opening Hours</h3>
                                            <div className="space-y-2 text-gray-600">
                                                <div className="flex justify-between">
                                                    <span>{spa.openingHours.days}</span>
                                                    <span>{spa.openingHours.time}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Monday - Friday</span>
                                                    <span>9:00 AM - 8:00 PM</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white p-4 rounded-lg shadow-sm">
                                            <h3 className="font-semibold text-lg mb-2 text-gray-800">Contact Details</h3>
                                            <div className="space-y-3">
                                                <div className="flex items-center text-gray-600">
                                                    <FaPhoneAlt className="mr-3" />
                                                    <span>+91 {spa.contacts.number}</span>
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <span className="mr-3">📧</span>
                                                    <span>{spa.contacts.email}</span>
                                                </div>
                                                <div className="flex items-center text-blue-600 hover:text-blue-700">
                                                    <span className="mr-3">🌐</span>
                                                    <Link to={spa.contacts.website} className="hover:underline">
                                                        www.{spa.name.toLowerCase().replace(/\s+/g, '')}.com
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'map' && (
                        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                            <h2 className="text-2xl font-semibold mb-6 text-blue-600">Location</h2>
                            <div className="rounded-lg overflow-hidden shadow-lg">
                                <SpaMap spa={spa} />
                            </div>
                        </div>
                    )}

                    {activeTab === 'membership' && (
                        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                            <h2 className="text-2xl font-semibold mb-6 text-blue-600">Membership Plans</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Basic Plan */}
                                <div className="bg-gray-50 rounded-lg p-6 hover:shadow-xl transition-shadow">
                                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Basic</h3>
                                    <p className="text-3xl font-bold mb-4 text-blue-600">₹999<span className="text-sm text-gray-600">/month</span></p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-center">
                                            <span className="mr-2">✓</span>
                                            2 massage sessions
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">✓</span>
                                            Basic amenities access
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">✓</span>
                                            10% off on additional services
                                        </li>
                                    </ul>
                                    <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                        Subscribe Now
                                    </button>
                                </div>

                                {/* Premium Plan */}
                                <div className="bg-blue-50 rounded-lg p-6 hover:shadow-xl transition-shadow border-2 border-blue-600">
                                    <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm inline-block mb-4">Most Popular</div>
                                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Premium</h3>
                                    <p className="text-3xl font-bold mb-4 text-blue-600">₹1999<span className="text-sm text-gray-600">/month</span></p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-center">
                                            <span className="mr-2">✓</span>
                                            5 massage sessions
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">✓</span>
                                            Full amenities access
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">✓</span>
                                            20% off on additional services
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">✓</span>
                                            Priority booking
                                        </li>
                                    </ul>
                                    <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                        Subscribe Now
                                    </button>
                                </div>

                                {/* Luxury Plan */}
                                <div className="bg-gray-50 rounded-lg p-6 hover:shadow-xl transition-shadow">
                                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Luxury</h3>
                                    <p className="text-3xl font-bold mb-4 text-blue-600">₹3999<span className="text-sm text-gray-600">/month</span></p>
                                    <ul className="space-y-3 mb-6">
                                        <li className="flex items-center">
                                            <span className="mr-2">✓</span>
                                            Unlimited massage sessions
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">✓</span>
                                            VIP amenities access
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">✓</span>
                                            30% off on additional services
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">✓</span>
                                            24/7 priority booking
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">✓</span>
                                            Complimentary refreshments
                                        </li>
                                    </ul>
                                    <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                        Subscribe Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                            <h2 className="text-2xl font-semibold mb-6 text-blue-600">Reviews & Ratings</h2>

                            <div className="bg-gray-50 rounded-lg p-6 mb-8">
                                <h3 className="text-xl font-medium mb-4 text-gray-800">Write a Review</h3>
                                <ReviewForm onSubmit={handleAddReview} />
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-xl font-medium mb-4 text-gray-800">
                                    All Reviews ({spa.reviewCount})
                                </h3>
                                <ReviewList reviews={reviews} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SpaDetailPage;