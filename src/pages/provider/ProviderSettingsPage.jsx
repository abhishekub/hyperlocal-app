import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const CATEGORIES = [
  'Home Repair',
  'Cleaning',
  'Electrical & Plumbing',
  'Pet Care',
  'Beauty & Wellness',
  'Moving & Hauling',
  'Painting & Decor',
  'Smart Home & Assembly',
];

export const ProviderSettingsPage = () => {
  const { userData } = useAuth();

  // Profile States
  const [fullName, setFullName] = useState(userData?.displayName || 'Rahul Menon');
  const [phone, setPhone] = useState('+91 98450 12345');
  const [category, setCategory] = useState('Home Repair');
  const [tagline, setTagline] = useState('Leaks, wiring, locks — fixed before they get worse.');
  const [bio, setBio] = useState(
    'Ten years fixing homes across Mangaluru. I carry my own tools and usually diagnose the problem before I even ring the bell. Most repair jobs are done same-day.'
  );

  // Service Mesh & Geolocation Radius
  const [serviceRadiusKm, setServiceRadiusKm] = useState(3.5);
  const [instantDispatchEnabled, setInstantDispatchEnabled] = useState(true);
  const [autoAcceptWithin1km, setAutoAcceptWithin1km] = useState(false);
  const [baseAddress, setBaseAddress] = useState('14, Lighthouse Hill Road, Mangaluru');

  // Payout Configuration
  const [upiId, setUpiId] = useState('rahul.menon@okhdfcbank');
  const [accountHolder, setAccountHolder] = useState('Rahul Menon');
  const [payoutSchedule, setPayoutSchedule] = useState('instant');

  // UI Feedback
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      setToastMessage('Settings successfully synced to local mesh.');
      setTimeout(() => setToastMessage(''), 3500);
    }, 600);
  };

  return (
    <div className="tr-settings-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        .tr-settings-root, .tr-settings-root * {
          box-sizing: border-box;
        }

        .tr-settings-root {
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

        .tr-settings-root a { text-decoration: none; color: inherit; }
        .tr-settings-root h1, .tr-settings-root h2, .tr-settings-root h3 { margin: 0; letter-spacing: -0.03em; }
        .tr-settings-root p { margin: 0; }

        /* ------------------ Top Navigation ------------------ */
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

        .tr-nav-back {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-muted);
          padding: 0.45rem 0.9rem;
          border-radius: 10px;
          background: var(--surface-subtle);
          transition: all 0.15s ease;
        }

        .tr-nav-back:hover {
          color: var(--text-main);
          background: #EAECE7;
        }

        .tr-brand-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 800;
          font-size: 1.2rem;
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

        /* ------------------ Page Shell ------------------ */
        .tr-shell {
          max-width: 1080px;
          margin: 0 auto;
          padding: 2.75rem 1.5rem 6rem;
        }

        .tr-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2.25rem;
          flex-wrap: wrap;
          gap: 1.25rem;
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
          font-size: 0.74rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .tr-title {
          font-size: clamp(2rem, 3.5vw, 2.5rem);
          font-weight: 800;
          color: var(--text-main);
        }

        .tr-btn-save {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--brand-primary);
          color: #FFFFFF;
          border: none;
          border-radius: 12px;
          padding: 0.75rem 1.6rem;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(15, 62, 51, 0.15);
          transition: transform 0.15s ease, background 0.15s ease;
        }

        .tr-btn-save:hover:not(:disabled) {
          background: #144f41;
          transform: translateY(-1px);
        }

        .tr-btn-save:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* ------------------ Bento Layout ------------------ */
        .tr-settings-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 1.75rem;
          align-items: start;
        }

        .tr-card {
          background: var(--surface-panel);
          border: 1px solid var(--border-subtle);
          border-radius: 24px;
          padding: 2rem;
          box-shadow: var(--shadow-floating);
          margin-bottom: 1.75rem;
        }

        .tr-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .tr-card-title {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--text-main);
        }

        /* ------------------ Inputs & Form Fields ------------------ */
        .tr-form-group {
          margin-bottom: 1.25rem;
        }

        .tr-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }

        .tr-input, .tr-textarea, .tr-select {
          width: 100%;
          padding: 0.85rem 1rem;
          border-radius: 12px;
          border: 1.5px solid var(--border-prominent);
          background: var(--surface-canvas);
          font-family: var(--font-display);
          font-size: 0.95rem;
          color: var(--text-main);
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .tr-textarea {
          min-height: 100px;
          resize: vertical;
          line-height: 1.55;
        }

        .tr-input:focus, .tr-textarea:focus, .tr-select:focus {
          border-color: var(--brand-primary);
          box-shadow: 0 0 0 3px rgba(15, 62, 51, 0.08);
          background: #FFFFFF;
        }

        .tr-grid-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        /* ------------------ Radius Slider & Telemetry ------------------ */
        .tr-slider-container {
          background: var(--surface-subtle);
          border-radius: 16px;
          padding: 1.25rem;
          margin-bottom: 1.5rem;
          border: 1px solid var(--border-subtle);
        }

        .tr-slider-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .tr-slider-val {
          font-family: var(--font-mono);
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--brand-primary);
        }

        .tr-slider {
          width: 100%;
          height: 6px;
          border-radius: 10px;
          background: #E5E7EB;
          outline: none;
          accent-color: var(--brand-primary);
          cursor: pointer;
        }

        .tr-slider-meta {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-faint);
          margin-top: 0.5rem;
        }

        /* ------------------ Toggle Switches ------------------ */
        .tr-toggle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1rem 0;
          border-bottom: 1px solid var(--border-subtle);
        }

        .tr-toggle-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .tr-toggle-text h4 {
          font-size: 0.95rem;
          font-weight: 700;
          margin: 0 0 0.2rem;
        }

        .tr-toggle-text p {
          font-size: 0.82rem;
          color: var(--text-muted);
          margin: 0;
        }

        .tr-switch-box {
          width: 44px;
          height: 24px;
          background: #E5E7EB;
          border-radius: 100px;
          position: relative;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.2s ease;
        }

        .tr-switch-box.active {
          background: var(--brand-emerald);
        }

        .tr-switch-circle {
          width: 18px;
          height: 18px;
          background: #FFFFFF;
          border-radius: 50%;
          position: absolute;
          top: 3px;
          left: 3px;
          transition: transform 0.2s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        }

        .tr-switch-box.active .tr-switch-circle {
          transform: translateX(20px);
        }

        /* ------------------ Segmented Payout Selector ------------------ */
        .tr-payout-schedule-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .tr-payout-btn {
          border: 1px solid var(--border-prominent);
          background: var(--surface-canvas);
          border-radius: 10px;
          padding: 0.6rem 0.5rem;
          font-family: var(--font-display);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: center;
        }

        .tr-payout-btn.active {
          background: var(--brand-primary);
          border-color: var(--brand-primary);
          color: #FFFFFF;
          box-shadow: 0 4px 10px rgba(15, 62, 51, 0.12);
        }

        /* ------------------ Toast Notification ------------------ */
        .tr-toast {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background: var(--brand-primary);
          color: #FFFFFF;
          padding: 0.9rem 1.5rem;
          border-radius: 14px;
          font-size: 0.9rem;
          font-weight: 700;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          gap: 0.6rem;
          z-index: 100;
          animation: slideUp 0.2s ease-out;
        }

        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* ------------------ Responsive ------------------ */
        @media (max-width: 960px) {
          .tr-settings-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 600px) {
          .tr-grid-2col { grid-template-columns: 1fr; }
          .tr-header { flex-direction: column; align-items: stretch; }
          .tr-btn-save { justify-content: center; }
        }
      `}</style>

      {/* Navigation */}
      <nav className="tr-navbar">
        <div className="tr-nav-row">
          <Link to="/provider/dashboard" className="tr-nav-back">
            ← Dashboard
          </Link>
          <div className="tr-brand-logo">
            <span className="tr-brand-logo-pill"></span>
            LocalFix
          </div>
          <div style={{ width: '4rem' }} />
        </div>
      </nav>

      {/* Main Content */}
      <main className="tr-shell">
        <form onSubmit={handleSave}>
          <div className="tr-header">
            <div>
              <div className="tr-pill-indicator">
                Provider Telemetry & Node Setup
              </div>
              <h1 className="tr-title">Business Settings</h1>
            </div>
            <button type="submit" className="tr-btn-save" disabled={isSaving}>
              {isSaving ? 'Syncing...' : 'Save Changes'}
            </button>
          </div>

          <div className="tr-settings-grid">
            {/* Left Column: Business Profile */}
            <div>
              <div className="tr-card">
                <div className="tr-card-header">
                  <div className="tr-card-title">Profile & Marketplace Display</div>
                </div>

                <div className="tr-grid-2col">
                  <div className="tr-form-group">
                    <label className="tr-label">Full Name / Trade Name</label>
                    <input
                      type="text"
                      className="tr-input"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="tr-form-group">
                    <label className="tr-label">Contact Phone</label>
                    <input
                      type="text"
                      className="tr-input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="tr-form-group">
                  <label className="tr-label">Primary Category</label>
                  <select
                    className="tr-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="tr-form-group">
                  <label className="tr-label">Short Tagline (Search View)</label>
                  <input
                    type="text"
                    className="tr-input"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="e.g. Quick on-site plumbing & diagnostics"
                    required
                  />
                </div>

                <div className="tr-form-group" style={{ marginBottom: 0 }}>
                  <label className="tr-label">About / Bio</label>
                  <textarea
                    className="tr-textarea"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Describe your background, diagnostic workflow, and tools..."
                    required
                  />
                </div>
              </div>

              {/* Payout & Settlement */}
              <div className="tr-card">
                <div className="tr-card-header">
                  <div className="tr-card-title">Settlement & Instant Payouts</div>
                </div>

                <div className="tr-grid-2col">
                  <div className="tr-form-group">
                    <label className="tr-label">UPI ID / VPA</label>
                    <input
                      type="text"
                      className="tr-input"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="name@upi"
                      required
                    />
                  </div>
                  <div className="tr-form-group">
                    <label className="tr-label">Account Name</label>
                    <input
                      type="text"
                      className="tr-input"
                      value={accountHolder}
                      onChange={(e) => setAccountHolder(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="tr-form-group" style={{ marginBottom: 0 }}>
                  <label className="tr-label">Settlement Frequency</label>
                  <div className="tr-payout-schedule-grid">
                    <button
                      type="button"
                      className={`tr-payout-btn ${payoutSchedule === 'instant' ? 'active' : ''}`}
                      onClick={() => setPayoutSchedule('instant')}
                    >
                      Instant on Job
                    </button>
                    <button
                      type="button"
                      className={`tr-payout-btn ${payoutSchedule === 'daily' ? 'active' : ''}`}
                      onClick={() => setPayoutSchedule('daily')}
                    >
                      Daily EOD
                    </button>
                    <button
                      type="button"
                      className={`tr-payout-btn ${payoutSchedule === 'weekly' ? 'active' : ''}`}
                      onClick={() => setPayoutSchedule('weekly')}
                    >
                      Weekly
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Mesh, Location & Dispatch Rules */}
            <div>
              <div className="tr-card">
                <div className="tr-card-header">
                  <div className="tr-card-title">Location & Dispatch Mesh</div>
                </div>

                <div className="tr-form-group">
                  <label className="tr-label">Base Location (Anchor)</label>
                  <input
                    type="text"
                    className="tr-input"
                    value={baseAddress}
                    onChange={(e) => setBaseAddress(e.target.value)}
                    required
                  />
                </div>

                {/* Spatial Radius Slider */}
                <div className="tr-slider-container">
                  <div className="tr-slider-header">
                    <span className="tr-label" style={{ margin: 0 }}>Service Radius</span>
                    <span className="tr-slider-val">{serviceRadiusKm} km</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="10.0"
                    step="0.5"
                    className="tr-slider"
                    value={serviceRadiusKm}
                    onChange={(e) => setServiceRadiusKm(parseFloat(e.target.value))}
                  />
                  <div className="tr-slider-meta">
                    <span>Walking (0.5 km)</span>
                    <span>Hyperlocal (3.5 km)</span>
                    <span>City (10 km)</span>
                  </div>
                </div>

                {/* Dispatch Automation Toggles */}
                <div className="tr-toggle-row">
                  <div className="tr-toggle-text">
                    <h4>Instant Dispatch Sync</h4>
                    <p>Broadcast live coordinate matches to nearby customer searches.</p>
                  </div>
                  <div
                    className={`tr-switch-box ${instantDispatchEnabled ? 'active' : ''}`}
                    onClick={() => setInstantDispatchEnabled(!instantDispatchEnabled)}
                  >
                    <div className="tr-switch-circle"></div>
                  </div>
                </div>

                <div className="tr-toggle-row">
                  <div className="tr-toggle-text">
                    <h4>Auto-Accept &lt; 1 km</h4>
                    <p>Instantly confirm jobs within 10-minute walking distance.</p>
                  </div>
                  <div
                    className={`tr-switch-box ${autoAcceptWithin1km ? 'active' : ''}`}
                    onClick={() => setAutoAcceptWithin1km(!autoAcceptWithin1km)}
                  >
                    <div className="tr-switch-circle"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>

      {/* Success Toast */}
      {toastMessage && (
        <div className="tr-toast">
          ✓ {toastMessage}
        </div>
      )}
    </div>
  );
};