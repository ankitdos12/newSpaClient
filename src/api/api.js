import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Get all spas
export const getSpas = async () => {
    const response = await axios.get(`${API_URL}/spas`);
    return response.data.data;
};
// Get spa by ID
export const getSpaById = async (id) => {
    const response = await axios.get(`${API_URL}/spas/${id}`);
    return response.data.data;
}

// User Signup
export const signup = async (userData) => {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
};

// User Login
export const login = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
};

//spa BookingPage
export const addBooking = async (payload, token) => {
    const response = await axios.post(`${API_URL}/bookings`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

// Get user profile
export const getUserProfile = async (token) => {
    const response = await axios.get(`${API_URL}/auth/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

// inquirySpa 
export const createInquiry = async (inquiryData) => {
    const response = await axios.post(`${API_URL}/inquirySpa`, inquiryData);
    return response.data;
};

