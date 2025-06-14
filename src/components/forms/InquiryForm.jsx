import React, { useState } from 'react';
import { createInquiry } from "../../api/api.js";
import { MdErrorOutline } from "react-icons/md";

const InquiryForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await createInquiry(formData);

            console.log(res);
            onClose();
        } catch (error) {
            setError('Provide a valid 10-digit phone number');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Welcome to SpaAdvisor!</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {error && (
                    <div className="mb-4 flex items-center gap-1 p-3 text-red-700">
                        <MdErrorOutline />
                        <p className="flex items-center">
                            {error}
                        </p>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Your Area Name"
                            className="w-full p-2 border rounded"
                            required
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />

                        <input
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full p-2 border rounded"
                            required
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InquiryForm;
