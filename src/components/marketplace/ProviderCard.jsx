import React from 'react';

export const ProviderCard = ({ provider }) => {
  return (
    <div style={{ 
      border: '1px solid #ddd', 
      padding: '1rem', 
      borderRadius: '8px',
      marginBottom: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>{provider.displayName || 'Service Provider'}</h3>
        <p style={{ margin: '0', color: '#555' }}>{provider.serviceType || 'General Services'}</p>
      </div>
      <div style={{ textAlign: 'right' }}>
        <strong style={{ fontSize: '1.2rem', color: '#0066cc' }}>
          {provider.distance.toFixed(1)} km
        </strong>
        <p style={{ margin: '0', fontSize: '0.8rem', color: '#777' }}>away</p>
      </div>
    </div>
  );
};