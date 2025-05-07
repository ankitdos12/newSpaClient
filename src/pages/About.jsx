// File: src/pages/About.jsx
import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {/* Hero Section */}
          <div className="relative h-96 mb-16 rounded-xl overflow-hidden">
            <img
              src="https://ghpnews.digital/wp-content/uploads/2023/06/spa-massage.jpg"
              alt="Luxury Spa"
              className="w-full h-full object-cover brightness-50"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
              <h1 className="text-5xl font-bold mb-4">Welcome to SpaAdvisor</h1>
              <p className="text-xl">
                Your gateway to ultimate relaxation and wellness
              </p>
            </div>
          </div>

          {/* Journey Section with Image */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Our Journey
              </h2>
              <p className="text-gray-600">
                Since our inception in 2018, SpaAdvisor has revolutionized the
                way people experience spa and wellness services. Born from a
                passion for wellness and technology, we've created a platform
                that seamlessly connects spa enthusiasts with premium wellness
                destinations across the globe.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-lg overflow-hidden"
            >
              <img
                src="https://cdn.luxeglobalawards.com/cdn-cgi/image/width=1440,fit=contain,quality=85,format=auto/production/onrVRFONZHXtDMBzkozG2oUIaNLOJHMH-Kara%20Spa%20Hero%20shot%202.jpg"
                alt="Our Journey"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          </div>

          {/* Vision & Mission Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Our Vision
              </h2>
              <p className="text-gray-600">
                To create a world where wellness is accessible, affordable, and
                achievable for everyone, transforming lives through the power of
                relaxation and self-care.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600">
                To provide a seamless, trusted platform that connects people
                with exceptional spa experiences, while supporting wellness
                professionals in growing their businesses.
              </p>
            </motion.div>
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              What Sets Us Apart
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Curated Excellence",
                  description: "Hand-picked selection of premium spas",
                  image: "https://source.unsplash.com/400x300/?luxury,spa",
                },
                {
                  title: "Seamless Booking",
                  description: "Intuitive platform with real-time availability",
                  image: "https://source.unsplash.com/400x300/?booking,hotel",
                },
                {
                  title: "Verified Reviews",
                  description: "Authentic feedback from real spa-goers",
                  image: "https://source.unsplash.com/400x300/?review,rating",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="h-48 rounded-lg overflow-hidden mb-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
