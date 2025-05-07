import React, { useState, useEffect } from 'react';

function useGeolocation() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (err) => {
        setError(err.message);
      }
    );
  }, []);

  return (
    <div>
      <h2>Current Location</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <p>
          Latitude: {location.latitude} <br />
          Longitude: {location.longitude}
        </p>
      )}
    </div>
  );
}

export default useGeolocation;
