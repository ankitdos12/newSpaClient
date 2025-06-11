import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const MembershipCards = () => {
    const [selectedCard, setSelectedCard] = useState('basic');
    const [isFlipped, setIsFlipped] = useState(false);

    const cardData = {
        basic: {
            title: 'BASIC',
            subtitle: 'Standard',
            gradient: 'from-slate-600 via-slate-700 to-slate-800',
            accentColor: 'text-slate-300',
            accentBg: 'bg-slate-300',
            cardNumber: '1234567',
            memberName: 'John Doe',
            memberClass: 'Standard Member',
            benefits: ['Basic rewards', 'Standard support', 'Monthly newsletter'],
            pattern: 'opacity-10',
            bgPattern: 'from-slate-500'
        },
        premium: {
            title: 'PREMIUM',
            subtitle: 'Gold',
            gradient: 'from-indigo-900 via-indigo-800 to-blue-900',
            accentColor: 'text-amber-400',
            accentBg: 'bg-gradient-to-b from-amber-400 to-amber-500',
            cardNumber: '2345678',
            memberName: 'Jane Smith',
            memberClass: 'Premium Member',
            benefits: ['Enhanced rewards', 'Priority support', 'Exclusive events', 'Monthly perks'],
            pattern: 'opacity-15',
            bgPattern: 'from-indigo-700'
        },
        vip: {
            title: 'VIP',
            subtitle: 'Platinum',
            gradient: 'from-slate-900 via-blue-900 to-slate-900',
            accentColor: 'text-amber-400',
            accentBg: 'bg-gradient-to-b from-amber-400 to-amber-500',
            cardNumber: '1234567',
            memberName: 'John Doe',
            memberClass: 'Executive Class',
            benefits: ['Maximum rewards', '24/7 concierge', 'VIP events', 'Personal advisor', 'Premium perks'],
            pattern: 'opacity-20',
            bgPattern: 'from-blue-700'
        }
    };

    const currentCard = cardData[selectedCard];

    const MembershipCard = ({ card, type }) => {
        // Create QR code data with member details
        const memberDetails = {
            cardType: type,
            name: card.memberName,
            memberClass: card.memberClass,
            cardNumber: card.cardNumber,
            benefits: card.benefits
        };
        
        const qrCodeData = JSON.stringify(memberDetails);

        return (
            <div className="relative w-96 h-60 perspective-1000">
                <div
                    className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                >
                    {/* Front of Card */}
                    <div className="absolute inset-0 backface-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-xl shadow-2xl overflow-hidden`}>
                            {/* Background Pattern - Diagonal Lines */}
                            <div className={`absolute inset-0 ${card.pattern}`}>
                                <div className={`absolute inset-0 bg-gradient-to-br ${card.bgPattern} to-transparent`}>
                                    {/* Diagonal line pattern */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-5 transform -skew-y-12"></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-5 transform -skew-y-12 translate-x-8"></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-5 transform -skew-y-12 translate-x-16"></div>
                                </div>
                            </div>

                            {/* Golden Curved Accent */}
                            {type !== 'basic' && (
                                <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
                                    <div className={`absolute top-0 right-0 w-32 h-full ${card.accentBg} opacity-80 transform skew-x-12 translate-x-16`}></div>
                                    <div className={`absolute top-0 right-4 w-1 h-full ${card.accentBg} opacity-60`}></div>
                                </div>
                            )}

                            {/* Content */}
                            <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                                {/* Header */}
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h1 className={`${card.accentColor} text-2xl font-bold tracking-wider`}>{card.title}</h1>
                                        <p className={`${card.accentColor} text-sm italic`}>{card.subtitle}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white text-xs tracking-widest uppercase">Membership Card</p>
                                        <div className="flex items-center mt-1">
                                            {type === 'vip' && (
                                                <>
                                                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-1"></div>
                                                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-1"></div>
                                                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                                </>
                                            )}
                                            {type === 'premium' && (
                                                <>
                                                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-1"></div>
                                                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                                </>
                                            )}
                                            {type === 'basic' && (
                                                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Card Number */}
                                <div className="text-center">
                                    <p className="text-white text-xl font-mono tracking-widest">{card.cardNumber}</p>
                                </div>

                                {/* Bottom Section */}
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className={`${card.accentColor} text-xs uppercase tracking-wide`}>Member Name</p>
                                        <p className={`${card.accentColor} text-lg font-semibold`}>{card.memberName}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white text-lg italic">{card.memberClass}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Back of Card */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180">
                        <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-xl shadow-2xl overflow-hidden`}>
                            {/* Background Pattern */}
                            <div className={`absolute inset-0 ${card.pattern}`}>
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white to-transparent transform -skew-y-12"></div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 p-6 h-full flex justify-between">
                                {/* Left Side - QR Code */}
                                <div className="flex flex-col justify-center">
                                    <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center mb-4 p-2">
                                        <QRCodeSVG
                                            value={qrCodeData}
                                            size={88}
                                            level="H"
                                            includeMargin={false}
                                        />
                                    </div>
                                    <p className="text-white text-xs text-center">Scan for details</p>
                                </div>

                                {/* Right Side - Benefits and Contact */}
                                <div className="flex-1 ml-6 flex flex-col justify-between text-white">
                                    <div>
                                        <h3 className={`${card.accentColor} text-sm font-semibold mb-2`}>Member Benefits:</h3>
                                        <ul className="text-xs leading-relaxed space-y-1">
                                            {card.benefits.map((benefit, index) => (
                                                <li key={index} className="flex items-center">
                                                    <div className={`w-1 h-1 ${card.accentBg} rounded-full mr-2`}></div>
                                                    {benefit}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="text-right text-xs">
                                        <p className="tracking-widest uppercase mb-1">Elite Membership Co.</p>
                                        <p>+91 7506359139</p>
                                        <p>www.spaadvisor.com</p>
                                        <p className={`${card.accentColor} mt-1 font-mono`}>ID: {card.cardNumber}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 mt-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Membership Tiers</h1>
                    <p className="text-gray-600">Choose your membership level and explore the benefits</p>
                </div>

                {/* Card Selector */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white rounded-lg p-1 shadow-lg">
                        {Object.keys(cardData).map((type) => (
                            <button
                                key={type}
                                onClick={() => {
                                    setSelectedCard(type);
                                    setIsFlipped(false);
                                }}
                                className={`px-6 py-3 rounded-md transition-all duration-300 font-semibold text-sm uppercase tracking-wide ${selectedCard === type
                                    ? type === 'basic'
                                        ? 'bg-gray-700 text-white'
                                        : type === 'premium'
                                            ? 'bg-purple-700 text-white'
                                            : 'bg-blue-800 text-white'
                                    : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                {cardData[type].title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Selected Card Display */}
                <div className="flex flex-col items-center">
                    <MembershipCard card={currentCard} type={selectedCard} />

                    {/* Flip Button */}
                    <button
                        onClick={() => setIsFlipped(!isFlipped)}
                        className="mt-6 bg-white text-gray-700 px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                    >
                        {isFlipped ? 'Show Front' : 'Show Back'}
                    </button>
                </div>

            </div>

            <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
        </div>
    );
};

export default MembershipCards;