import React from "react";

const SpaMap = ({ spa }) => {
  // Function to check if the mapLink is embeddable
  const isEmbeddableLink = (link) => {
    return link && link.includes('google.com/maps/embed');
  };

  return (
    <div className="w-full h-[400px] md:h-[500px] relative">
      {isEmbeddableLink(spa.mapLink) ? (
        <iframe
          title="Spa Location"
          src={spa.mapLink}
          width="100%"
          height="100%"
          className="border-0 rounded-xl shadow-lg"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      ) : (
        <div className="flex flex-col items-center justify-center h-full bg-gray-100 rounded-xl shadow-lg p-4">
          <p className="text-gray-700 mb-4">View location on Google Maps</p>
          <a
            href={spa.mapLink || "https://goo.gl/maps/xyz"}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Open Map
          </a>
        </div>
      )}
    </div>
  );
};

export default SpaMap;
