import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";

export const ProtectedRoute = () => {
  const { currentUser, loading } = useAuth();

  // Show a blank screen or a loading spinner while Firebase resolves auth state
  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading session...</div>;
  }

  // If user exists, render the child routes (Outlet), otherwise redirect
  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
};