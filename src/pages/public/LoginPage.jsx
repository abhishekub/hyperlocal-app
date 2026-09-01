import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthForm } from '../../features/auth/AuthForm';
import { loginUser } from '../../services/authService';
import { getUserProfile } from '../../services/dbService';

export const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError('');

    try {
      const user = await loginUser(email, password);
      const profile = await getUserProfile(user.uid);

      if (profile?.role === 'provider') {
        navigate('/provider/dashboard');
      } else {
        navigate('/customer/home');
      }
    } catch (err) {
      console.error(err);
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tr-auth-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        .tr-auth-root, .tr-auth-root * {
          box-sizing: border-box;
        }

        .tr-auth-root {
          --brand-primary: #0F3E33;
          --brand-accent: #00D589;
          --surface-canvas: #FAFAF9;
          --surface-panel: #FFFFFF;
          --text-main: #0C1210;
          --text-muted: #57635E;
          --border-subtle: rgba(15, 62, 51, 0.08);
          --shadow-floating: 0 24px 48px -12px rgba(15, 62, 51, 0.08);
          --font-display: 'Plus Jakarta Sans', system-ui, sans-serif;
          --font-mono: 'JetBrains Mono', monospace;

          min-height: 100vh;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          font-family: var(--font-display);
          background: var(--surface-canvas);
          color: var(--text-main);
        }

        /* Left Hero / Brand Column */
        .tr-auth-stage {
          background: #0C1210;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 4rem 4.5rem;
          color: #FFFFFF;
          overflow: hidden;
        }

        .tr-stage-glow {
          position: absolute;
          width: 450px;
          height: 450px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 213, 137, 0.16) 0%, rgba(15, 62, 51, 0) 70%);
          top: -100px;
          left: -100px;
          pointer-events: none;
        }

        .tr-brand-header {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
          color: #FFFFFF;
          font-weight: 800;
          font-size: 1.4rem;
          letter-spacing: -0.04em;
          z-index: 2;
        }

        .tr-brand-pill {
          width: 9px;
          height: 9px;
          background: var(--brand-accent);
          border-radius: 50%;
          box-shadow: 0 0 12px var(--brand-accent);
        }

        .tr-stage-body {
          max-width: 480px;
          z-index: 2;
          margin: auto 0;
        }

        .tr-mesh-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.85rem;
          border-radius: 100px;
          background: rgba(0, 213, 137, 0.1);
          border: 1px solid rgba(0, 213, 137, 0.25);
          color: var(--brand-accent);
          font-family: var(--font-mono);
          font-size: 0.74rem;
          font-weight: 500;
          margin-bottom: 1.75rem;
        }

        .tr-stage-title {
          font-size: clamp(2.2rem, 3.8vw, 3.2rem);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.03em;
          margin-bottom: 1.25rem;
        }

        .tr-stage-title span {
          background: linear-gradient(135deg, #FFFFFF 0%, #A3D8A5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .tr-stage-desc {
          color: #8E9B95;
          font-size: 1.05rem;
          line-height: 1.6;
          margin-bottom: 2.25rem;
        }

        .tr-metrics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .tr-metric-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 1.25rem;
          backdrop-filter: blur(8px);
        }

        .tr-metric-val {
          font-family: var(--font-mono);
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--brand-accent);
          display: block;
          margin-bottom: 0.2rem;
        }

        .tr-metric-label {
          color: #8E9B95;
          font-size: 0.8rem;
        }

        .tr-stage-footer {
          z-index: 2;
          font-family: var(--font-mono);
          font-size: 0.74rem;
          color: #57635E;
        }

        /* Right Form Column */
        .tr-form-canvas {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3.5rem 3rem;
        }

        .tr-auth-card {
          width: 100%;
          max-width: 440px;
          background: var(--surface-panel);
          border: 1px solid var(--border-subtle);
          border-radius: 28px;
          padding: 2.5rem;
          box-shadow: var(--shadow-floating);
        }

        .tr-card-header {
          margin-bottom: 1.75rem;
        }

        .tr-card-title {
          font-size: 1.75rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--text-main);
          margin: 0 0 0.35rem;
        }

        .tr-card-subtitle {
          color: var(--text-muted);
          font-size: 0.92rem;
          margin: 0;
        }

        .tr-card-footer {
          text-align: center;
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-top: 1.75rem;
        }

        .tr-link {
          color: var(--brand-primary);
          font-weight: 700;
          text-decoration: none;
          margin-left: 0.35rem;
        }

        .tr-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 1024px) {
          .tr-auth-root {
            grid-template-columns: 1fr;
          }
          .tr-auth-stage {
            padding: 3rem 2rem;
          }
          .tr-stage-body {
            margin: 2.5rem 0;
          }
          .tr-form-canvas {
            padding: 3rem 1.5rem;
          }
        }
      `}</style>

      {/* Left Visual Column */}
      <div className="tr-auth-stage">
        <div className="tr-stage-glow"></div>

        <Link to="/" className="tr-brand-header">
          <span className="tr-brand-pill"></span>
          LocalFix
        </Link>

        <div className="tr-stage-body">
          <div className="tr-mesh-badge">Hyperlocal Session Hub</div>
          <h1 className="tr-stage-title">
            Welcome back to your <span>neighborhood.</span>
          </h1>
          <p className="tr-stage-desc">
            Sign in to check live requests, track incoming dispatches, or manage your service offerings.
          </p>

          <div className="tr-metrics-grid">
            <div className="tr-metric-card">
              <span className="tr-metric-val">0.0 km</span>
              <span className="tr-metric-label">Travel Markup Fees</span>
            </div>
            <div className="tr-metric-card">
              <span className="tr-metric-val">&lt; 15 min</span>
              <span className="tr-metric-label">Avg Arrival Proximity</span>
            </div>
          </div>
        </div>

        <div className="tr-stage-footer">
          Native Coordinate Routing Protocol
        </div>
      </div>

      {/* Right Form Column */}
      <div className="tr-form-canvas">
        <div className="tr-auth-card">
          <div className="tr-card-header">
            <h2 className="tr-card-title">Sign In</h2>
            <p className="tr-card-subtitle">Enter your verified credentials to continue</p>
          </div>

          <AuthForm
            type="login"
            onSubmit={handleLogin}
            loading={loading}
            error={error}
          />

          <p className="tr-card-footer">
            Don't have an account? 
            <Link to="/register" className="tr-link">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};