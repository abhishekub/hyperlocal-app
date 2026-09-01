import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { logoutUser } from '../../services/authService';
import { ServiceEditor } from '../../features/provider/ServiceEditor';
import { JobRequestList } from '../../features/provider/JobRequestList';

const STATS = [
  { label: "Today's jobs", value: '3', trend: 'Live Mesh' },
  { label: "This week's earnings", value: '₹4,250', trend: '+18% vs last week' },
  { label: 'Rating', value: '4.8 ★', trend: '132 reviews' },
  { label: 'Avg. response time', value: '5 min', trend: 'Top 5% in area' },
];

export const ProviderDashboardPage = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [activeTab, setActiveTab] = useState('requests');

  const displayName = userData?.email?.split('@')[0] || 'there';
  const requestCount = 3;

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
    <div className="tr-pdash-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        .tr-pdash-root, .tr-pdash-root * {
          box-sizing: border-box;
        }

        .tr-pdash-root {
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
          --danger: #DC2626;
          --danger-soft: #FEF2F2;
          --font-display: 'Plus Jakarta Sans', system-ui, sans-serif;
          --font-mono: 'JetBrains Mono', monospace;

          min-height: 100vh;
          background-color: var(--surface-canvas);
          color: var(--text-main);
          font-family: var(--font-display);
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
        }

        .tr-pdash-root a { text-decoration: none; color: inherit; }
        .tr-pdash-root h1, .tr-pdash-root h2, .tr-pdash-root h3 { margin: 0; letter-spacing: -0.03em; }
        .tr-pdash-root p { margin: 0; }
        .tr-pdash-root button:focus-visible, .tr-pdash-root a:focus-visible, .tr-pdash-root input:focus-visible, .tr-pdash-root textarea:focus-visible { 
          outline: 2px solid var(--brand-accent); 
          outline-offset: 2px; 
        }

        /* ------------------ Top Navigation Bar ------------------ */
        .tr-navbar {
          position: sticky;
          top: 0;
          z-index: 50;
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
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .tr-brand-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 800;
          font-size: 1.3rem;
          letter-spacing: -0.04em;
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

        .tr-nav-link {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-muted);
          padding: 0.5rem 1rem;
          border-radius: 10px;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .tr-nav-link:hover {
          color: var(--text-main);
          background: var(--surface-subtle);
        }

        .tr-btn-logout {
          font-family: inherit;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          color: var(--text-muted);
          background: transparent;
          border: 1.5px solid var(--border-prominent);
          padding: 0.5rem 1.1rem;
          border-radius: 100px;
          transition: all 0.15s ease;
        }

        .tr-btn-logout:hover:not(:disabled) {
          border-color: #EF4444;
          color: #EF4444;
          background: #FEF2F2;
        }

        .tr-btn-logout:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* ------------------ Page Shell ------------------ */
        .tr-shell {
          max-width: 1080px;
          margin: 0 auto;
          padding: 3rem 1.5rem 5rem;
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
          font-size: 0.76rem;
          font-weight: 600;
          margin-bottom: 1rem;
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

        .tr-header-title {
          font-size: clamp(2rem, 3.8vw, 2.75rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1.1;
          color: var(--text-main);
          margin-bottom: 2rem;
          text-transform: capitalize;
        }

        .tr-header-title span {
          background: linear-gradient(135deg, #0F3E33 0%, #10B981 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* ------------------ Bento Stat Cards ------------------ */
        .tr-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }

        .tr-stat-card {
          background: var(--surface-panel);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 1.35rem 1.5rem;
          box-shadow: var(--shadow-floating);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .tr-stat-card:hover {
          transform: translateY(-2px);
          border-color: var(--brand-primary);
        }

        .tr-stat-value {
          font-family: var(--font-mono);
          font-weight: 800;
          font-size: 1.6rem;
          color: var(--text-main);
          letter-spacing: -0.02em;
          margin-bottom: 0.25rem;
        }

        .tr-stat-label {
          font-family: var(--font-mono);
          font-size: 0.74rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 0.6rem;
        }

        .tr-stat-trend {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--brand-primary);
          background: rgba(0, 213, 137, 0.12);
          padding: 0.2rem 0.55rem;
          border-radius: 6px;
          align-self: flex-start;
        }

        /* ------------------ Segmented Tabs ------------------ */
        .tr-tabs-wrap {
          display: inline-flex;
          background: var(--surface-panel);
          border: 1px solid var(--border-prominent);
          border-radius: 16px;
          padding: 0.35rem;
          margin-bottom: 2rem;
          box-shadow: var(--shadow-floating);
          gap: 0.35rem;
        }

        .tr-tab-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0.65rem 1.35rem;
          border-radius: 12px;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.92rem;
          color: var(--text-muted);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .tr-tab-btn:hover {
          color: var(--text-main);
        }

        .tr-tab-btn.tr-tab-active {
          background: var(--brand-primary);
          color: #FFFFFF;
          box-shadow: 0 4px 12px rgba(15, 62, 51, 0.15);
        }

        .tr-tab-badge {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          background: rgba(0, 213, 137, 0.15);
          color: var(--brand-primary);
          padding: 0.15rem 0.5rem;
          border-radius: 100px;
        }

        .tr-tab-btn.tr-tab-active .tr-tab-badge {
          background: rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
        }

        @media (max-width: 960px) {
          .tr-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 640px) {
          .tr-stats-grid { grid-template-columns: 1fr; }
          .tr-tabs-wrap { display: flex; width: 100%; }
          .tr-tab-btn { flex: 1; justify-content: center; padding: 0.6rem 0.5rem; }
          .tr-nav-row { padding: 0 1.25rem; }
          .tr-shell { padding: 2rem 1.25rem 4rem; }
        }
      `}</style>

      {/* Top Navbar */}
      <nav className="tr-navbar">
        <div className="tr-nav-row">
          <Link to="/" className="tr-brand-logo">
            <span className="tr-brand-logo-pill"></span>
            LocalFix
          </Link>
          <div className="tr-nav-actions">
            <Link to="/provider/schedule" className="tr-nav-link">Schedule</Link>
            <Link to="/provider/settings" className="tr-nav-link">Settings</Link>
            <button className="tr-btn-logout" onClick={handleLogout} disabled={isLoggingOut}>
              {isLoggingOut ? 'Logging out...' : 'Sign Out'}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Viewport */}
      <div className="tr-shell">
        <div className="tr-header">
          <div className="tr-pill-indicator">
            <span className="tr-pulse-signal"></span>
            Provider Command Matrix
          </div>
          <h1 className="tr-header-title">
            Welcome back, <span>{displayName}</span>
          </h1>
        </div>

        {/* Bento Stats Row */}
        <div className="tr-stats-grid">
          {STATS.map((stat) => (
            <div className="tr-stat-card" key={stat.label}>
              <div>
                <div className="tr-stat-label">{stat.label}</div>
                <div className="tr-stat-value">{stat.value}</div>
              </div>
              <div className="tr-stat-trend">{stat.trend}</div>
            </div>
          ))}
        </div>

        {/* Tab Controller */}
        <div className="tr-tabs-wrap" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'requests'}
            className={`tr-tab-btn ${activeTab === 'requests' ? 'tr-tab-active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            Job Requests
            <span className="tr-tab-badge">{requestCount}</span>
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'services'}
            className={`tr-tab-btn ${activeTab === 'services' ? 'tr-tab-active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            My Services
          </button>
        </div>

        {/* Active Feature Render */}
        {activeTab === 'requests' ? <JobRequestList /> : <ServiceEditor />}
      </div>
    </div>
  );
};