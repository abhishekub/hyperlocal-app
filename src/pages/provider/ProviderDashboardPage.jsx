import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { logoutUser } from '../../services/authService';
import { ServiceEditor } from '../../features/provider/ServiceEditor';

export const ProviderDashboardPage = () => {
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
        <h1>Provider Dashboard</h1>
        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem' }}>Logout</button>
      </header>

      <main>
        <p>Welcome back, <strong>{userData?.email}</strong>!</p>
        
        <section style={{ marginTop: '2rem' }}>
          <ServiceEditor />
        </section>

        {/* Future expansion: <JobRequestList /> can go here to show incoming requests */}
      </main>
    </div>
  );
};