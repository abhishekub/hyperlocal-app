import React from 'react';
import { useParams, Link } from 'react-router-dom';

export const ProviderDetailsPage = () => {
  const { id } = useParams();
  
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Provider Details</h2>
      <p>Viewing details for provider ID: {id}</p>
      {/* Future: Fetch specific provider data from Firestore */}
      <Link to="/customer/checkout" style={{ display: 'inline-block', marginTop: '1rem', padding: '0.5rem 1rem', background: '#28a745', color: 'white', textDecoration: 'none' }}>
        Book Service
      </Link>
    </div>
  );
};