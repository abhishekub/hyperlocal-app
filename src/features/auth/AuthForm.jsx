import React, { useState } from 'react';

export const AuthForm = ({ type = 'login', onSubmit, loading = false, error = '' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    if (type === 'register') {
      onSubmit(email, password, role);
    } else {
      onSubmit(email, password);
    }
  };

  return (
    <form className="af-container" onSubmit={handleSubmit} noValidate>
      <style>{`
        .af-container {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          width: 100%;
        }

        .af-role-segment {
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: #F3F4F1;
          padding: 0.3rem;
          border-radius: 14px;
          border: 1px solid rgba(15, 62, 51, 0.08);
          margin-bottom: 0.25rem;
        }

        .af-role-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.65rem 0.5rem;
          font-family: inherit;
          font-size: 0.88rem;
          font-weight: 600;
          color: #57635E;
          background: transparent;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .af-role-btn.active {
          background: #FFFFFF;
          color: #0C1210;
          box-shadow: 0 2px 8px rgba(15, 62, 51, 0.08);
        }

        .af-role-btn svg {
          width: 16px;
          height: 16px;
          transition: transform 0.2s ease;
        }

        .af-role-btn.active svg {
          color: #0F3E33;
          transform: scale(1.05);
        }

        .af-input-field {
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .af-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          background: #FFFFFF;
          border: 1.5px solid rgba(15, 62, 51, 0.12);
          border-radius: 14px;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }

        .af-input-wrapper:hover {
          border-color: rgba(15, 62, 51, 0.25);
        }

        .af-input-wrapper:focus-within {
          border-color: #0F3E33;
          box-shadow: 0 0 0 4px rgba(0, 213, 137, 0.15);
        }

        .af-input-icon {
          padding-left: 1rem;
          color: #8E9B95;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .af-input-wrapper:focus-within .af-input-icon {
          color: #0F3E33;
        }

        .af-input {
          width: 100%;
          padding: 0.85rem 1rem;
          font-family: inherit;
          font-size: 0.95rem;
          color: #0C1210;
          background: transparent;
          border: none;
          outline: none;
        }

        .af-input::placeholder {
          color: #8E9B95;
          font-size: 0.9rem;
        }

        .af-toggle-pass {
          padding: 0.5rem 0.85rem;
          background: transparent;
          border: none;
          color: #8E9B95;
          cursor: pointer;
          font-size: 0.75rem;
          font-weight: 600;
          font-family: var(--font-mono, monospace);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .af-toggle-pass:hover {
          color: #0C1210;
        }

        .af-error-banner {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem 1rem;
          background: #FEF2F2;
          border: 1px solid #FEE2E2;
          border-radius: 12px;
          color: #991B1B;
          font-size: 0.85rem;
          font-weight: 500;
          animation: slideDown 0.2s ease-out;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .af-btn-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.9rem;
          background: #0F3E33;
          color: #FFFFFF;
          border: none;
          border-radius: 14px;
          font-family: inherit;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(15, 62, 51, 0.12);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          margin-top: 0.5rem;
        }

        .af-btn-submit:hover:not(:disabled) {
          background: #154F42;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(15, 62, 51, 0.18);
        }

        .af-btn-submit:active:not(:disabled) {
          transform: scale(0.99);
        }

        .af-btn-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .af-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #FFFFFF;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      {type === 'register' && (
        <div className="af-role-segment">
          <button
            type="button"
            className={`af-role-btn ${role === 'customer' ? 'active' : ''}`}
            onClick={() => setRole('customer')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Customer
          </button>
          <button
            type="button"
            className={`af-role-btn ${role === 'provider' ? 'active' : ''}`}
            onClick={() => setRole('provider')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
            Provider
          </button>
        </div>
      )}

      {error && (
        <div className="af-error-banner">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <div className="af-input-field">
        <div className="af-input-wrapper">
          <span className="af-input-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </span>
          <input
            type="email"
            className="af-input"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
      </div>

      <div className="af-input-field">
        <div className="af-input-wrapper">
          <span className="af-input-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>
          <input
            type={showPassword ? 'text' : 'password'}
            className="af-input"
            placeholder={type === 'register' ? 'Create a secure password' : 'Enter your password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={type === 'register' ? 'new-password' : 'current-password'}
          />
          <button
            type="button"
            className="af-toggle-pass"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      <button type="submit" className="af-btn-submit" disabled={loading}>
        {loading ? (
          <span className="af-spinner"></span>
        ) : type === 'register' ? (
          `Register as ${role === 'provider' ? 'Provider' : 'Customer'}`
        ) : (
          'Sign In to Account'
        )}
      </button>
    </form>
  );
};