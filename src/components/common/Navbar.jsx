import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
      <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#333' }}>Hyperlocal Market</Link>
      <div>
        <Link to="/shared/chat" style={{ marginRight: '1rem', textDecoration: 'none' }}>Messages</Link>
      </div>
    </nav>
  );
};