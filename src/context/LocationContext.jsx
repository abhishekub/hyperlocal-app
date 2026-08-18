import React, { createContext, useContext } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  // Leverage our custom hook for the actual logic
  const { location, error, loading, requestLocation, setLocation } = useGeolocation();

  const value = {
    location,          // Current global location state
    error,             // Any permission/timeout errors
    loading,           // Is the browser actively fetching?
    requestLocation,   // Function to trigger the browser prompt
    setLocation        // Manual override (useful if you later add manual zip code entry)
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

// Custom hook helper to easily consume LocationContext
export const useGlobalLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useGlobalLocation must be used within a LocationProvider');
  }
  return context;
};