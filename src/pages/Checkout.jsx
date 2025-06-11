import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [plan] = useState(location.state?.plan);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        upiId: '',
        walletType: ''
    });
    const [loading, setLoading] = useState(false);
    const [cardError, setCardError] = useState('');

    const paymentMethods = [
        { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
        { id: 'upi', name: 'UPI', icon: '📱' },
        { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
        { id: 'wallet', name: 'Digital Wallet', icon: '👝' }
    ];

    const walletOptions = [
        { id: 'paytm', name: 'Paytm' },
        { id: 'phonepe', name: 'PhonePe' },
        { id: 'gpay', name: 'Google Pay' },
        { id: 'amazonpay', name: 'Amazon Pay' }
    ];

    const banks = [
        { id: 'sbi', name: 'State Bank of India' },
        { id: 'hdfc', name: 'HDFC Bank' },
        { id: 'icici', name: 'ICICI Bank' },
        { id: 'axis', name: 'Axis Bank' },
        { id: 'kotak', name: 'Kotak Mahindra Bank' }
    ];

    useEffect(() => {
        if (!plan) {
            navigate('/membership');
        }
        window.scrollTo(0, 0);
    }, [plan, navigate]);

    const validateCard = (number) => {
        const regex = /^[0-9]{16}$/;
        if (!regex.test(number.replace(/\s/g, ''))) {
            return 'Please enter a valid 16-digit card number';
        }
        return '';
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'cardNumber') {
            // Format card number with spaces
            const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
            setFormData(prev => ({ ...prev, cardNumber: formatted }));
            setCardError(validateCard(value));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Validate based on payment method
            if (paymentMethod === 'card' && cardError) {
                throw new Error(cardError);
            }

            // Simulating payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // After successful payment
            navigate('/payment-success', {
                state: {
                    plan,
                    paymentMethod,
                    amount: plan.price,
                    paymentDetails: {
                        method: paymentMethod,
                        ...(paymentMethod === 'wallet' && { wallet: formData.walletType }),
                        ...(paymentMethod === 'netbanking' && { bank: formData.bank })
                    }
                }
            });
        } catch (error) {
            console.error('Payment failed:', error);
            alert(error.message || 'Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!plan) return null;

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen pt-20 bg-gray-50"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Order Summary */}
                    <motion.div 
                        initial={{ x: -20 }}
                        animate={{ x: 0 }}
                        className="md:col-span-1"
                    >
                        <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                            <div className="border-b pb-4 mb-4">
                                <h3 className="text-lg font-semibold">{plan.title} Plan</h3>
                                <p className="text-gray-600">{plan.billingCycle} billing</p>
                                <p className="text-2xl font-bold text-blue-600 mt-2">{plan.price}</p>
                            </div>
                            <div className="space-y-2">
                                {plan.features.map((feature, index) => (
                                    <div key={index} className="flex items-center text-sm text-gray-600">
                                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Payment Form */}
                    <motion.div 
                        initial={{ x: 20 }}
                        animate={{ x: 0 }}
                        className="md:col-span-2"
                    >
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Payment Method Selection */}
                                <div className="space-y-4">
                                    <label className="block text-lg font-semibold">Payment Method</label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {paymentMethods.map(method => (
                                            <button
                                                key={method.id}
                                                type="button"
                                                onClick={() => setPaymentMethod(method.id)}
                                                className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-all ${
                                                    paymentMethod === method.id 
                                                    ? 'border-blue-500 bg-blue-50 shadow-md transform scale-105' 
                                                    : 'hover:border-blue-200 hover:bg-blue-50/50'
                                                }`}
                                            >
                                                <span className="text-2xl mb-2">{method.icon}</span>
                                                <span className="text-sm font-medium">{method.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Payment Method Forms */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {paymentMethod === 'card' && (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Card Number</label>
                                                <input
                                                    type="text"
                                                    name="cardNumber"
                                                    value={formData.cardNumber}
                                                    onChange={handleInputChange}
                                                    placeholder="1234 5678 9012 3456"
                                                    className={`mt-1 block w-full border rounded-md shadow-sm p-3 ${
                                                        cardError ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                    maxLength="19"
                                                    required
                                                />
                                                {cardError && (
                                                    <p className="mt-1 text-sm text-red-600">{cardError}</p>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                                                    <input
                                                        type="text"
                                                        name="expiryDate"
                                                        value={formData.expiryDate}
                                                        onChange={handleInputChange}
                                                        placeholder="MM/YY"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
                                                        maxLength="5"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">CVV</label>
                                                    <input
                                                        type="password"
                                                        name="cvv"
                                                        value={formData.cvv}
                                                        onChange={handleInputChange}
                                                        placeholder="123"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
                                                        maxLength="4"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {paymentMethod === 'upi' && (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">UPI ID</label>
                                                <input
                                                    type="text"
                                                    name="upiId"
                                                    value={formData.upiId}
                                                    onChange={handleInputChange}
                                                    placeholder="username@upi"
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
                                                    required
                                                />
                                                <p className="mt-1 text-sm text-gray-500">Enter your UPI ID (e.g., username@okaxis or number@upi)</p>
                                            </div>
                                        </div>
                                    )}

                                    {paymentMethod === 'wallet' && (
                                        <div className="space-y-4">
                                            <label className="block text-sm font-medium text-gray-700">Select Wallet</label>
                                            <div className="grid grid-cols-2 gap-4">
                                                {walletOptions.map(wallet => (
                                                    <button
                                                        key={wallet.id}
                                                        type="button"
                                                        onClick={() => setFormData(prev => ({ ...prev, walletType: wallet.id }))
                                                        }
                                                        className={`p-4 border rounded-lg text-center transition-all ${
                                                            formData.walletType === wallet.id
                                                            ? 'border-blue-500 bg-blue-50'
                                                            : 'hover:border-blue-200'
                                                        }`}
                                                    >
                                                        {wallet.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {paymentMethod === 'netbanking' && (
                                        <div className="space-y-4">
                                            <label className="block text-sm font-medium text-gray-700">Select Bank</label>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                {banks.map(bank => (
                                                    <button
                                                        key={bank.id}
                                                        type="button"
                                                        onClick={() => setFormData(prev => ({ ...prev, bank: bank.id }))
                                                        }
                                                        className={`p-4 border rounded-lg text-center transition-all ${
                                                            formData.bank === bank.id
                                                            ? 'border-blue-500 bg-blue-50'
                                                            : 'hover:border-blue-200'
                                                        }`}
                                                    >
                                                        {bank.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>

                                {/* Billing Information */}
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                    className="space-y-4"
                                >
                                    <h3 className="text-lg font-semibold">Billing Information</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
                                            required
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">City</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">State</label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">PIN Code</label>
                                            <input
                                                type="text"
                                                name="pincode"
                                                value={formData.pincode}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
                                                required
                                            />
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Processing Payment...
                                        </span>
                                    ) : (
                                        `Pay ${plan.price}`
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default CheckoutPage;