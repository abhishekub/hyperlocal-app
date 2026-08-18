import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useGlobalLocation } from '../../context/LocationContext';
import { updateUserProfile } from '../../services/dbService';

export const ServiceEditor = () => {
  const { currentUser, userData } = useAuth();
  const { location, requestLocation, loading: locationLoading, error: locationError } = useGlobalLocation();
  
  const [serviceType, setServiceType] = useState(userData?.serviceType || '');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Auto-populate if userData changes
  useEffect(() => {
    if (userData?.serviceType) {
      setServiceType(userData.serviceType);
    }
  }, [userData]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!location) {
      setMessage('Please enable location to broadcast your services.');
      return;
    }

    setIsSaving(true);
    try {
      await updateUserProfile(currentUser.uid, {
        serviceType,
        latitude: location.latitude,
        longitude: location.longitude,
        updatedAt: new Date().toISOString()
      });
      setMessage('Profile and active location successfully updated!');
    } catch (error) {
      console.error(error);
      setMessage('Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
      <h2>Service Profile & Location</h2>
      <p>Update your status so nearby customers can find you.</p>

      {locationError && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          Error: {locationError}
        </div>
      )}

      {!location ? (
        <div style={{ marginBottom: '1.5rem' }}>
          <p>We need your location to show you to nearby customers.</p>
          <button 
            onClick={requestLocation} 
            disabled={locationLoading}
            style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
          >
            {locationLoading ? 'Fetching Location...' : 'Enable Location'}
          </button>
        </div>
      ) : (
        <div style={{ color: 'green', marginBottom: '1.5rem', fontWeight: 'bold' }}>
          ✓ Location actively captured.
        </div>
      )}

      <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label>What service are you offering?</label><br />
          <input 
            type="text" 
            value={serviceType} 
            onChange={(e) => setServiceType(e.target.value)} 
            placeholder="e.g., Plumber, House Cleaning, Dog Walker"
            required 
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={!location || isSaving}
          style={{ 
            padding: '0.75rem', 
            background: (!location || isSaving) ? '#ccc' : '#0066cc', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: (!location || isSaving) ? 'not-allowed' : 'pointer'
          }}
        >
          {isSaving ? 'Saving...' : 'Broadcast Location & Service'}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: '1rem', color: message.includes('Failed') ? 'red' : 'green' }}>
          {message}
        </p>
      )}
    </div>
  );
};