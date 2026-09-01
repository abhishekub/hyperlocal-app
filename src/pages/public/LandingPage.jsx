import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/customer/home?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/customer/home');
    }
  };

  const categories = [
    { title: 'Electrical & Plumbing', tag: 'High Demand', icon: '⚡', avgDist: '0.4 km', time: '6 min away', count: '14 active' },
    { title: 'Smart Home & Assembly', tag: 'Fast Match', icon: '🛋️', avgDist: '0.8 km', time: '9 min away', count: '8 active' },
    { title: 'Deep Cleaning & Turnover', tag: 'Instant Book', icon: '✨', avgDist: '0.2 km', time: '4 min away', count: '19 active' },
    { title: 'Appliance Repair', tag: 'Certified', icon: '🔧', avgDist: '1.1 km', time: '12 min away', count: '6 active' },
    { title: 'Moving & Heavy Transport', tag: 'Van Ready', icon: '📦', avgDist: '1.5 km', time: '15 min away', count: '11 active' },
    { title: 'Pet Sitting & Walks', tag: 'Neighborhood', icon: '🐾', avgDist: '0.3 km', time: '5 min away', count: '22 active' },
  ];

  return (
    <div className="tr-modern">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        .tr-modern, .tr-modern * {
          box-sizing: border-box;
        }

        .tr-modern {
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
          --shadow-glow: 0 0 24px -4px rgba(0, 213, 137, 0.25);
          --font-display: 'Plus Jakarta Sans', system-ui, sans-serif;
          --font-mono: 'JetBrains Mono', monospace;

          background-color: var(--surface-canvas);
          color: var(--text-main);
          font-family: var(--font-display);
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
        }

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

        .tr-btn-pill-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 1.25rem;
          font-size: 0.9rem;
          font-weight: 700;
          color: #FFFFFF;
          background: var(--brand-primary);
          text-decoration: none;
          border-radius: 100px;
          transition: transform 0.12s ease, box-shadow 0.12s ease;
        }

        .tr-btn-pill-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(15, 62, 51, 0.15);
        }

        /* ------------------ Hero Section ------------------ */
        .tr-hero-wrap {
          padding: 4.5rem 0 3.5rem;
          position: relative;
        }

        .tr-hero-layout {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 3rem;
          align-items: center;
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
          margin-bottom: 1.5rem;
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

        .tr-hero-title {
          font-size: clamp(2.5rem, 4.8vw, 3.8rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1.05;
          margin-bottom: 1.25rem;
          color: var(--text-main);
        }

        .tr-hero-title span {
          background: linear-gradient(135deg, #0F3E33 0%, #10B981 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .tr-hero-desc {
          font-size: 1.1rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 2rem;
          max-width: 500px;
        }

        .tr-omnisearch {
          background: var(--surface-panel);
          border: 1px solid var(--border-prominent);
          border-radius: 16px;
          padding: 0.5rem;
          display: flex;
          gap: 0.5rem;
          box-shadow: var(--shadow-floating);
          max-width: 520px;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .tr-omnisearch:focus-within {
          border-color: var(--brand-primary);
          box-shadow: 0 0 0 3px rgba(15, 62, 51, 0.08), var(--shadow-floating);
        }

        .tr-omnisearch input {
          flex: 1;
          border: none;
          background: transparent;
          padding: 0.75rem 1rem;
          font-size: 0.98rem;
          font-family: inherit;
          outline: none;
          color: var(--text-main);
        }

        .tr-omnisearch button {
          border: none;
          background: var(--brand-primary);
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.9rem;
          padding: 0 1.5rem;
          border-radius: 12px;
          cursor: pointer;
          transition: opacity 0.15s ease;
        }

        .tr-omnisearch button:hover {
          opacity: 0.92;
        }

        /* ------------------ Bento Live Telemetry Card ------------------ */
        .tr-radar-bento {
          background: var(--surface-panel);
          border: 1px solid var(--border-subtle);
          border-radius: 24px;
          padding: 1.75rem;
          box-shadow: var(--shadow-floating);
          position: relative;
        }

        .tr-radar-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .tr-radar-head-text {
          font-size: 0.95rem;
          font-weight: 700;
        }

        .tr-chip-geo {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--brand-primary);
          background: var(--surface-subtle);
          padding: 0.25rem 0.6rem;
          border-radius: 8px;
        }

        .tr-dispatch-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .tr-dispatch-card {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 0.9rem;
          align-items: center;
          padding: 0.9rem;
          background: var(--surface-canvas);
          border-radius: 16px;
          border: 1px solid var(--border-subtle);
          transition: transform 0.15s ease, background 0.15s ease;
          text-decoration: none;
          color: inherit;
        }

        .tr-dispatch-card:hover {
          transform: translateX(4px);
          background: var(--surface-panel);
          border-color: var(--border-prominent);
        }

        .tr-avatar-frame {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: #E5EFEA;
          color: var(--brand-primary);
          font-weight: 800;
          font-size: 0.85rem;
          display: grid;
          place-items: center;
        }

        .tr-dispatch-meta h4 {
          margin: 0 0 0.15rem;
          font-size: 0.92rem;
          font-weight: 700;
        }

        .tr-dispatch-meta p {
          margin: 0;
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .tr-dispatch-stats {
          text-align: right;
          font-family: var(--font-mono);
        }

        .tr-stat-dist {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--brand-primary);
        }

        .tr-stat-tag {
          font-size: 0.7rem;
          color: var(--text-faint);
          display: block;
        }

        /* ------------------ Bento Grid Catalog ------------------ */
        .tr-section-wrap {
          padding: 5rem 0;
        }

        .tr-section-title-wrap {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2.5rem;
        }

        .tr-section-title-wrap h2 {
          font-size: 1.85rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          margin: 0 0 0.25rem;
        }

        .tr-section-title-wrap p {
          margin: 0;
          font-size: 0.95rem;
          color: var(--text-muted);
        }

        .tr-bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }

        .tr-bento-item {
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

        .tr-bento-item:hover {
          border-color: var(--brand-primary);
          transform: translateY(-3px);
          box-shadow: var(--shadow-floating);
        }

        .tr-bento-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.25rem;
        }

        .tr-bento-icon {
          width: 48px;
          height: 48px;
          background: var(--surface-subtle);
          border-radius: 14px;
          display: grid;
          place-items: center;
          font-size: 1.4rem;
        }

        .tr-tag-status {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 600;
          color: var(--brand-primary);
          background: rgba(0, 213, 137, 0.12);
          padding: 0.3rem 0.6rem;
          border-radius: 6px;
        }

        .tr-bento-title {
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0 0 0.4rem;
          letter-spacing: -0.01em;
        }

        .tr-bento-footer {
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

        .tr-bento-eta {
          color: var(--brand-primary);
          font-weight: 700;
        }

        /* ------------------ Micro Protocol Steps ------------------ */
        .tr-steps-strip {
          background: #0C1210;
          color: #FFFFFF;
          border-radius: 28px;
          padding: 3.5rem 3rem;
          margin-bottom: 5rem;
        }

        .tr-steps-head {
          max-width: 480px;
          margin-bottom: 3rem;
        }

        .tr-steps-head h3 {
          font-size: 1.75rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 0 0 0.5rem;
        }

        .tr-steps-head p {
          color: #8E9B95;
          margin: 0;
          font-size: 0.95rem;
        }

        .tr-steps-flow {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
        }

        .tr-step-col {
          border-left: 1px solid rgba(255, 255, 255, 0.12);
          padding-left: 1.5rem;
        }

        .tr-step-col-num {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--brand-accent);
          margin-bottom: 0.75rem;
        }

        .tr-step-col h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 0.4rem;
        }

        .tr-step-col p {
          font-size: 0.88rem;
          color: #8E9B95;
          margin: 0;
          line-height: 1.5;
        }

        /* ------------------ Minimal Footer ------------------ */
        .tr-footer-clean {
          border-top: 1px solid var(--border-subtle);
          padding: 3rem 0;
          font-size: 0.85rem;
          color: var(--text-muted);
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

        /* ------------------ Responsive Breakpoints ------------------ */
        @media (max-width: 992px) {
          .tr-hero-layout { grid-template-columns: 1fr; }
          .tr-bento-grid { grid-template-columns: repeat(2, 1fr); }
          .tr-steps-flow { grid-template-columns: 1fr; gap: 2rem; }
          .tr-step-col { border-left: 2px solid rgba(255, 255, 255, 0.12); }
        }

        @media (max-width: 640px) {
          .tr-bento-grid { grid-template-columns: 1fr; }
          .tr-omnisearch { flex-direction: column; }
          .tr-omnisearch button { padding: 0.75rem; }
          .tr-steps-strip { padding: 2rem 1.5rem; }
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
            <Link to="/login" className="tr-btn-ghost">Sign In</Link>
            <Link to="/register" className="tr-btn-pill-primary">
              Become a Provider
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="tr-hero-wrap">
        <div className="tr-shell tr-hero-layout">
          <div>
            <div className="tr-pill-indicator">
              <span className="tr-pulse-signal"></span>
              Hyperlocal Mesh Active
            </div>
            <h1 className="tr-hero-title">
              Instant help from your <span>verified neighbors.</span>
            </h1>
            <p className="tr-hero-desc">
              Zero travel overhead, direct browser-calculated routing, and instant bookings dispatched across your block.
            </p>

            <form className="tr-omnisearch" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="What needs to be fixed today?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">Locate Pros</button>
            </form>
          </div>

          {/* Real-time Telemetry Bento Card */}
          <div className="tr-radar-bento">
            <div className="tr-radar-head">
              <span className="tr-radar-head-text">Live Provider Availability</span>
              <span className="tr-chip-geo">Native Geolocation</span>
            </div>

            <div className="tr-dispatch-list">
              <Link to="/customer/provider/1" className="tr-dispatch-card">
                <div className="tr-avatar-frame">AR</div>
                <div className="tr-dispatch-meta">
                  <h4>Ananya Roy</h4>
                  <p>Certified Electrician & Wiring</p>
                </div>
                <div className="tr-dispatch-stats">
                  <span className="tr-stat-dist">0.3 km</span>
                  <span className="tr-stat-tag">4 min arrival</span>
                </div>
              </Link>

              <Link to="/customer/provider/1" className="tr-dispatch-card">
                <div className="tr-avatar-frame">VS</div>
                <div className="tr-dispatch-meta">
                  <h4>Vikram Seth</h4>
                  <p>Carpentry & Furniture Assembly</p>
                </div>
                <div className="tr-dispatch-stats">
                  <span className="tr-stat-dist">0.7 km</span>
                  <span className="tr-stat-tag">8 min arrival</span>
                </div>
              </Link>

              <Link to="/customer/provider/1" className="tr-dispatch-card">
                <div className="tr-avatar-frame">MK</div>
                <div className="tr-dispatch-meta">
                  <h4>Meera Kapoor</h4>
                  <p>Deep Turnover & Organization</p>
                </div>
                <div className="tr-dispatch-stats">
                  <span className="tr-stat-dist">1.2 km</span>
                  <span className="tr-stat-tag">11 min arrival</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Bento Grid */}
      <section className="tr-section-wrap">
        <div className="tr-shell">
          <div className="tr-section-title-wrap">
            <div>
              <h2>Instant Categories</h2>
              <p>Ranked strictly by current live distance to your browser coords.</p>
            </div>
          </div>

          <div className="tr-bento-grid">
            {categories.map((cat, idx) => (
              <Link to={`/customer/home?category=${encodeURIComponent(cat.title)}`} key={idx} className="tr-bento-item">
                <div>
                  <div className="tr-bento-top">
                    <div className="tr-bento-icon">{cat.icon}</div>
                    <span className="tr-tag-status">{cat.tag}</span>
                  </div>
                  <h3 className="tr-bento-title">{cat.title}</h3>
                </div>
                <div className="tr-bento-footer">
                  <span className="tr-bento-eta">{cat.time}</span>
                  <span>{cat.count}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Protocol Strip */}
      <section className="tr-shell">
        <div className="tr-steps-strip">
          <div className="tr-steps-head">
            <h3>Engineered for low latency fulfillment</h3>
            <p>Every dispatch runs on edge location calculations without third-party transit markups.</p>
          </div>

          <div className="tr-steps-flow">
            <div className="tr-step-col">
              <div className="tr-step-col-num">01 / DISPATCH</div>
              <h4>Direct Precision</h4>
              <p>Native browser coordinates identify professionals already within walking radius.</p>
            </div>
            <div className="tr-step-col">
              <div className="tr-step-col-num">02 / CALCULATION</div>
              <h4>Haversine Proximity</h4>
              <p>Client-side spatial algorithms sort matches without reliance on external API bridges.</p>
            </div>
            <div className="tr-step-col">
              <div className="tr-step-col-num">03 / SETTLEMENT</div>
              <h4>Direct Execution</h4>
              <p>Finalize completion on-site with zero platform mileage surcharges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
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