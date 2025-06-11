import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../api/api';

const UserProfile = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        role: '',
        membership: null
    });
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);

        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchUserProfile = async () => {
            try {
                const response = await getUserProfile(token);
                console.log("response from user Profile: ", response);

                if (response.status === "success") {
                    setUserData({
                        username: response.data.user.username,
                        email: response.data.user.email,
                        phoneNumber: response.data.user.phoneNumber,
                        role: response.data.user.role,
                        membership: response.data.user.membership || null
                    });

                    setBookings(response.data.bookings || []);
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
                setError("Error fetching user profile");
            } finally {
                setIsLoading(false);
            }
        }
        fetchUserProfile();
    }, [navigate]);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedData({ ...userData });
    };

    const handleSave = async () => {
        try {
            // TODO: Implement API call to update profile
            setUserData(editedData);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedData({});
    };

    const handleInputChange = (e) => {
        setEditedData({
            ...editedData,
            [e.target.name]: e.target.value
        });
    };

    const handleCancelBooking = async (bookingId) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            try {
                // TODO: Implement API call to cancel booking
                setBookings(bookings.filter(booking => booking._id !== bookingId));
            } catch (error) {
                console.error("Error canceling booking:", error);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 pt-24 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 pt-24 flex items-center justify-center">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 pt-24 pb-8 px-4">
            <div className="max-w-[85rem] mx-auto">
                {/* Profile Information Card */}
                <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-8">
                    <div className="bg-blue-600 h-48 flex items-center justify-center">
                        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                            <img src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png" className='object-contain' />
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-3xl font-bold">Profile Information</h1>
                            {!isEditing ? (
                                <button
                                    onClick={handleEdit}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                >
                                    Edit Profile
                                </button>
                            ) : (
                                <div className="space-x-2">
                                    <button
                                        onClick={handleSave}
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Object.entries({
                                'Full Name': 'username',
                                'Email': 'email',
                                'Phone': 'phoneNumber',
                                'Role': 'role'
                            }).map(([label, key]) => (
                                <div key={key} className="border-b pb-4">
                                    <label className="text-sm text-gray-600">{label}</label>
                                    {isEditing && key !== 'role' ? (
                                        <input
                                            type="text"
                                            name={key}
                                            value={editedData[key] || ''}
                                            onChange={handleInputChange}
                                            className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <p className="text-lg font-semibold capitalize">{userData[key]}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Membership Card */}
                {userData.membership ? (
                    <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-8">
                        <div className="p-8">
                            <h2 className="text-2xl font-bold mb-6">Membership Details</h2>
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">{userData.membership.plan} Plan</h3>
                                        <p className="text-blue-100">Member since: {new Date(userData.membership.startDate).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-blue-100">Valid until</p>
                                        <p className="text-lg font-semibold">{new Date(userData.membership.endDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="border-t border-blue-400 pt-4 mt-4">
                                    <h4 className="text-lg font-semibold mb-2">Benefits:</h4>
                                    <ul className="list-disc list-inside text-blue-100">
                                        {userData.membership.benefits.map((benefit, index) => (
                                            <li key={index}>{benefit}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-4 text-sm text-blue-100">
                                    Membership ID: {userData.membership.id}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-8">
                        <div className="p-8">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold mb-4">No Active Membership</h2>
                                <p className="text-gray-600 mb-6">Upgrade to a membership plan to enjoy exclusive benefits and special offers!</p>
                                <button
                                    onClick={() => navigate('/membership')}
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                                >
                                    View Membership Plans
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Bookings Section */}
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="p-8">
                        <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spa Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Special Request</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {bookings.map((booking) => (
                                        <tr key={booking._id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4 whitespace-nowrap">{booking.spa.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{booking.serviceTital}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {new Date(booking.date).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{booking.time}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{booking.special_request}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${booking.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
