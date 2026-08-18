import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthForm } from '../../features/auth/AuthForm';
import { registerUser } from '../../services/authService';

export const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (email, password, role) => {
    setLoading(true);
    setError('');
    
    try {
      await registerUser(email, password, role);
      
      // Redirect to appropriate home page based on selection
      if (role === 'provider') {
        navigate('/provider/dashboard');
      } else {
        navigate('/customer/home');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to create an account. ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AuthForm 
        type="register" 
        onSubmit={handleRegister} 
        loading={loading} 
        error={error} 
      />
      <p style={{ textAlign: 'center' }}>
        Already have an account? <Link to="/login">Log in here</Link>
      </p>
    </div>
  );
};