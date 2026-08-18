import React, { useState } from 'react';

export const AuthForm = ({ type, onSubmit, loading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // Default role for registration

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'register') {
      onSubmit(email, password, role);
    } else {
      onSubmit(email, password);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <h2>{type === 'register' ? 'Create an Account' : 'Welcome Back'}</h2>
      
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label>Email:</label><br />
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        
        <div>
          <label>Password:</label><br />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        {type === 'register' && (
          <div>
            <label>I am a:</label><br />
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              style={{ width: '100%', padding: '0.5rem' }}
            >
              <option value="customer">Customer (Looking for services)</option>
              <option value="provider">Provider (Offering services)</option>
            </select>
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '0.75rem', marginTop: '1rem', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Processing...' : (type === 'register' ? 'Sign Up' : 'Log In')}
        </button>
      </form>
    </div>
  );
};