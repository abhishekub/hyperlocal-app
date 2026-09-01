import React, { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth';
// import { createBooking } from '../../services/dbService';

const PLATFORM_FEE_RATE = 0.05; // 5% platform service fee (0 travel surcharge)

const FALLBACK_BOOKING = {
  provider: {
    id: '1',
    name: 'Rahul Menon',
    category: 'Home Repair',
    rating: 4.8,
    reviews: 132,
    distanceMinutes: 9,
    email: 'rahul.menon@example.com',
  },
  service: {
    name: 'Leak Repair & Pipe Fitting',
    description: 'Fix kitchen sink leak, inspect connected piping, replace worn washers.',
    price: 450,
    date: 'Today',
    time: '4:30 PM',
  },
  address: '14, Lighthouse Hill Road, Mangaluru',
};

const PAYMENT_MODES = [
  { id: 'upi_on_completion', label: 'UPI upon Completion', hint: 'Scan provider QR code on-site after job is done' },
  { id: 'cash_on_completion', label: 'Cash upon Completion', hint: 'Direct cash settlement with zero middleman hold' },
];

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const routerLocation = useLocation();
  // const { currentUser } = useAuth();

  const booking = routerLocation.state?.booking || FALLBACK_BOOKING;

  const [paymentMode, setPaymentMode] = useState('upi_on_completion');
  const [notes, setNotes] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState('');

  const { serviceFee, platformFee, total } = useMemo(() => {
    const fee = booking.service.price;
    const platform = Math.round(fee * PLATFORM_FEE_RATE);
    return { serviceFee: fee, platformFee: platform, total: fee + platform };
  }, [booking.service.price]);

  const handleFinalizeBooking = async () => {
    setError('');
    setIsConfirming(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 850));
      navigate('/customer/orders', { state: { justBooked: true } });
    } catch (err) {
      console.error('Finalize booking error:', err);
      setError('Failed to dispatch booking notification. Please try again.');
      setIsConfirming(false);
    }
  };

  return (
    <div className="tr-checkout-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        .tr-checkout-root, .tr-checkout-root * {
          box-sizing: border-box;
        }

        .tr-checkout-root {
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

        .tr-checkout-root a { text-decoration: none; color: inherit; }
        .tr-checkout-root h1, .tr-checkout-root h2, .tr-checkout-root h3 { margin: 0; letter-spacing: -0.03em; }
        .tr-checkout-root p { margin: 0; }
        .tr-checkout-root button:focus-visible, .tr-checkout-root a:focus-visible, .tr-checkout-root textarea:focus-visible {
          outline: 2px solid var(--brand-accent);
          outline-offset: 2px;
        }

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
          max-width: 1100px;
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
          max-width: 1100px;
          margin: 0 auto;
          padding: 2.75rem 1.5rem 5rem;
        }

        .tr-header {
          margin-bottom: 2.25rem;
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

        /* ------------------ Layout Grid ------------------ */
        .tr-checkout-grid {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 2rem;
          align-items: start;
        }

        .tr-card {
          background: var(--surface-panel);
          border: 1px solid var(--border-subtle);
          border-radius: 24px;
          padding: 1.75rem 2rem;
          box-shadow: var(--shadow-floating);
          margin-bottom: 1.5rem;
        }

        .tr-card-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 1.25rem;
        }

        /* ------------------ Provider Meta Block ------------------ */
        .tr-provider-flex {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .tr-avatar-frame {
          width: 54px;
          height: 54px;
          border-radius: 16px;
          background: var(--surface-subtle);
          color: var(--brand-primary);
          display: grid;
          place-items: center;
          font-weight: 800;
          font-size: 1.15rem;
          border: 1.5px solid var(--border-subtle);
          flex-shrink: 0;
        }

        .tr-provider-name {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 0.2rem;
        }

        .tr-provider-meta {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.85rem;
          color: var(--text-muted);
          flex-wrap: wrap;
        }

        .tr-rating-chip {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--brand-emerald);
        }

        .tr-dist-chip {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 600;
          background: rgba(0, 213, 137, 0.12);
          color: var(--brand-primary);
          padding: 0.2rem 0.55rem;
          border-radius: 6px;
        }

        /* ------------------ Service Spec Rows ------------------ */
        .tr-service-heading {
          font-size: 1.08rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 0.35rem;
        }

        .tr-service-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
          line-height: 1.5;
        }

        .tr-spec-table {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .tr-spec-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.85rem;
          border-top: 1px solid var(--border-subtle);
          font-size: 0.92rem;
        }

        .tr-spec-row:first-child {
          border-top: none;
          padding-top: 0;
        }

        .tr-spec-k {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }

        .tr-spec-v {
          font-weight: 700;
          color: var(--text-main);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .tr-change-link {
          font-family: var(--font-mono);
          font-size: 0.74rem;
          color: var(--brand-primary);
          text-decoration: underline;
        }

        /* ------------------ Notes Input ------------------ */
        .tr-notes-input {
          width: 100%;
          min-height: 90px;
          padding: 0.85rem 1rem;
          border-radius: 14px;
          border: 1.5px solid var(--border-prominent);
          background: var(--surface-canvas);
          font-family: var(--font-display);
          font-size: 0.92rem;
          color: var(--text-main);
          outline: none;
          resize: vertical;
          transition: border-color 0.15s ease;
        }

        .tr-notes-input:focus {
          border-color: var(--brand-primary);
          background: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(15, 62, 51, 0.08);
        }

        /* ------------------ Summary & Action (Sticky) ------------------ */
        .tr-summary-sidebar {
          position: sticky;
          top: 5.5rem;
        }

        .tr-fee-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.92rem;
          color: var(--text-muted);
          padding: 0.45rem 0;
        }

        .tr-total-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          border-top: 1px solid var(--border-subtle);
          margin-top: 0.6rem;
          padding-top: 1rem;
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-main);
        }

        .tr-zero-travel-pill {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--brand-primary);
          background: rgba(0, 213, 137, 0.12);
          border-radius: 8px;
          padding: 0.45rem 0.75rem;
          margin: 1rem 0;
        }

        /* Settlement Modes */
        .tr-mode-cards {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        }

        .tr-mode-card {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          border: 1.5px solid var(--border-subtle);
          background: var(--surface-canvas);
          border-radius: 14px;
          padding: 0.85rem 1rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .tr-mode-card:hover {
          border-color: var(--brand-primary);
        }

        .tr-mode-card.selected {
          border-color: var(--brand-primary);
          background: rgba(0, 213, 137, 0.05);
          box-shadow: 0 0 0 2px rgba(15, 62, 51, 0.06);
        }

        .tr-mode-radio {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid var(--border-prominent);
          margin-top: 0.15rem;
          position: relative;
          flex-shrink: 0;
        }

        .tr-mode-card.selected .tr-mode-radio {
          border-color: var(--brand-primary);
        }

        .tr-mode-card.selected .tr-mode-radio::after {
          content: '';
          position: absolute;
          inset: 3px;
          border-radius: 50%;
          background: var(--brand-primary);
        }

        .tr-mode-title {
          font-weight: 700;
          font-size: 0.92rem;
          color: var(--text-main);
          margin-bottom: 0.15rem;
        }

        .tr-mode-hint {
          font-size: 0.78rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        /* Finalize Action Button */
        .tr-btn-finalize {
          width: 100%;
          border: none;
          border-radius: 14px;
          padding: 1rem 1.5rem;
          background: var(--brand-primary);
          color: #FFFFFF;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(15, 62, 51, 0.18);
          transition: all 0.15s ease;
        }

        .tr-btn-finalize:hover:not(:disabled) {
          background: #144f41;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(15, 62, 51, 0.25);
        }

        .tr-btn-finalize:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .tr-guarantee-note {
          text-align: center;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--text-faint);
          margin-top: 0.85rem;
        }

        .tr-error-box {
          background: var(--danger-soft);
          color: var(--danger);
          font-size: 0.85rem;
          font-weight: 600;
          border-radius: 10px;
          padding: 0.75rem 1rem;
          margin-top: 1rem;
        }

        /* ------------------ Responsive ------------------ */
        @media (max-width: 960px) {
          .tr-checkout-grid { grid-template-columns: 1fr; }
          .tr-summary-sidebar { position: static; }
        }
      `}</style>

      {/* Navigation */}
      <nav className="tr-navbar">
        <div className="tr-nav-row">
          <Link to={`/customer/provider/${booking.provider.id || '1'}`} className="tr-nav-back">
            ← Provider Details
          </Link>
          <div className="tr-brand-logo">
            <span className="tr-brand-logo-pill"></span>
            LocalFix
          </div>
          <div style={{ width: '4rem' }} />
        </div>
      </nav>

      {/* Main Container */}
      <main className="tr-shell">
        <div className="tr-header">
          <div className="tr-pill-indicator">
            Hyperlocal Dispatch Confirmation
          </div>
          <h1 className="tr-title">Finalize Booking</h1>
        </div>

        <div className="tr-checkout-grid">
          {/* Left Column: Details & Instructions */}
          <div>
            {/* Provider Card */}
            <div className="tr-card">
              <div className="tr-card-title">Assigned Local Pro</div>
              <div className="tr-provider-flex">
                <div className="tr-avatar-frame">
                  {booking.provider.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <div>
                  <div className="tr-provider-name">{booking.provider.name}</div>
                  <div className="tr-provider-meta">
                    <span>{booking.provider.category}</span>
                    <span>·</span>
                    <span className="tr-rating-chip">★ {booking.provider.rating} ({booking.provider.reviews})</span>
                    <span className="tr-dist-chip">{booking.provider.distanceMinutes} min away</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service & Time Details */}
            <div className="tr-card">
              <div className="tr-card-title">Service Details</div>
              <div className="tr-service-heading">{booking.service.name}</div>
              <p className="tr-service-desc">{booking.service.description}</p>

              <div className="tr-spec-table">
                <div className="tr-spec-row">
                  <span className="tr-spec-k">Date & Time</span>
                  <span className="tr-spec-v">
                    {booking.service.date}, {booking.service.time}
                    <Link to={`/customer/provider/${booking.provider.id || '1'}`} className="tr-change-link">Change</Link>
                  </span>
                </div>
                <div className="tr-spec-row">
                  <span className="tr-spec-k">Service Address</span>
                  <span className="tr-spec-v">
                    {booking.address}
                    <Link to="/customer/home" className="tr-change-link">Change</Link>
                  </span>
                </div>
              </div>
            </div>

            {/* On-Site Notes */}
            <div className="tr-card">
              <div className="tr-card-title">Notes for Provider (Optional)</div>
              <textarea
                className="tr-notes-input"
                placeholder="e.g. Gate code is #402, park in visitor bay, call upon arrival..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          {/* Right Column: Price Breakdown & Direct Dispatch */}
          <div className="tr-summary-sidebar">
            <div className="tr-card">
              <div className="tr-card-title">Price Breakdown</div>

              <div className="tr-fee-row">
                <span>Task Base Rate</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>₹{serviceFee}</span>
              </div>
              <div className="tr-fee-row">
                <span>Local Platform Fee (5%)</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>₹{platformFee}</span>
              </div>

              <div className="tr-zero-travel-pill">
                ✓ Zero Travel or Callout Markups
              </div>

              <div className="tr-total-row">
                <span>Estimated Total</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>₹{total}</span>
              </div>

              {/* Settlement Mode Selection */}
              <div style={{ marginTop: '1.5rem', marginBottom: '0.6rem', fontWeight: 800, fontSize: '0.92rem' }}>
                Settlement Preference
              </div>
              <div className="tr-mode-cards">
                {PAYMENT_MODES.map((mode) => (
                  <div
                    key={mode.id}
                    className={`tr-mode-card ${paymentMode === mode.id ? 'selected' : ''}`}
                    onClick={() => setPaymentMode(mode.id)}
                  >
                    <div className="tr-mode-radio" />
                    <div>
                      <div className="tr-mode-title">{mode.label}</div>
                      <div className="tr-mode-hint">{mode.hint}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Confirm & Trigger Email Dispatch */}
              <button
                className="tr-btn-finalize"
                onClick={handleFinalizeBooking}
                disabled={isConfirming}
              >
                {isConfirming ? 'Dispatching & Notifying...' : `Confirm Booking · ₹${total}`}
              </button>

              {error && <div className="tr-error-box">{error}</div>}

              <p className="tr-guarantee-note">
                An email alert will be sent instantly to the provider to accept and sync coordinates.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};