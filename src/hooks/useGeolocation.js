import { useState, useCallback } from 'react';

export const useGeolocation = () => {
  const [location, setLocation] = useState(null); // { latitude, longitude }
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const requestLocation = useCallback(() => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        // Handle common Geolocation API errors
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("Location request denied. Please enable permissions in your browser.");
            break;
          case err.POSITION_UNAVAILABLE:
            setError("Location information is currently unavailable.");
            break;
          case err.TIMEOUT:
            setError("The request to get user location timed out.");
            break;
          default:
            setError("An unknown error occurred while fetching location.");
            break;
        }
        setLoading(false);
      },
      {
        enableHighAccuracy: true, // Crucial for hyperlocal apps
        timeout: 10000,           // 10 second timeout
        maximumAge: 0             // Force a fresh location fetch
      }
    );
  }, []);

  return { location, error, loading, requestLocation, setLocation };
};