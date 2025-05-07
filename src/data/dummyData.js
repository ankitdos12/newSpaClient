import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || `http://localhost:5000/api/v1`;

// Get all spas
// export const dummySpaData = async () => {
//     const response = await axios.get(`${API_URL}/spas`);
//     return response.data;
// };

export const dummyLocations = [{
    country: 'India',
    state: 'Maharashtra',
    district: 'Thane',
    locality: 'Vashi'
},
{
    country: 'India',
    state: 'Maharashtra',
    district: 'Thane',
    locality: 'Nerul'
},
{
    country: 'India',
    state: 'Maharashtra',
    district: 'Thane',
    locality: 'Belapur'
},
{
    country: 'India',
    state: 'Maharashtra',
    district: 'Thane',
    locality: 'Kharghar'
},
{
    country: 'India',
    state: 'Maharashtra',
    district: 'Thane',
    locality: 'Panvel'
}
];

export const dummySpaData = [{
    id: '1',
    name: 'Orchid Wellness SPA',
    address: '202, 2nd Floor, Neelkantha Darshan Chs, Old Pune Highway, Panvel, Navi Mumbai - 410206 (Opp Orion Mall,)202, 2nd Floor, Neelkantha Darshan Chs, Old Pune Highway, Panvel, Navi Mumbai - 410206 (Opp Orion Mall,)',
    country: 'India',
    state: 'Maharashtra',
    district: 'Raigad',
    locality: 'Panvel',
    type: ['Ayurvedic', 'Swedish', 'Deep Tissue'],
    coordinates: {
        lat: 19.0728,
        lng: 72.9998
    },
    images: ['1.JPG', '4.JPG', '3.JPG', '5.JPG', '6.JPG', '7.JPG', '8.JPG'],
    rating: 4.7,
    reviewCount: 132,
    startingPrice: 1499,
    discount: 15,
    createdAt: '2024-03-10T10:00:00Z'
},
{
    id: '2',
    name: 'Nerul Wellness Lounge',
    address: 'Palm Beach Road, Sector 21, Nerul',
    country: 'India',
    state: 'Maharashtra',
    district: 'Thane',
    locality: 'Nerul',
    type: ['Swedish', 'Aromatherapy', 'Hot Stone'],
    coordinates: {
        lat: 19.0334,
        lng: 73.0297
    },
    images: ['10.JPG', '11.JPG', '13.JPG', '14.JPG', '15.JPG'],
    rating: 4.5,
    reviewCount: 89,
    startingPrice: 1999,
    discount: 20,
    createdAt: '2024-02-25T12:00:00Z'
},
{
    id: '3',
    name: 'Belapur Bliss Spa',
    address: 'Sector 15, CBD Belapur',
    country: 'India',
    state: 'Maharashtra',
    district: 'Thane',
    locality: 'Belapur',
    type: ['Thai', 'Deep Tissue', 'Sports Massage'],
    coordinates: {
        lat: 19.0222,
        lng: 73.0439
    },
    images: ['20.JPG', '21.JPG', '23.JPG', '24.JPG',],
    rating: 4.8,
    reviewCount: 104,
    startingPrice: 2499,
    discount: 10,
    createdAt: '2024-01-30T15:30:00Z'
},
{
    id: '4',
    name: 'Kharghar Tranquil Touch',
    address: 'Sector 12, Kharghar',
    country: 'India',
    state: 'Maharashtra',
    district: 'Thane',
    locality: 'Kharghar',
    type: ['Deep Tissue', 'Swedish', 'Shiatsu'],
    coordinates: {
        lat: 19.0330,
        lng: 73.0652
    },
    images: ['30.JPG', '32.JPG', '33.JPG'],
    rating: 4.6,
    reviewCount: 98,
    startingPrice: 1799,
    discount: 25,
    createdAt: '2024-02-10T09:00:00Z'
},
{
    id: '5',
    name: 'Panvel Heritage Spa',
    address: 'Plot 22, Old Panvel',
    country: 'India',
    state: 'Maharashtra',
    district: 'Thane',
    locality: 'Panvel',
    type: ['Aromatherapy', 'Thai', 'Reflexology'],
    coordinates: {
        lat: 18.9894,
        lng: 73.1175
    },
    images: ['40.JPG', '41.JPG', '42.JPG', '43.JPG',],
    rating: 4.4,
    reviewCount: 76,
    startingPrice: 1299,
    discount: 30,
    createdAt: '2024-03-01T13:45:00Z'
}
    ,
{
    id: '5',
    name: 'SpaAmpre thane',
    address: 'Plot 22, Old Panvel',
    country: 'India',
    state: 'Maharashtra',
    district: 'Thane',
    locality: 'Thane',
    type: ['Aromatherapy', 'Thai', 'Reflexology', 'Reflexology'],
    coordinates: {
        lat: 18.9894,
        lng: 73.1175
    },
    images: ['40.JPG', '41.JPG', '42.JPG', '43.JPG', '44.JPG'],
    rating: 4.4,
    reviewCount: 76,
    startingPrice: 2499,
    discount: 25,
    createdAt: '2024-04-01T13:45:00Z'
}
];

