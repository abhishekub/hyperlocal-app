import React from 'react';

export const JobRequestList = ({ requests = [] }) => {
  if (requests.length === 0) {
    return <p>No active job requests right now.</p>;
  }

  return (
    <div>
      <h3>Incoming Job Requests</h3>
      {requests.map((req) => (
        <div key={req.id} style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem', borderRadius: '4px' }}>
          <p><strong>Date:</strong> {req.date}</p>
          <p><strong>Customer Notes:</strong> {req.notes}</p>
          <button style={{ background: '#28a745', color: 'white', padding: '0.5rem', border: 'none', marginRight: '0.5rem' }}>Accept</button>
          <button style={{ background: '#dc3545', color: 'white', padding: '0.5rem', border: 'none' }}>Decline</button>
        </div>
      ))}
    </div>
  );
};