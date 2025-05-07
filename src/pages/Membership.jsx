import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; 

const MembershipPage = () => {
    const [duration, setDuration] = useState('monthly');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); 

    const [openFaq, setOpenFaq] = useState(null);
    const navigate = useNavigate();

    const membershipPlans = [
        {
            title: "Basic",
            monthlyPrice: "₹999",
            yearlyPrice: "₹9,990",
            features: [
                "Access to basic spa services",
                "2 massage sessions per month",
                "10% discount on additional services",
                "Basic amenities access"
            ],
            popular: false,
            backgroundColor: "bg-white"
        },
        {
            title: "Premium",
            monthlyPrice: "₹2,499",
            yearlyPrice: "₹24,990",
            features: [
                "Access to all spa services",
                "5 massage sessions per month",
                "20% discount on additional services",
                "Premium amenities access",
                "Priority booking"
            ],
            popular: true,
            backgroundColor: "bg-blue-50"
        },
        {
            title: "VIP",
            monthlyPrice: "₹4,999",
            yearlyPrice: "₹49,990",
            features: [
                "Unlimited spa services",
                "10 massage sessions per month",
                "30% discount on additional services",
                "Premium amenities access",
                "Priority booking",
                "Personal spa consultant"
            ],
            popular: false,
            backgroundColor: "bg-white"
        }
    ];

    const benefits = [
        {
            title: "Exclusive Access",
            description: "Get priority booking and exclusive access to premium spa facilities",
            icon: "🌟"
        },
        {
            title: "Save More",
            description: "Up to 30% savings on regular spa services and treatments",
            icon: "💰"
        },
        {
            title: "Flexibility",
            description: "Book sessions at multiple locations across the city",
            icon: "📍"
        },
        {
            title: "Wellness Journey",
            description: "Personalized wellness plans and progress tracking",
            icon: "🎯"
        }
    ];

    const faqs = [
        {
            question: "How does the membership work?",
            answer: "Our membership gives you access to premium spa services at discounted rates. Choose your plan, book sessions easily, and enjoy exclusive benefits."
        },
        {
            question: "Can I cancel my membership anytime?",
            answer: "Yes, you can cancel your membership with a 30-day notice period. Any unused sessions will remain valid until the end of your billing cycle."
        },
        {
            question: "Are the sessions transferable?",
            answer: "Sessions are non-transferable and linked to your personal membership account for security reasons."
        },
        {
            question: "How do I book sessions?",
            answer: "You can book sessions through our mobile app or website. Premium and VIP members get priority booking privileges."
        },
        {
            question: "What happens if I need to reschedule?",
            answer: "You can reschedule your appointment up to 4 hours before the scheduled time without any charges through our app or website."
        },
        {
            question: "Is there a satisfaction guarantee?",
            answer: "Yes! We offer a 100% satisfaction guarantee. If you're not happy with your service, we'll either redo it or refund your session."
        },
        {
            question: "How do I contact customer support?",
            answer: "We offer 24/7 support through live chat, email at support@spados.com, or call us at 1800-XXX-XXXX."
        }
    ];

    const supportFeatures = [
        {
            title: "24/7 Support",
            description: "Our dedicated team is available round the clock to assist you",
            icon: "🎧"
        },
        {
            title: "Instant Chat",
            description: "Get quick responses through our live chat support",
            icon: "💬"
        },
        {
            title: "Priority Service",
            description: "Premium members get priority customer support",
            icon: "⭐"
        }
    ];

    const handlePlanSelect = (plan) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/coming-soon');
            return;
        }

        // Navigate to payment dashboard with plan details
        navigate('/coming-soon', {
            state: {
                plan: {
                    ...plan,
                    price: duration === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice,
                    billingCycle: duration,
                }
            }
        });
    };

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen pt-20 bg-gray-50">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-blue-600 text-white py-16"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-6">Transform Your Wellness Journey</h1>
                        <p className="text-xl mb-8">Join thousands of members who have made self-care a priority</p>
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <div className="flex items-center">
                                <span className="font-bold text-2xl mr-2">50K+</span>
                                <span>Active Members</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-bold text-2xl mr-2">30+</span>
                                <span>Premium Locations</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-bold text-2xl mr-2">4.8/5</span>
                                <span>Customer Rating</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Pricing Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Choose Your Membership Plan
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Select the perfect membership that suits your wellness journey
                    </p>

                    {/* Duration Toggle */}
                    <div className="flex items-center justify-center space-x-4 mb-8">
                        <button
                            onClick={() => setDuration('monthly')}
                            className={`px-6 py-2 rounded-full ${duration === 'monthly'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setDuration('yearly')}
                            className={`px-6 py-2 rounded-full ${duration === 'yearly'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700'
                                }`}
                        >
                            Yearly (Save 20%)
                        </button>
                    </div>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {membershipPlans.map((plan, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            whileHover={{ y: -10 }}
                            className={`relative ${plan.backgroundColor} rounded-xl shadow-lg overflow-hidden transition-shadow duration-300`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-lg">
                                    Most Popular
                                </div>
                            )}
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.title}</h3>
                                <div className="mb-6">
                                    <p className="text-4xl font-bold text-blue-600">
                                        {duration === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                                        <span className="text-lg text-gray-500">/{duration === 'monthly' ? 'month' : 'year'}</span>
                                    </p>
                                    {duration === 'yearly' && (
                                        <p className="text-green-600 text-sm mt-2">Save 20% with annual billing</p>
                                    )}
                                </div>
                                <ul className="space-y-4">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center">
                                            <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => handlePlanSelect(plan)}
                                    className="mt-8 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                                >
                                    Get Started
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Benefits Section - Moved up */}
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
            >
                <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Membership?</h2>
                <motion.div className="grid md:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            whileHover={{ scale: 1.05 }}
                            className="text-center p-6 bg-white rounded-lg shadow-md"
                        >
                            <div className="text-4xl mb-4">{benefit.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                            <p className="text-gray-600">{benefit.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* FAQ Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-100">
                <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto space-y-4"
                >
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                            >
                                <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                                <svg
                                    className={`w-5 h-5 transform transition-transform duration-200 ${openFaq === index ? 'rotate-180' : ''
                                        }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {openFaq === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className="px-6 py-4 text-gray-600 border-t">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Customer Support Section */}
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50"
            >
                <h2 className="text-3xl font-bold text-center mb-4">We're Here to Help</h2>
                <p className="text-gray-600 text-center mb-12">Exceptional support for an exceptional experience</p>
                <div className="grid md:grid-cols-3 gap-8">
                    {supportFeatures.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white p-6 rounded-lg shadow-md text-center"
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <p className="text-lg mb-4">Need immediate assistance?</p>
                    <div className="flex justify-center space-x-4">
                        <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            <span>Live Chat</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </button>
                        <a href="tel:1800XXXXXXX" className="flex items-center space-x-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                            <span>Call Us</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </motion.div>

            {/* Call to Action */}
            <div className="bg-blue-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Start Your Wellness Journey?</h2>
                    <p className="text-xl mb-8">Join now and get your first session free!</p>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition duration-300"
                    >
                        Choose Your Plan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MembershipPage;
