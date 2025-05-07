import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const ServicesComingSoon = () => {
    const navigate = useNavigate();
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleReload = () => {
        navigate('/spas')
    }

    return (
        <div className="min-h-screen pt-20 bg-gray-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-blue-600 text-white py-16"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold mb-6">Exciting Feature Coming Soon</h1>
                    <p className="text-xl mb-8">We're working on something amazing for you</p>
                    <div className="flex justify-center">
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-6xl"
                        >
                            ✨
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
            >

                <div className="text-center mt-16">
                    <h2 className="text-2xl font-bold mb-6">Want to be notified when we launch?</h2>
                    <div className="max-w-md mx-auto">
                        <div className="flex gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <button onClick={handleReload} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                                Notify Me
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-16">
                    <p className="text-gray-600 mb-6">In the meantime, check out our existing services</p>
                    <Link
                        to="/membership"
                        className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        View Membership Plans
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default ServicesComingSoon;