export const dummyReviews = [{
    id: '101',
    spaId: '1',
    userId: 'user1',
    userName: 'Alice Johnson',
    rating: 5,
    text: 'Absolutely amazing experience! The staff was professional and attentive. Will definitely come back.',
    date: '2024-03-10T14:30:00Z'
},
{
    id: '102',
    spaId: '1',
    userId: 'user2',
    userName: 'Robert Smith',
    rating: 4,
    text: 'Great service and ambiance. The only reason I didn\'t give 5 stars is because the massage was a bit short.',
    date: '2024-03-05T16:45:00Z'
},
{
    id: '103',
    spaId: '2',
    userId: 'user3',
    userName: 'Emily Davis',
    rating: 5,
    text: 'Perfect way to destress! The therapist was skilled and the facilities were immaculate.',
    date: '2024-02-25T11:20:00Z'
},
{
    id: '104',
    spaId: '3',
    userId: 'user4',
    userName: 'Michael Brown',
    rating: 5,
    text: 'Best Thai massage I\'ve had outside of Thailand. Highly recommended!',
    date: '2024-01-15T13:10:00Z'
},
{
    id: '105',
    spaId: '3',
    userId: 'user5',
    userName: 'Sarah Wilson',
    rating: 4,
    text: 'Great experience overall. The massage was excellent but the waiting area was a bit noisy.',
    date: '2024-01-12T10:30:00Z'
}
];

// Helper function to filter spas based on location and other criteria
export const filterSpas = (spas, filters, userLocation) => {
    return spas.filter(spa => {
        // Location filters
        if (filters.country && spa.country !== filters.country) return false;
        if (filters.state && spa.state !== filters.state) return false;
        if (filters.district && spa.district !== filters.district) return false;
        if (filters.locality && spa.locality !== filters.locality) return false;

        // Spa type filter
        if (filters.spaType && !spa.type.includes(filters.spaType)) return false;

        // Keyword search
        if (filters.keyword) {
            const keyword = filters.keyword.toLowerCase();
            const matchesName = spa.name.toLowerCase().includes(keyword);
            const matchesAddress = spa.address.toLowerCase().includes(keyword);
            const matchesType = spa.type.some(type => type.toLowerCase().includes(keyword));
            if (!(matchesName || matchesAddress || matchesType)) return false;
        }

        return true;
    });
};

// Helper function to get spas within a radius
export const getSpasWithinRadius = (spas, userLocation, radiusKm = 10) => {
    if (!userLocation) return [];

    const earthRadiusKm = 6371; // Earth's radius in km

    return spas.filter(spa => {
        // Calculate distance using Haversine formula
        const lat1 = userLocation.lat * Math.PI / 180;
        const lat2 = spa.coordinates.lat * Math.PI / 180;
        const deltaLat = (spa.coordinates.lat - userLocation.lat) * Math.PI / 180;
        const deltaLng = (spa.coordinates.lng - userLocation.lng) * Math.PI / 180;

        const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = earthRadiusKm * c;

        // Check if distance is within radius
        return distance <= radiusKm;
    });
};

// Get popular spas (highest rated or most reviewed)
export const getPopularSpas = (spas, sortBy = 'rating') => {
    return [...spas].sort((a, b) => {
        if (sortBy === 'rating') {
            return b.rating - a.rating;
        } else if (sortBy === 'reviewCount') {
            return b.reviewCount - a.reviewCount;
        }
        return 0;
    });
};

// Get recent spas
export const getRecentSpas = (spas) => {
    return [...spas].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
};