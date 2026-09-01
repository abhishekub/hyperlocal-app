import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { NearbyFeed } from '../../features/customer/NearbyFeed';
import { logoutUser } from '../../services/authService';

export const CustomerHomePage = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const displayName = userData?.email?.split('@')[0] || 'there';
  const currentAddress = '14, Lighthouse Hill Road, Mangaluru';

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutUser();
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="tr-home-modern">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        .tr-home-modern, .tr-home-modern * {
          box-sizing: border-box;
        }

        .tr-home-modern {
          --brand-primary: #0F3E33;
          --brand-accent: #00D589;
          --brand-emerald: #10B981;
          --surface-canvas: #FAFAF9;
          --surface-panel: #FFFFFF;
          --surface-subtle: #F3F4F1;
          --text-main: #0C1210;
          --text-muted: #57635E;
          --text-faint: #8E9B95;
          --border-subtle: rgba(15, 62, 51, 0.08);
          --border-prominent: rgba(15, 62, 51, 0.16);
          --shadow-floating: 0 20px 40px -15px rgba(15, 62, 51, 0.07);
          --font-display: 'Plus Jakarta Sans', system-ui, sans-serif;
          --font-mono: 'JetBrains Mono', monospace;

          min-height: 100vh;
          background-color: var(--surface-canvas);
          color: var(--text-main);
          font-family: var(--font-display);
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
        }

        .tr-home-modern a { text-decoration: none; color: inherit; }
        .tr-home-modern h1, .tr-home-modern h2, .tr-home-modern h3 { margin: 0; letter-spacing: -0.03em; }
        .tr-home-modern p { margin: 0; }

        .tr-shell {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* ------------------ Top Navigation ------------------ */
        .tr-navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(250, 250, 249, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-subtle);
          padding: 0.875rem 0;
        }

        .tr-nav-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .tr-brand-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 800;
          font-size: 1.35rem;
          letter-spacing: -0.04em;
          text-decoration: none;
          color: var(--brand-primary);
        }

        .tr-brand-logo-pill {
          width: 8px;
          height: 8px;
          background: var(--brand-accent);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--brand-accent);
        }

        .tr-nav-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .tr-btn-ghost {
          padding: 0.55rem 1.1rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-main);
          text-decoration: none;
          border-radius: 10px;
          transition: background 0.15s ease;
        }

        .tr-btn-ghost:hover {
          background: var(--surface-subtle);
        }

        .tr-btn-outline-logout {
          display: inline-flex;
          align-items: center;
          font-family: inherit;
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-muted);
          background: transparent;
          border: 1.5px solid var(--border-prominent);
          padding: 0.5rem 1.1rem;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .tr-btn-outline-logout:hover:not(:disabled) {
          border-color: #EF4444;
          color: #EF4444;
          background: #FEF2F2;
        }

        .tr-btn-outline-logout:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* ------------------ Header Shell ------------------ */
        .tr-header-section {
          padding: 3.5rem 0 2.5rem;
        }

        .tr-pill-indicator {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.85rem;
          border-radius: 100px;
          background: rgba(0, 213, 137, 0.12);
          border: 1px solid rgba(0, 213, 137, 0.25);
          color: var(--brand-primary);
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 500;
          margin-bottom: 1.25rem;
        }

        .tr-pulse-signal {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--brand-accent);
          box-shadow: 0 0 8px var(--brand-accent);
          animation: pulsePing 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes pulsePing {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.3); }
        }

        .tr-greeting-title {
          font-size: clamp(2.2rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1.1;
          color: var(--text-main);
          margin-bottom: 1rem;
        }

        .tr-greeting-title span {
          background: linear-gradient(135deg, #0F3E33 0%, #10B981 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .tr-location-bar {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: var(--surface-panel);
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          padding: 0.6rem 1rem;
          font-size: 0.9rem;
          color: var(--text-muted);
          box-shadow: var(--shadow-floating);
          margin-bottom: 2.5rem;
        }

        .tr-location-pin {
          color: var(--brand-emerald);
          font-size: 1rem;
        }

        .tr-location-change {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--brand-primary);
          background: var(--surface-subtle);
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          margin-left: 0.5rem;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .tr-location-change:hover {
          background: rgba(0, 213, 137, 0.12);
        }

        /* ------------------ Feed Controls (Used by NearbyFeed) ------------------ */
        .bw-feed-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .bw-search-wrap {
          position: relative;
          flex: 1;
          min-width: 280px;
        }

        .bw-search-icon {
          position: absolute;
          left: 1.25rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-faint);
          font-size: 1rem;
        }

        .bw-search-input {
          width: 100%;
          padding: 0.9rem 1rem 0.9rem 2.8rem;
          border-radius: 16px;
          border: 1px solid var(--border-prominent);
          background: var(--surface-panel);
          font-family: var(--font-display);
          font-size: 0.95rem;
          color: var(--text-main);
          box-shadow: var(--shadow-floating);
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .bw-search-input::placeholder { color: var(--text-faint); }

        .bw-search-input:focus {
          outline: none;
          border-color: var(--brand-primary);
          box-shadow: 0 0 0 3px rgba(15, 62, 51, 0.08), var(--shadow-floating);
        }

        .bw-sort-note {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
          white-space: nowrap;
        }

        /* ------------------ Category Chips (Used by NearbyFeed) ------------------ */
        .bw-category-chip-row {
          margin-bottom: 2.5rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
        }

        .bw-chip-row {
          display: flex;
          gap: 0.65rem;
        }

        .bw-chip {
          background: var(--surface-panel);
          border: 1px solid var(--border-subtle);
          border-radius: 100px;
          white-space: nowrap;
          padding: 0.6rem 1.25rem;
          font-family: var(--font-display);
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bw-chip:hover {
          border-color: var(--brand-primary);
          color: var(--text-main);
        }

        .bw-chip.bw-chip-selected {
          background: var(--brand-primary);
          border-color: var(--brand-primary);
          color: #FFFFFF;
          box-shadow: 0 4px 12px rgba(15, 62, 51, 0.15);
        }

        /* ------------------ Bento Cards (Used by NearbyFeed) ------------------ */
        .bw-feed-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }

        .bw-pcard {
          background: var(--surface-panel);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 1.75rem;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
          transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }

        .bw-pcard:hover {
          border-color: var(--brand-primary);
          transform: translateY(-3px);
          box-shadow: var(--shadow-floating);
        }

        .bw-pcard-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .bw-avatar {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: var(--surface-subtle);
          color: var(--brand-primary);
          font-weight: 800;
          font-size: 1rem;
          display: grid;
          place-items: center;
        }

        .bw-distance-badge {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--brand-primary);
          background: rgba(0, 213, 137, 0.12);
          padding: 0.3rem 0.6rem;
          border-radius: 6px;
          white-space: nowrap;
        }

        .bw-pcard-name {
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0 0 0.3rem;
          letter-spacing: -0.01em;
        }

        .bw-pcard-category {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-bottom: 0.75rem;
        }

        .bw-rating {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--brand-emerald);
        }

        .bw-pcard-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-subtle);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .bw-pcard-from {
          font-size: 0.75rem;
          color: var(--text-faint);
        }

        .bw-pcard-price {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.1rem;
          color: var(--text-main);
        }

        /* ------------------ Skeletons / Empty ------------------ */
        .bw-skeleton {
          background: linear-gradient(90deg, var(--surface-subtle) 25%, #FAFAF9 37%, var(--surface-subtle) 63%);
          background-size: 400% 100%;
          animation: shimmer 1.5s ease infinite;
          border-radius: 20px;
        }

        @keyframes shimmer {
          0% { background-position: 100% 50%; }
          100% { background-position: 0 50%; }
        }

        .bw-skeleton-card { height: 210px; }

        .bw-empty-state {
          text-align: center;
          padding: 5rem 2rem;
          background: var(--surface-panel);
          border: 1.5px dashed var(--border-prominent);
          border-radius: 24px;
        }

        .bw-empty-state h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .bw-empty-state p {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        /* ------------------ Minimal Footer ------------------ */
        .tr-footer-clean {
          border-top: 1px solid var(--border-subtle);
          padding: 3rem 0;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-top: 5rem;
        }

        .tr-footer-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .tr-footer-nav {
          display: flex;
          gap: 1.5rem;
        }

        .tr-footer-nav a {
          color: inherit;
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .tr-footer-nav a:hover {
          color: var(--text-main);
        }

        /* ------------------ Responsive ------------------ */
        @media (max-width: 992px) {
          .bw-feed-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 640px) {
          .tr-header-section { padding: 2rem 0 1.5rem; }
          .bw-feed-grid { grid-template-columns: 1fr; }
          .bw-feed-controls { flex-direction: column; align-items: stretch; }
          .tr-footer-row { flex-direction: column; gap: 1.25rem; text-align: center; }
        }
      `}</style>

      {/* Navigation */}
      <nav className="tr-navbar">
        <div className="tr-shell tr-nav-row">
          <Link to="/" className="tr-brand-logo">
            <span className="tr-brand-logo-pill"></span>
            LocalFix
          </Link>
          <div className="tr-nav-actions">
            <Link to="/customer/orders" className="tr-btn-ghost">My Orders</Link>
            <button className="tr-btn-outline-logout" onClick={handleLogout} disabled={isLoggingOut}>
              {isLoggingOut ? 'Logging out...' : 'Sign Out'}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Shell */}
      <main className="tr-shell">
        <div className="tr-header-section">
          <div className="tr-pill-indicator">
            <span className="tr-pulse-signal"></span>
            Hyperlocal Mesh Active
          </div>

          <h1 className="tr-greeting-title">
            Welcome, <span>{displayName}</span>
          </h1>

          <div className="tr-location-bar">
            <span className="tr-location-pin">📍</span>
            <span>{currentAddress}</span>
            <span className="tr-location-change" onClick={() => alert('GPS location re-synced.')}>Change</span>
          </div>
        </div>

        {/* Nearby Feed Integration */}
        <NearbyFeed />
      </main>

      {/* Footer */}
      <footer className="tr-footer-clean">
        <div className="tr-shell tr-footer-row">
          <div>© LocalFix Platform. Built with React & Firebase.</div>
          <div className="tr-footer-nav">
            <Link to="/customer/home">Marketplace</Link>
            <Link to="/register">Provider Enrollment</Link>
            <Link to="/login">Account Portal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};