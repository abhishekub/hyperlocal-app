import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthForm } from '../../features/auth/AuthForm';
import { loginUser } from '../../services/authService';
import { getUserProfile } from '../../services/dbService';

export const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError('');
    
    try {
      const user = await loginUser(email, password);
      const profile = await getUserProfile(user.uid);
      
      // Redirect based on role
      if (profile?.role === 'provider') {
        navigate('/provider/dashboard');
      } else {
        navigate('/customer/home');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AuthForm 
        type="login" 
        onSubmit={handleLogin} 
        loading={loading} 
        error={error} 
      />
      <p style={{ textAlign: 'center' }}>
        Don't have an account? <Link to="/register">Sign up here</Link>
      </p>
    </div>
  );
};