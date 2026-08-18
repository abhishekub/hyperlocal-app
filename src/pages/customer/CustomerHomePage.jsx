import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { NearbyFeed } from '../../features/customer/NearbyFeed';
import { logoutUser } from '../../services/authService';

export const CustomerHomePage = () => {
  const { userData } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Welcome, {userData?.email?.split('@')[0] || 'Customer'}</h1>
        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem' }}>Logout</button>
      </header>

      <main>
        <NearbyFeed />
      </main>
    </div>
  );
};