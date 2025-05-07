import React from 'react';

const CompanyInfo = () => {
  return (
    <section className="bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-stretch">

        {/* Left Side - Company Details */}
        <div className="w-full md:w-1/2 bg-gray-100 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Office</h2>
          <p className="text-gray-700 mb-4">
            Welcome to our headquarters. Feel free to contact or visit us!
          </p>

          <div className="space-y-4 text-gray-700">
            <div>
              <h4 className="font-semibold">Company Name</h4>
              <p>SpaAdvisor.in</p>
            </div>
            <div>
              <h4 className="font-semibold">Address</h4>
              <p> 9th Floor Office no-907, Bhumiraj Costarica, Plot No- 1& 2, Sector 18, Sanpada, Navi Mumbai, Maharashtra 400705</p>
            </div>
            <div>
              <h4 className="font-semibold">Phone</h4>
              <p>+91 7506359139</p>
            </div>
            <div>
              <h4 className="font-semibold">Email</h4>
              <p>info@spaadvisor.in</p>
            </div>
            <div>
              <h4 className="font-semibold">Office Hours</h4>
              <p>Mon - Fri: 9am - 6pm</p>
            </div>
          </div>
        </div>

        {/* Right Side - Google Map */}

        <div className="w-full md:w-1/2">
          <img
            src="/images/dummy-spa-images/3.JPG"
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </section>
  );
};

export default CompanyInfo;
// Compare this snippet from src/components/common/Footer.jsx:
// import React from 'react';