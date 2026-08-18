import React from 'react';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <div className="bw-landing">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;1,8..60,400&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .bw-landing, .bw-landing * { box-sizing: border-box; }
        .bw-landing {
          --ink: #1C2321;
          --paper: #F1F4EF;
          --paper-alt: #E7ECE3;
          --amber: #E8A33D;
          --amber-soft: #FBEBD2;
          --route: #2F6F63;
          --route-soft: #DCEAE6;
          --slate: #5B6660;
          --line: #D9E0D6;
          --line-dark: rgba(241,244,239,0.14);
          --font-display: 'Space Grotesk', sans-serif;
          --font-body: 'Source Serif 4', Georgia, serif;
          --font-mono: 'IBM Plex Mono', monospace;

          background: var(--paper);
          color: var(--ink);
          font-family: var(--font-body);
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
        }

        .bw-landing a { color: inherit; }
        .bw-landing h1, .bw-landing h2, .bw-landing h3 {
          font-family: var(--font-display);
          margin: 0;
          letter-spacing: -0.01em;
        }
        .bw-landing p { margin: 0; }

        .bw-landing a:focus-visible,
        .bw-landing button:focus-visible {
          outline: 2px solid var(--amber);
          outline-offset: 3px;
        }

        /* ---------- Nav ---------- */
        .bw-nav {
          position: sticky;
          top: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.1rem 2rem;
          background: rgba(241,244,239,0.9);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--line);
        }
        .bw-logo {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.25rem;
          letter-spacing: -0.02em;
        }
        .bw-logo span { color: var(--route); }
        .bw-nav-links { display: flex; align-items: center; gap: 0.75rem; }
        .bw-link-login {
          text-decoration: none;
          font-family: var(--font-display);
          font-size: 0.9rem;
          font-weight: 500;
          padding: 0.55rem 1.1rem;
          border-radius: 999px;
          color: var(--ink);
          transition: background 0.15s ease;
        }
        .bw-link-login:hover { background: var(--paper-alt); }
        .bw-link-signup {
          text-decoration: none;
          font-family: var(--font-display);
          font-size: 0.9rem;
          font-weight: 600;
          padding: 0.55rem 1.25rem;
          border-radius: 999px;
          background: var(--amber);
          color: var(--ink);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .bw-link-signup:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(232,163,61,0.35); }

        /* ---------- Shared section scaffolding ---------- */
        .bw-section { padding: 5.5rem 2rem; }
        .bw-section--tight { padding: 4.5rem 2rem; }
        .bw-container { max-width: 1120px; margin: 0 auto; }
        .bw-section--dark { background: var(--ink); color: var(--paper); }
        .bw-section--alt { background: var(--paper-alt); }

        .bw-eyebrow {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--route);
          margin-bottom: 1rem;
        }
        .bw-section--dark .bw-eyebrow { color: #8FBDB2; }

        .bw-section-head { max-width: 640px; margin-bottom: 3rem; }
        .bw-section-head h2 {
          font-size: clamp(1.9rem, 3vw, 2.6rem);
          font-weight: 600;
          margin-bottom: 0.9rem;
        }
        .bw-section-head p {
          font-size: 1.05rem;
          color: var(--slate);
        }
        .bw-section--dark .bw-section-head p { color: #B7C2BC; }

        /* ---------- Hero ---------- */
        .bw-hero {
          background: var(--ink);
          color: var(--paper);
          padding: 4rem 2rem 5rem;
          position: relative;
          overflow: hidden;
        }
        .bw-hero-inner {
          max-width: 1120px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 3rem;
          align-items: center;
        }
        .bw-hero h1 {
          font-size: clamp(2.4rem, 5vw, 3.75rem);
          font-weight: 700;
          line-height: 1.08;
          margin-bottom: 1.25rem;
        }
        .bw-hero .bw-lede {
          font-family: var(--font-body);
          font-size: 1.15rem;
          color: #B7C2BC;
          max-width: 34rem;
          margin-bottom: 2.25rem;
        }
        .bw-cta-row { display: flex; flex-wrap: wrap; gap: 0.9rem; }
        .bw-cta-primary {
          text-decoration: none;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1rem;
          padding: 0.9rem 1.6rem;
          border-radius: 10px;
          background: var(--amber);
          color: var(--ink);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .bw-cta-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(232,163,61,0.3); }
        .bw-cta-secondary {
          text-decoration: none;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1rem;
          padding: 0.9rem 1.6rem;
          border-radius: 10px;
          border: 1px solid var(--line-dark);
          color: var(--paper);
          transition: background 0.15s ease, border-color 0.15s ease;
        }
        .bw-cta-secondary:hover { background: rgba(241,244,239,0.08); border-color: rgba(241,244,239,0.4); }

        .bw-dial-wrap { display: flex; justify-content: center; }
        .bw-dial-caption {
          text-align: center;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #8FBDB2;
          margin-top: 0.75rem;
        }

        .bw-radar-ping {
          transform-origin: 200px 200px;
          animation: bw-ping 2.6s ease-out infinite;
        }
        .bw-pulse-dot { animation: bw-pulse 2.2s ease-in-out infinite; }
        @keyframes bw-ping {
          0% { transform: scale(0.35); opacity: 0.55; }
          100% { transform: scale(1); opacity: 0; }
        }
        @keyframes bw-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bw-radar-ping, .bw-pulse-dot { animation: none; }
        }

        /* ---------- How it works ---------- */
        .bw-steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.75rem;
        }
        .bw-step-number {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--route);
          margin-bottom: 0.9rem;
        }
        .bw-step-card h3 {
          font-size: 1.05rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .bw-step-card p {
          font-size: 0.95rem;
          color: var(--slate);
        }

        /* ---------- Categories ---------- */
        .bw-categories-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        .bw-category-card {
          background: var(--paper);
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 1.6rem;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .bw-category-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(28,35,33,0.08);
        }
        .bw-category-icon { font-size: 1.6rem; margin-bottom: 0.9rem; }
        .bw-category-card h3 { font-size: 1.05rem; font-weight: 600; margin-bottom: 0.4rem; }
        .bw-category-card p { font-size: 0.92rem; color: var(--slate); margin-bottom: 1rem; }
        .bw-category-eta {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.03em;
          background: var(--route-soft);
          color: var(--route);
          padding: 0.3rem 0.6rem;
          border-radius: 999px;
        }

        /* ---------- Trust / stats ---------- */
        .bw-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 3.5rem;
        }
        .bw-stat-number {
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 4vw, 3rem);
          font-weight: 700;
          color: var(--amber);
        }
        .bw-stat-label {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: #B7C2BC;
          margin-top: 0.5rem;
        }
        .bw-testimonial-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        .bw-testimonial-card {
          background: rgba(241,244,239,0.05);
          border: 1px solid var(--line-dark);
          border-radius: 14px;
          padding: 1.5rem;
        }
        .bw-testimonial-card p.bw-quote {
          font-size: 0.98rem;
          margin-bottom: 1rem;
        }
        .bw-testimonial-card p.bw-name {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: #8FBDB2;
        }

        /* ---------- Final CTA ---------- */
        .bw-final-cta { text-align: center; }
        .bw-final-cta h2 {
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          font-weight: 600;
          margin-bottom: 0.9rem;
        }
        .bw-final-cta p {
          font-size: 1.05rem;
          color: var(--slate);
          max-width: 34rem;
          margin: 0 auto 2rem;
        }
        .bw-final-cta .bw-cta-row { justify-content: center; }
        .bw-final-cta .bw-cta-secondary {
          border: 1px solid var(--line);
          color: var(--ink);
        }
        .bw-final-cta .bw-cta-secondary:hover { background: var(--paper-alt); }

        /* ---------- Footer ---------- */
        .bw-footer {
          background: var(--ink);
          color: var(--paper);
          padding: 4rem 2rem 2rem;
        }
        .bw-footer-grid {
          display: grid;
          grid-template-columns: 1.4fr repeat(3, 1fr);
          gap: 2.5rem;
          max-width: 1120px;
          margin: 0 auto;
        }
        .bw-footer-grid h4 {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #8FBDB2;
          margin-bottom: 1rem;
        }
        .bw-footer-grid ul { list-style: none; margin: 0; padding: 0; }
        .bw-footer-grid li { margin-bottom: 0.65rem; }
        .bw-footer-grid a { text-decoration: none; color: #D5DDD2; font-size: 0.92rem; }
        .bw-footer-grid a:hover { color: var(--paper); }
        .bw-footer-tagline { color: #9FACA5; font-size: 0.92rem; max-width: 20rem; margin-top: 0.75rem; }
        .bw-footer-bottom {
          max-width: 1120px;
          margin: 3rem auto 0;
          padding-top: 1.5rem;
          border-top: 1px solid var(--line-dark);
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: #8B968F;
        }

        /* ---------- Responsive ---------- */
        @media (max-width: 900px) {
          .bw-hero-inner { grid-template-columns: 1fr; }
          .bw-dial-wrap { order: -1; }
          .bw-steps-grid { grid-template-columns: repeat(2, 1fr); }
          .bw-categories-grid { grid-template-columns: repeat(2, 1fr); }
          .bw-stats-grid { grid-template-columns: 1fr; gap: 2.5rem; text-align: center; }
          .bw-testimonial-row { grid-template-columns: 1fr; }
          .bw-footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .bw-nav { padding: 1rem 1.25rem; }
          .bw-section, .bw-section--tight { padding: 3.5rem 1.25rem; }
          .bw-steps-grid { grid-template-columns: 1fr; }
          .bw-categories-grid { grid-template-columns: 1fr; }
          .bw-footer-grid { grid-template-columns: 1fr; gap: 2rem; }
          .bw-cta-row { flex-direction: column; align-items: stretch; }
          .bw-cta-primary, .bw-cta-secondary { text-align: center; }
        }
      `}</style>

      {/* ---------- Nav ---------- */}
      <nav className="bw-nav">
        <div className="bw-logo">Block<span>wise</span></div>
        <div className="bw-nav-links">
          <Link to="/login" className="bw-link-login">Log In</Link>
          <Link to="/register" className="bw-link-signup">Sign Up</Link>
        </div>
      </nav>

      {/* ---------- 1. Hero ---------- */}
      <section className="bw-hero">
        <div className="bw-hero-inner">
          <div>
            <span className="bw-eyebrow">Live on your block right now</span>
            <h1>Help is already on your street.</h1>
            <p className="bw-lede">
              Blockwise matches you with vetted local pros in minutes — not because
              they're the highest-rated in the city, but because they're actually
              close. No travel fees, no waiting for someone to drive across town.
            </p>
            <div className="bw-cta-row">
              <Link to="/register" className="bw-cta-primary">Get Started Free</Link>
              <Link to="/login" className="bw-cta-secondary">Log In</Link>
            </div>
          </div>

          <div>
            <div className="bw-dial-wrap">
              <svg viewBox="0 0 400 400" width="380" height="380" role="img" aria-label="Map showing nearby available professionals ranked by walking distance">
                <circle cx="200" cy="200" r="60" fill="none" stroke="rgba(220,234,230,0.16)" strokeWidth="1" />
                <circle cx="200" cy="200" r="120" fill="none" stroke="rgba(220,234,230,0.16)" strokeWidth="1" />
                <circle cx="200" cy="200" r="180" fill="none" stroke="rgba(220,234,230,0.16)" strokeWidth="1" />

                <text x="266" y="204" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#8FBDB2">5 MIN</text>
                <text x="326" y="204" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#8FBDB2">15 MIN</text>
                <text x="176" y="16" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#8FBDB2">30 MIN</text>

                <circle className="bw-radar-ping" cx="200" cy="200" r="60" fill="none" stroke="#E8A33D" strokeWidth="1.5" />

                {/* pro dots */}
                <circle className="bw-pulse-dot" cx="250" cy="150" r="5" fill="#E8A33D" />
                <text x="258" y="146" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#F1F4EF">8 min</text>

                <circle className="bw-pulse-dot" cx="140" cy="262" r="5" fill="#E8A33D" style={{ animationDelay: '0.4s' }} />
                <text x="60" y="270" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#F1F4EF">11 min</text>

                <circle className="bw-pulse-dot" cx="320" cy="262" r="5" fill="#E8A33D" style={{ animationDelay: '0.8s' }} />
                <text x="328" y="266" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#F1F4EF">17 min</text>

                <circle className="bw-pulse-dot" cx="112" cy="118" r="4.5" fill="#E8A33D" style={{ animationDelay: '1.1s' }} />
                <text x="52" y="112" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#F1F4EF">15 min</text>

                <circle className="bw-pulse-dot" cx="322" cy="336" r="4.5" fill="#E8A33D" style={{ animationDelay: '1.5s' }} />
                <text x="300" y="358" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#F1F4EF">26 min</text>

                {/* you */}
                <circle cx="200" cy="200" r="7" fill="#F1F4EF" />
                <circle cx="200" cy="200" r="7" fill="none" stroke="#1C2321" strokeWidth="1.5" />
                <text x="200" y="226" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#B7C2BC">YOU</text>
              </svg>
            </div>
            <p className="bw-dial-caption">Five pros already within 30 minutes, live</p>
          </div>
        </div>
      </section>

      {/* ---------- 2. How it works ---------- */}
      <section className="bw-section">
        <div className="bw-container">
          <div className="bw-section-head">
            <span className="bw-eyebrow">How it works</span>
            <h2>From posting the job to someone knocking on your door.</h2>
            <p>Four steps, usually under fifteen minutes.</p>
          </div>
          <div className="bw-steps-grid">
            <div className="bw-step-card">
              <div className="bw-step-number">01</div>
              <h3>Post what you need</h3>
              <p>A few lines about the job, your address, and when you need it done.</p>
            </div>
            <div className="bw-step-card">
              <div className="bw-step-number">02</div>
              <h3>Get matched by distance</h3>
              <p>Blockwise ranks pros by how close they actually are — not just star ratings.</p>
            </div>
            <div className="bw-step-card">
              <div className="bw-step-number">03</div>
              <h3>Watch them head over</h3>
              <p>A live ETA on the map, so you know exactly when to expect them.</p>
            </div>
            <div className="bw-step-card">
              <div className="bw-step-number">04</div>
              <h3>Pay when it's done</h3>
              <p>One receipt. No mileage line item, no surprise travel charge.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 3. Categories ---------- */}
      <section className="bw-section bw-section--alt">
        <div className="bw-container">
          <div className="bw-section-head">
            <span className="bw-eyebrow">What's nearby</span>
            <h2>Every kind of help, minutes from home.</h2>
            <p>Average distance shown is what customers in an active area typically see.</p>
          </div>
          <div className="bw-categories-grid">
            <div className="bw-category-card">
              <div className="bw-category-icon">🔧</div>
              <h3>Home Repair</h3>
              <p>Leaks, wiring, locks — fixed before they become a bigger problem.</p>
              <span className="bw-category-eta">~9 min away</span>
            </div>
            <div className="bw-category-card">
              <div className="bw-category-icon">🧹</div>
              <h3>Cleaning</h3>
              <p>Deep cleans and regular upkeep from people who know your block.</p>
              <span className="bw-category-eta">~7 min away</span>
            </div>
            <div className="bw-category-card">
              <div className="bw-category-icon">📚</div>
              <h3>Tutoring & Lessons</h3>
              <p>Math, music, languages — taught by someone who can actually walk over.</p>
              <span className="bw-category-eta">~11 min away</span>
            </div>
            <div className="bw-category-card">
              <div className="bw-category-icon">🐾</div>
              <h3>Pet Care</h3>
              <p>Walks, sitting, and grooming from a neighbor who already knows the dog park.</p>
              <span className="bw-category-eta">~6 min away</span>
            </div>
            <div className="bw-category-card">
              <div className="bw-category-icon">💇</div>
              <h3>Beauty & Wellness</h3>
              <p>Haircuts, massage, skincare — no salon commute required.</p>
              <span className="bw-category-eta">~10 min away</span>
            </div>
            <div className="bw-category-card">
              <div className="bw-category-icon">📦</div>
              <h3>Moving & Hauling</h3>
              <p>Furniture, appliances, junk removal, handled locally.</p>
              <span className="bw-category-eta">~14 min away</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 4. Trust / stats ---------- */}
      <section className="bw-section bw-section--dark">
        <div className="bw-container">
          <div className="bw-section-head">
            <span className="bw-eyebrow">Why it holds up</span>
            <h2>Proximity isn't a gimmick. It's the whole model.</h2>
          </div>

          <div className="bw-stats-grid">
            <div>
              <div className="bw-stat-number">94%</div>
              <div className="bw-stat-label">of jobs matched with someone under 15 minutes away</div>
            </div>
            <div>
              <div className="bw-stat-number">12,400+</div>
              <div className="bw-stat-label">verified pros active on your block</div>
            </div>
            <div>
              <div className="bw-stat-number">Zero</div>
              <div className="bw-stat-label">travel or callout fees, ever</div>
            </div>
          </div>

          <div className="bw-testimonial-row">
            <div className="bw-testimonial-card">
              <p className="bw-quote">"The geyser died at 9pm. Someone was fixing it by 9:20 — four buildings down, no callout fee."</p>
              <p className="bw-name">ANANYA R.</p>
            </div>
            <div className="bw-testimonial-card">
              <p className="bw-quote">"Found a math tutor two lanes over. My daughter walks there now instead of us driving across town."</p>
              <p className="bw-name">FARHAN S.</p>
            </div>
            <div className="bw-testimonial-card">
              <p className="bw-quote">"I compared three cleaners by distance before picking one nine minutes away. Took less time than ordering dinner."</p>
              <p className="bw-name">PRIYA M.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 5. Final CTA ---------- */}
      <section className="bw-section bw-final-cta">
        <div className="bw-container">
          <h2>Your neighborhood is already on Blockwise.</h2>
          <p>Join as a customer looking for help, or as a pro ready for work that's minutes from home.</p>
          <div className="bw-cta-row">
            <Link to="/register" className="bw-cta-primary">Sign Up</Link>
            <Link to="/login" className="bw-cta-secondary">Log In</Link>
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="bw-footer">
        <div className="bw-footer-grid">
          <div>
            <div className="bw-logo">Block<span>wise</span></div>
            <p className="bw-footer-tagline">The hyperlocal services marketplace. Not a single mile marked up.</p>
          </div>
          <div>
            <h4>For Customers</h4>
            <ul>
              <li><a href="#how-it-works">How it works</a></li>
              <li><a href="#categories">Browse categories</a></li>
              <li><a href="#safety">Safety & vetting</a></li>
              <li><a href="#pricing">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4>For Pros</h4>
            <ul>
              <li><a href="#become-a-pro">Become a pro</a></li>
              <li><a href="#earnings">Earnings calculator</a></li>
              <li><a href="#pro-app">Pro app</a></li>
              <li><a href="#community">Community</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#press">Press</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="bw-footer-bottom">
          <span>© 2026 Blockwise</span>
          <span>Privacy · Terms</span>
        </div>
      </footer>
    </div>
  );
};