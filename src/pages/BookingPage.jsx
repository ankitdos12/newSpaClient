import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Clock, Calendar, IndianRupee, MessageCircle, User, Mail, Phone } from 'lucide-react';
import { addBooking } from '../api/api';
import Celebration from '../components/Celebration';
import '../components/Celebration.css';

const BookingPage = () => {
    const [loading, setLoading] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const service = location.state?.service;
    const spaId = location.state?.spaId;

    // Redirect if no service or spaId
    useEffect(() => {
        if (!service || !spaId) {
            navigate('/');
            return;
        }
    }, [service, spaId, navigate]);

    const [formData, setFormData] = useState(() => {
        try {
            const userData = JSON.parse(localStorage.getItem('userData')) || {};
            const user = userData?.user || {};
            
            return {
                name: user.username || '',
                email: user.email || '',
                phone: user.phoneNumber || '',
                date: '',
                time: '',
                notes: '',
                spa: spaId || '',
                serviceTital: service?.title || '',
                userId: user._id || '',
            };
        } catch (error) {
            return {
                name: '',
                email: '',
                phone: '',
                date: '',
                time: '',
                notes: '',
                spa: spaId || '',
                serviceTital: service?.title || '',
                userId: '',
            };
        }
    });

    const [selectedDuration, setSelectedDuration] = useState('');

    // Set initial duration when service changes
    useEffect(() => {
        if (service?.duration?.length > 0) {
            setSelectedDuration(service.duration[0]);
        }
    }, [service]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const timeSlots = [
        '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
        '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'duration') {
            setSelectedDuration(value);
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        if (!token) {
            navigate('/login', { state: { from: location.pathname, service, spaId } });
            return;
        }

        const payload = {
            spa: formData.spa,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            special_request: formData.notes,
            date: formData.date,
            time: formData.time,
            serviceTital: formData.serviceTital,
            userId: formData.userId,
        };

        try {
            setLoading(true);
            const response = await addBooking(payload, token);
            if (response.status === 201 || response) {
                setShowCelebration(true);
                setTimeout(() => {
                    setShowCelebration(false);
                    navigate('/');
                }, 3000);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error submitting booking:', error);
            alert(error.response?.data?.message || 'Something went wrong while booking.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            {showCelebration && (
                <>
                    <Celebration />
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1001]">
                        <div className="bg-white p-8 rounded-lg text-center">
                            <h2 className="text-3xl font-bold text-green-600 mb-4">
                                Congratulations! 🎉
                            </h2>
                            <p className="text-xl">Your booking has been confirmed!</p>
                        </div>
                    </div>
                </>
            )}
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-12">Book Your Service</h1>
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                    {/* Service Details Panel */}
                    <div className="md:col-span-1 space-y-6">
                        {service ? (
                            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                                <div className="h-48 relative">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                </div>
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                                    <div className="space-y-3">
                                        {service.duration && (
                                            <div>
                                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                                    <Clock className="w-4 h-4 inline mr-2" />
                                                    Select Duration
                                                </label>
                                                <select
                                                    name="duration"
                                                    required
                                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                                    value={selectedDuration}
                                                    onChange={handleChange}
                                                >
                                                    {service.duration.map((dur) => {
                                                        const cleanedDur = dur.replace(/[\[\]"]+/g, '').trim();
                                                        return (
                                                            <option key={cleanedDur} value={cleanedDur}>
                                                                {cleanedDur}
                                                            </option>
                                                        );
                                                    })}

                                                </select>
                                            </div>
                                        )}
                                        <div className="flex items-center text-gray-600">
                                            <IndianRupee className="w-5 h-5 mr-3" />
                                            <span className="text-xl font-semibold text-blue-600">{service.price}</span>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <h3 className="font-semibold mb-2">Service Includes:</h3>
                                        <ul className="space-y-2">
                                            {service.details?.map((detail, index) => {
                                                const cleanedDetail = detail.replace(/[\[\]"]+/g, '').trim();
                                                return (
                                                    <li key={index} className="flex items-start">
                                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 mt-2"></span>
                                                        <span className="text-gray-600">{cleanedDetail}</span>
                                                    </li>
                                                );
                                            })}

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-4">Select a Service</h2>
                                <p>Please go back and choose a service to continue booking.</p>
                            </div>
                        )}
                    </div>

                    {/* Booking Form */}
                    <div className="md:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold">Personal Details</h3>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-medium mb-2">
                                            <User className="w-4 h-4 inline mr-2" />
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            placeholder="Your full name"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-medium mb-2">
                                            <Mail className="w-4 h-4 inline mr-2" />
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            placeholder="test@gmail.com"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-medium mb-2">
                                            <Phone className="w-4 h-4 inline mr-2" />
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            placeholder="+91 1234567890"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-medium mb-2">
                                            Service Title
                                        </label>
                                        <input
                                            type="text"
                                            name="serviceTital"
                                            required
                                            placeholder="+91 1234567890"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                            value={formData.serviceTital}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold">Appointment Details</h3>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-medium mb-2">
                                            <Calendar className="w-4 h-4 inline mr-2" />
                                            Preferred Date
                                        </label>
                                        <input
                                            type="date"
                                            name="date"
                                            required
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                            value={formData.date}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-medium mb-2">
                                            <Clock className="w-4 h-4 inline mr-2" />
                                            Preferred Time
                                        </label>
                                        <select
                                            name="time"
                                            required
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                            value={formData.time}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select a time</option>
                                            {timeSlots.map((slot) => (
                                                <option key={slot} value={slot}>{slot}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-medium mb-2">
                                            <MessageCircle className="w-4 h-4 inline mr-2" />
                                            Special Request
                                        </label>
                                        <textarea
                                            name="notes"
                                            rows="4"
                                            placeholder="Any special requests or notes"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                            value={formData.notes}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Booking Summary */}
                            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                                <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>
                                <div className="grid md:grid-cols-2 gap-4 text-gray-600">
                                    <div>Service: {service?.title}</div>
                                    <div>Duration: {selectedDuration}</div>
                                    <div>Price: ₹{service?.price}</div>
                                    <div>Date: {formData.date || 'Not selected'}</div>
                                    <div>Time: {formData.time || 'Not selected'}</div>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-8">
                                <button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="flex-1 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    {loading ? "Booking..." : "Confirm Booking"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
