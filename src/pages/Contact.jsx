import { useEffect } from 'react';

import CompanyInfo from './CompanyInfo';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>

      <section className="relative w-full h-[60vh] md:h-[75vh] lg:h-[90vh]">
        {/* Background Image */}
        <img
          src="/images/dummy-spa-images/3.JPG"
          alt="Hero"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Let’s Connect & Collaborate</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Reach out to us for partnerships, inquiries, or just to say hello. We're here to help you grow.
            </p>
          </div>
        </div>

      </section>


      <CompanyInfo />

      <section className="min-h-screen flex items-center justify-center px-6 py-12 bg-gray-100">
        <div className="max-w-7xl w-full bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">

          {/* Left Side - Contact Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h2>
            <form className="space-y-4">

              <div>
                <label className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1234567890"
                />
              </div>

              <div>
                <label className="block text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label className="block text-gray-700">Message</label>
                <textarea
                  name="message"
                  rows="4"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right Side - Image */}

          <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-md">
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.1666728070654!2d73.00102997596503!3d19.05640815258591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c178618aadb3%3A0x576ab70145b917e2!2sDisha%20Online%20Solution!5e0!3m2!1sen!2sin!4v1745674709232!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ minHeight: '400px', border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>


        </div>
      </section>



    </>
  );
};

export default Contact;
