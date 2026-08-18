import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { LocationProvider } from './context/LocationContext';

// Layouts / Guards
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { RoleRoute } from './components/layout/RoleRoute';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';

// Customer Pages
import { CustomerHomePage } from './pages/customer/CustomerHomePage';
import { ProviderDetailsPage } from './pages/customer/ProviderDetailsPage';
import { CheckoutPage } from './pages/customer/CheckoutPage';
import { CustomerOrdersPage } from './pages/customer/CustomerOrdersPage';

// Provider Pages
import { ProviderDashboardPage } from './pages/provider/ProviderDashboardPage';
import { ProviderSchedulePage } from './pages/provider/ProviderSchedulePage';
import { ProviderSettingsPage } from './pages/provider/ProviderSettingsPage';

// Shared Pages
import { ChatPage } from './pages/shared/ChatPage';
import { NotFoundPage } from './pages/shared/NotFoundPage';

const App = () => {
  return (
    <AuthProvider>
      <LocationProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes (Must be logged in) */}
            <Route element={<ProtectedRoute />}>
              
              {/* Customer Only Routes */}
              <Route element={<RoleRoute allowedRole="customer" />}>
                <Route path="/customer/home" element={<CustomerHomePage />} />
                <Route path="/customer/provider/:id" element={<ProviderDetailsPage />} />
                <Route path="/customer/checkout" element={<CheckoutPage />} />
                <Route path="/customer/orders" element={<CustomerOrdersPage />} />
              </Route>

              {/* Provider Only Routes */}
              <Route element={<RoleRoute allowedRole="provider" />}>
                <Route path="/provider/dashboard" element={<ProviderDashboardPage />} />
                <Route path="/provider/schedule" element={<ProviderSchedulePage />} />
                <Route path="/provider/settings" element={<ProviderSettingsPage />} />
              </Route>
              
              {/* Shared Protected Routes */}
              <Route path="/shared/chat" element={<ChatPage />} />
            </Route>

            {/* 404 Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </LocationProvider>
    </AuthProvider>
  );
};

export default App;