import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";

export const RoleRoute = ({ allowedRole }) => {
  const { userData, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Verifying permissions...</div>;
  }

  // If the user's role doesn't match the required role, redirect them to a safe default
  if (!userData || userData.role !== allowedRole) {
    console.warn(`Access denied. Expected ${allowedRole}, got ${userData?.role}`);
    return <Navigate to="/" replace />; // You can change this to a specific "Unauthorized" page later
  }

  return <Outlet />;
};