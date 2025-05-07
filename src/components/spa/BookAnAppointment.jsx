import React, { useEffect, useState } from 'react';
import { Calendar, Clock, User, MessageCircle } from 'lucide-react';


const BookAnAppointment = () => {
    const [selectedService, setSelectedService] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [specialRequests, setSpecialRequests] = useState('');

    const services = [
        { name: 'Swedish Massage', duration: '60 min', price: 80 },
        { name: 'Deep Tissue Massage', duration: '90 min', price: 110 },
        { name: 'Aromatherapy Facial', duration: '45 min', price: 65 },
        { name: 'Hot Stone Therapy', duration: '75 min', price: 95 },
        { name: 'Couples Massage', duration: '60 min', price: 160 }
    ];

    const availableTimes = [
        '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
    ];

    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo(0, 0);
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the booking data to a backend service
        alert('Booking Submitted! We will contact you to confirm your appointment.');
    };
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
                <div className="p-6 bg-blue-600 text-white">
                    <h1 className="text-3xl font-bold text-center">Serenity Spa Booking</h1>
                    <p className="text-center mt-2 text-blue-100">Relax. Refresh. Rejuvenate.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {/* Services Selection */}
                    <div>
                        <label className="text-lg font-semibold mb-4 flex items-center">
                            Select Service
                        </label>
                        <div className="grid md:grid-cols-3 gap-4">
                            {services.map((service) => (
                                <div
                                    key={service.name}
                                    onClick={() => setSelectedService(service.name)}
                                    className={`p-4 border rounded-lg cursor-pointer transition-all 
                      ${selectedService === service.name
                                            ? 'bg-blue-100 border-blue-500'
                                            : 'hover:bg-gray-50'}`}
                                >
                                    <h3 className="font-semibold">{service.name}</h3>
                                    <p className="text-sm text-gray-600">{service.duration} | ₹{service.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Date and Time Selection */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-lg font-semibold mb-4 flex items-center">
                                <Calendar className="mr-2 text-blue-600" />
                                Select Date
                            </label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-lg font-semibold mb-4 flex items-center">
                                <Clock className="mr-2 text-blue-600" />
                                Select Time
                            </label>
                            <select
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Choose a Time</option>
                                {availableTimes.map((time) => (
                                    <option key={time} value={time}>{time}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-lg font-semibold mb-2 flex items-center">
                                <User className="mr-2 text-blue-600" />
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Your Full Name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Phone and Special Requests */}
                    <div>
                        <label className="block text-lg font-semibold mb-2">Phone Number</label>
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="+91 9125678 910"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold mb-2 flex items-center">
                            <MessageCircle className="mr-2 text-blue-600" />
                            Special Requests
                        </label>
                        <textarea
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Any additional notes or special requirements?"
                            rows={4}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center pt-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
                        >
                            Book Appointment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BookAnAppointment
