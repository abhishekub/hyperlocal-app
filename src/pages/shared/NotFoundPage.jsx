import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="tr-404-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

        .tr-404-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #FAFAF9;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          color: #0C1210;
          padding: 2rem;
          text-align: center;
        }

        .tr-404-card {
          background: #FFFFFF;
          border: 1px solid rgba(15, 62, 51, 0.08);
          border-radius: 28px;
          padding: 3.5rem 2.5rem;
          max-width: 480px;
          width: 100%;
          box-shadow: 0 20px 40px -15px rgba(15, 62, 51, 0.07);
        }

        .tr-404-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          font-weight: 700;
          color: #0F3E33;
          background: rgba(0, 213, 137, 0.12);
          padding: 0.35rem 0.85rem;
          border-radius: 100px;
          display: inline-block;
          margin-bottom: 1.25rem;
        }

        .tr-404-code {
          font-size: 4rem;
          font-weight: 800;
          letter-spacing: -0.05em;
          color: #0F3E33;
          line-height: 1;
          margin-bottom: 0.75rem;
        }

        .tr-404-title {
          font-size: 1.35rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .tr-404-desc {
          font-size: 0.95rem;
          color: #57635E;
          margin-bottom: 2rem;
          line-height: 1.55;
        }

        .tr-404-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #0F3E33;
          color: #FFFFFF;
          text-decoration: none;
          padding: 0.85rem 1.6rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.95rem;
          transition: background 0.15s ease, transform 0.15s ease;
        }

        .tr-404-btn:hover {
          background: #144f41;
          transform: translateY(-2px);
        }
      `}</style>

      <div className="tr-404-card">
        <span className="tr-404-badge">Spatial Routing Exception</span>
        <div className="tr-404-code">404</div>
        <h2 className="tr-404-title">Coordinates Not Found</h2>
        <p className="tr-404-desc">
          The node or page you requested does not exist on your neighborhood mesh.
        </p>
        <Link to="/" className="tr-404-btn">
          Return to Local Hub
        </Link>
      </div>
    </div>
  );
};