import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const getPaymentMethodIcon = (method) => {
    switch (method) {
        case 'card': return '💳';
        case 'upi': return '📱';
        case 'netbanking': return '🏦';
        case 'wallet': return '👝';
        default: return '💰';
    }
};

const getPaymentMethodName = (details) => {
    switch (details.method) {
        case 'card':
            return 'Credit/Debit Card';
        case 'upi':
            return 'UPI';
        case 'netbanking':
            return `Net Banking (${details.bank?.toUpperCase() || ''})`;
        case 'wallet':
            return `${details.wallet?.charAt(0).toUpperCase()}${details.wallet?.slice(1) || ''} Wallet`;
        default:
            return 'Online Payment';
    }
};

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { plan, paymentDetails, amount } = location.state || {};

    useEffect(() => {
        if (!plan) {
            navigate('/membership');
        }
        window.scrollTo(0, 0);
    }, [plan, navigate]);

    if (!plan) return null;

    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const transactionId = Math.random().toString(36).substring(2, 15).toUpperCase();

    return (
        <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl w-full mx-auto p-8 bg-white rounded-lg shadow-lg"
            >
                <div className="text-center mb-8">
                    <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                        <motion.svg 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ 
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: 0.3
                            }}
                            className="w-10 h-10 text-green-500" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M5 13l4 4L19 7" 
                            />
                        </motion.svg>
                    </div>
                    
                    <motion.h1 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl font-bold text-gray-900 mb-2"
                    >
                        Payment Successful!
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-600"
                    >
                        Thank you for choosing our {plan.title} membership plan.
                    </motion.p>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gray-50 rounded-lg p-6 mb-6 divide-y divide-gray-200"
                >
                    <div className="grid grid-cols-2 gap-4 pb-4">
                        <div>
                            <p className="text-sm text-gray-600">Transaction ID</p>
                            <p className="font-medium">{transactionId}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Date</p>
                            <p className="font-medium">{currentDate}</p>
                        </div>
                    </div>

                    <div className="py-4">
                        <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Plan</span>
                                <span className="font-medium">{plan.title}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Billing</span>
                                <span className="font-medium">{plan.billingCycle}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Amount Paid</span>
                                <span className="font-bold text-lg text-blue-600">{amount}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Payment Method</span>
                                <span className="font-medium flex items-center">
                                    <span className="mr-2">{getPaymentMethodIcon(paymentDetails.method)}</span>
                                    {getPaymentMethodName(paymentDetails)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <h3 className="font-medium mb-2">Plan Features</h3>
                        <ul className="space-y-2">
                            {plan.features.map((feature, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + (index * 0.1) }}
                                    className="flex items-center text-sm text-gray-600"
                                >
                                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {feature}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-4"
                >
                    <button
                        onClick={() => window.print()}
                        className="w-full flex items-center justify-center bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition duration-300"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        Print Receipt
                    </button>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full flex items-center justify-center bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                        Go to Dashboard
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default PaymentSuccess;