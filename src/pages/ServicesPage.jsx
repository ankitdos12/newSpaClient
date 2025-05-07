import { useState } from "react";
import { Info, Calendar } from "lucide-react";
import { useNavigate } from "react-router";
import { TiArrowBackOutline } from "react-icons/ti";

const ServicesPage = ({ services, spaId }) => {
  console.log("ServicesPage", services, spaId);

  console.log("ServicesPage", services);


  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);


  // Modal for service details
  const ServiceDetailsModal = ({ service, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center p-2 sm:p-4">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-white/80 rounded-full p-1 sm:p-2 hover:bg-white"
          >
            ✕
          </button>

          <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-1/2 h-48 sm:h-64 md:h-auto">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
              />
            </div>

            <div className="p-4 sm:p-6 flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                {service.title}
              </h2>
              <p className="text-sm text-gray-500 mb-1">Spa: {service.spaName}</p>
              <p className="text-gray-600 mb-4 sm:mb-6 text-base sm:text-lg">
                {service.description}
              </p>

              <div className="mb-6">
                <h3 className="font-semibold text-xl mb-3">Service Highlights:</h3>
                <ul className="grid grid-cols-2 gap-3">
                  {service.details.flatMap((detail, index) =>
                    detail.split(",").map((item, subIndex) => {
                      const cleanedItem = item.trim().replace(/[\[\]"]+/g, '');
                      return (
                        <li
                          key={`${index}-${subIndex}`}
                          className="flex items-center text-gray-700"
                        >
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          {cleanedItem}
                        </li>
                      );
                    })
                  )}

                </ul>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-gray-500 text-lg">Duration Options:</span>
                  <div className="font-medium">
                    {service.duration.flatMap((dur, index) =>
                      dur.split(",").map((item, subIndex) => {
                        const cleanedItem = item.trim().replace(/[\[\]"]+/g, '');
                        return (
                          <span key={`${index}-${subIndex}`} className="block">
                            {cleanedItem}
                          </span>
                        );
                      })
                    )}

                  </div>
                  <span className="block font-bold text-2xl text-blue-600">
                    ₹{service.price}
                  </span>
                </div>
                <button
                  onClick={() => navigate("/booking", { state: { service, spaId } })}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 sm:mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        <div className="p-3 rounded-md">
          <TiArrowBackOutline className="text-4xl" />
        </div>
      </button>
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-start">
        Our Spa Services
      </h1>

      {services.length === 0 ? (
        <p>No services available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-4 sm:p-6">
                <p className="text-sm text-gray-500 mb-1">Spa: {service.spaName}</p>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-2">
                  {service.description}
                </p>

                <div className="flex justify-between items-center mb-4 sm:mb-5">
                  <span className="text-gray-500 text-base sm:text-lg">
                    {service.duration[0]?.replace(/[\[\]"]+/g, '').trim()}
                  </span>

                  <span className="font-bold text-lg sm:text-xl text-blue-600">
                    ₹{service.price}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="w-full flex items-center justify-center bg-white border-2 border-blue-600 text-blue-600 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-sm sm:text-base"
                  >
                    <Info className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                    Details
                  </button>
                  <button
                    onClick={() => navigate("/booking", { state: { service, spaId } })}
                    className="w-full flex items-center justify-center bg-blue-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm sm:text-base"
                  >
                    <Calendar className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedService && (
        <ServiceDetailsModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
};

export default ServicesPage;
