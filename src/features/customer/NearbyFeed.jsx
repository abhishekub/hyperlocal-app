import React, { useState, useEffect } from 'react';
import { useGlobalLocation } from '../../context/LocationContext';
import { getProviders } from '../../services/dbService';
import { calculateHaversineDistance } from '../../utils/distance';
import { ProviderCard } from '../../components/marketplace/ProviderCard';

const SEARCH_RADIUS_KM = 50; // Hyperlocal limit

export const NearbyFeed = () => {
  const { location, requestLocation, loading: locationLoading, error: locationError } = useGlobalLocation();
  const [providers, setProviders] = useState([]);
  const [loadingProviders, setLoadingProviders] = useState(false);

  useEffect(() => {
    // Only fetch and calculate if we have the user's location
    if (location) {
      const fetchAndSortProviders = async () => {
        setLoadingProviders(true);
        try {
          const allProviders = await getProviders();
          
          const nearbyProviders = allProviders
            .map(provider => {
              // Ensure provider has coordinates set in their profile
              if (!provider.latitude || !provider.longitude) {
                return { ...provider, distance: Infinity };
              }
              
              const distance = calculateHaversineDistance(location, {
                latitude: provider.latitude,
                longitude: provider.longitude
              });
              
              return { ...provider, distance };
            })
            // Filter out providers without location or outside our radius
            .filter(p => p.distance <= SEARCH_RADIUS_KM)
            // Sort closest first
            .sort((a, b) => a.distance - b.distance);

          setProviders(nearbyProviders);
        } catch (error) {
          console.error("Failed to load providers:", error);
        } finally {
          setLoadingProviders(false);
        }
      };

      fetchAndSortProviders();
    }
  }, [location]);

  // UI States
  if (locationError) {
    return (
      <div style={{ padding: '1rem', background: '#ffebee', color: '#c62828', borderRadius: '4px' }}>
        <p>Location Error: {locationError}</p>
        <button onClick={requestLocation}>Try Again</button>
      </div>
    );
  }

  if (!location) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <h2>Find services near you</h2>
        <p>We need your location to show available providers in your area.</p>
        <button 
          onClick={requestLocation}
          disabled={locationLoading}
          style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', cursor: 'pointer' }}
        >
          {locationLoading ? 'Locating...' : 'Enable Location'}
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Providers Near You</h2>
      
      {loadingProviders ? (
        <p>Searching for nearby services...</p>
      ) : providers.length > 0 ? (
        providers.map(provider => (
          <ProviderCard key={provider.id} provider={provider} />
        ))
      ) : (
        <p>No providers found within {SEARCH_RADIUS_KM}km. Try checking back later!</p>
      )}
    </div>
  );
};