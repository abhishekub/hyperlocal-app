import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
// import { getProviderById } from '../../services/dbService';
// import { useLocationContext } from '../../contexts/LocationContext';

const MOCK_PROVIDERS = {
  '1': {
    id: '1',
    name: 'Rahul Menon',
    category: 'Home Repair',
    tagline: 'Leaks, wiring, locks — fixed before they get worse.',
    bio: 'Ten years fixing homes across Mangaluru. I carry my own tools and usually diagnose the problem before I even ring the bell. Most repair jobs are done same-day.',
    rating: 4.8,
    reviewCount: 132,
    distanceMinutes: 9,
    verified: true,
    responseTime: 'Replies in ~5 min',
    services: [
      { id: 's1', name: 'Leak Repair & Pipe Fitting', description: 'Kitchen or bathroom leak diagnosis and fix, including washer replacement.', price: 450, duration: '45–60 min' },
      { id: 's2', name: 'Electrical Point Wiring', description: 'New switch/socket install or rewiring of a faulty point.', price: 350, duration: '30–45 min' },
      { id: 's3', name: 'Door Lock Replacement', description: 'Supply and fit a new mortise or cylindrical lock.', price: 600, duration: '30 min' },
    ],
    reviews: [
      { name: 'Ananya R.', rating: 5, text: 'The geyser died at 9pm. He was here in twenty minutes and had it fixed within the hour.' },
      { name: 'Priya M.', rating: 5, text: 'Diagnosed a wiring fault two other electricians missed. Fair pricing too.' },
      { name: 'Farhan S.', rating: 4, text: 'Good work on the lock, arrived a little later than the slot but called ahead.' },
    ],
  },
};

const DEFAULT_PROVIDER = MOCK_PROVIDERS['1'];

const DATE_OPTIONS = ['Today', 'Tomorrow', 'Wed, 2 Sep'];
const TIME_SLOTS = ['9:00 AM', '11:30 AM', '2:00 PM', '4:30 PM', '6:00 PM'];

export const ProviderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [provider, setProvider] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(DATE_OPTIONS[0]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookingError, setBookingError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const data = MOCK_PROVIDERS[id] || DEFAULT_PROVIDER;
      setProvider(data);
      setSelectedServiceId(data.services[0]?.id || null);
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [id]);

  const selectedService = useMemo(
    () => provider?.services.find((s) => s.id === selectedServiceId) || null,
    [provider, selectedServiceId]
  );

  const handleBook = () => {
    if (!selectedService) { setBookingError('Choose a service to continue.'); return; }
    if (!selectedTime) { setBookingError('Pick a time slot to continue.'); return; }
    setBookingError('');

    navigate('/customer/checkout', {
      state: {
        booking: {
          provider: {
            id: provider.id,
            name: provider.name,
            category: provider.category,
            rating: provider.rating,
            reviews: provider.reviewCount,
            distanceMinutes: provider.distanceMinutes,
          },
          service: {
            name: selectedService.name,
            description: selectedService.description,
            price: selectedService.price,
            date: selectedDate,
            time: selectedTime,
          },
          address: '14, Lighthouse Hill Road, Mangaluru',
        },
      },
    });
  };

  return (
    <div className="tr-pd-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        .tr-pd-root, .tr-pd-root * {
          box-sizing: border-box;
        }

        .tr-pd-root {
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

        .tr-pd-root a { text-decoration: none; color: inherit; }
        .tr-pd-root h1, .tr-pd-root h2, .tr-pd-root h3 { margin: 0; letter-spacing: -0.03em; }
        .tr-pd-root p { margin: 0; }
        .tr-pd-root button:focus-visible, .tr-pd-root a:focus-visible { outline: 2px solid var(--brand-accent); outline-offset: 2px; }

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
          max-width: 1160px;
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
          max-width: 1160px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 5rem;
        }

        /* ------------------ Hero Card ------------------ */
        .tr-hero-card {
          display: flex;
          align-items: flex-start;
          gap: 1.75rem;
          background: var(--surface-panel);
          border: 1px solid var(--border-subtle);
          border-radius: 24px;
          padding: 2rem 2.25rem;
          margin-bottom: 2rem;
          box-shadow: var(--shadow-floating);
        }

        .tr-avatar-lg {
          width: 84px;
          height: 84px;
          border-radius: 24px;
          flex-shrink: 0;
          background: var(--surface-subtle);
          color: var(--brand-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.85rem;
          border: 1.5px solid var(--border-subtle);
        }

        .tr-hero-content {
          flex: 1;
        }

        .tr-hero-top {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 0.35rem;
        }

        .tr-provider-name {
          font-size: 1.65rem;
          font-weight: 800;
          color: var(--text-main);
        }

        .tr-verified-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--brand-primary);
          background: rgba(0, 213, 137, 0.12);
          border: 1px solid rgba(0, 213, 137, 0.25);
          padding: 0.25rem 0.65rem;
          border-radius: 100px;
        }

        .tr-provider-tagline {
          font-size: 1.05rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
          max-width: 38rem;
        }

        .tr-meta-pills {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex-wrap: wrap;
        }

        .tr-rating-badge {
          font-family: var(--font-mono);
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--brand-emerald);
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }

        .tr-distance-badge {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--brand-primary);
          background: rgba(0, 213, 137, 0.12);
          padding: 0.3rem 0.65rem;
          border-radius: 8px;
          white-space: nowrap;
        }

        .tr-response-time {
          font-family: var(--font-mono);
          font-size: 0.76rem;
          color: var(--text-muted);
        }

        /* ------------------ Layout Grid ------------------ */
        .tr-pd-grid {
          display: grid;
          grid-template-columns: 1.45fr 1fr;
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
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .tr-bio-text {
          font-size: 0.98rem;
          color: var(--text-muted);
          line-height: 1.65;
        }

        /* ------------------ Services Selector ------------------ */
        .tr-services-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .tr-service-option {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          border: 1.5px solid var(--border-subtle);
          background: var(--surface-panel);
          border-radius: 16px;
          padding: 1.2rem 1.35rem;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .tr-service-option:hover {
          border-color: var(--brand-primary);
          transform: translateY(-2px);
        }

        .tr-service-option.tr-selected {
          border-color: var(--brand-primary);
          background: rgba(0, 213, 137, 0.04);
          box-shadow: 0 0 0 3px rgba(15, 62, 51, 0.08);
        }

        .tr-service-name {
          font-weight: 700;
          font-size: 1.02rem;
          color: var(--text-main);
          margin-bottom: 0.25rem;
        }

        .tr-service-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.45;
        }

        .tr-service-duration {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--brand-primary);
          background: var(--surface-subtle);
          padding: 0.2rem 0.5rem;
          border-radius: 6px;
          margin-top: 0.6rem;
        }

        .tr-service-price {
          font-family: var(--font-mono);
          font-weight: 800;
          font-size: 1.15rem;
          color: var(--text-main);
          white-space: nowrap;
        }

        /* ------------------ Reviews ------------------ */
        .tr-review-item {
          border-top: 1px solid var(--border-subtle);
          padding: 1.15rem 0;
        }

        .tr-review-item:first-child {
          border-top: none;
          padding-top: 0;
        }

        .tr-review-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.4rem;
        }

        .tr-review-author {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-main);
        }

        .tr-review-stars {
          color: var(--brand-emerald);
          font-size: 0.85rem;
          letter-spacing: 0.1em;
        }

        .tr-review-body {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.55;
        }

        /* ------------------ Booking Sticky Sidebar ------------------ */
        .tr-booking-card {
          position: sticky;
          top: 5.5rem;
          background: var(--surface-panel);
          border: 1px solid var(--border-prominent);
          border-radius: 24px;
          padding: 1.75rem 2rem;
          box-shadow: var(--shadow-floating);
        }

        .tr-field-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 0.65rem;
        }

        .tr-chip-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.35rem;
        }

        .tr-chip-btn {
          border: 1px solid var(--border-subtle);
          background: var(--surface-subtle);
          border-radius: 12px;
          padding: 0.55rem 1rem;
          font-family: var(--font-display);
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .tr-chip-btn:hover {
          border-color: var(--brand-primary);
          color: var(--text-main);
        }

        .tr-chip-btn.tr-chip-selected {
          background: var(--brand-primary);
          border-color: var(--brand-primary);
          color: #FFFFFF;
          box-shadow: 0 4px 12px rgba(15, 62, 51, 0.15);
        }

        .tr-booking-summary {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding-top: 1.15rem;
          border-top: 1px solid var(--border-subtle);
          margin-top: 0.5rem;
          margin-bottom: 1.25rem;
        }

        .tr-summary-label {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .tr-summary-price {
          font-family: var(--font-mono);
          font-weight: 800;
          font-size: 1.4rem;
          color: var(--text-main);
        }

        .tr-book-action-btn {
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
          transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
        }

        .tr-book-action-btn:hover {
          background: #144f41;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(15, 62, 51, 0.25);
        }

        .tr-book-action-btn:active {
          transform: scale(0.99);
        }

        .tr-error-badge {
          background: var(--danger-soft);
          color: var(--danger);
          font-size: 0.85rem;
          font-weight: 600;
          border-radius: 10px;
          padding: 0.75rem 1rem;
          margin-top: 1rem;
          border: 1px solid rgba(220, 38, 38, 0.15);
        }

        /* ------------------ Skeleton Loading ------------------ */
        .tr-skeleton {
          background: linear-gradient(90deg, var(--surface-subtle) 25%, #FAFAF9 37%, var(--surface-subtle) 63%);
          background-size: 400% 100%;
          animation: shimmer 1.5s ease infinite;
          border-radius: 20px;
        }

        @keyframes shimmer {
          0% { background-position: 100% 50%; }
          100% { background-position: 0 50%; }
        }

        .tr-skeleton-hero { height: 160px; border-radius: 24px; margin-bottom: 2rem; }
        .tr-skeleton-block { height: 280px; border-radius: 24px; }

        /* ------------------ Responsive Breakpoints ------------------ */
        @media (max-width: 992px) {
          .tr-pd-grid { grid-template-columns: 1fr; }
          .tr-booking-card { position: static; }
        }

        @media (max-width: 640px) {
          .tr-hero-card { flex-direction: column; align-items: flex-start; padding: 1.5rem; }
          .tr-avatar-lg { width: 68px; height: 68px; font-size: 1.5rem; }
          .tr-service-option { flex-direction: column; }
          .tr-service-price { align-self: flex-end; }
        }
      `}</style>

      {/* Navigation */}
      <nav className="tr-navbar">
        <div className="tr-nav-row">
          <Link to="/customer/home" className="tr-nav-back">
            ← Marketplace
          </Link>
          <div className="tr-brand-logo">
            <span className="tr-brand-logo-pill"></span>
            LocalFix
          </div>
          <div style={{ width: '4rem' }} />
        </div>
      </nav>

      {/* Main Container */}
      <div className="tr-shell">
        {isLoading || !provider ? (
          <>
            <div className="tr-skeleton tr-skeleton-hero" />
            <div className="tr-pd-grid">
              <div className="tr-skeleton tr-skeleton-block" />
              <div className="tr-skeleton tr-skeleton-block" />
            </div>
          </>
        ) : (
          <>
            {/* Hero Card */}
            <div className="tr-hero-card">
              <div className="tr-avatar-lg">
                {provider.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <div className="tr-hero-content">
                <div className="tr-hero-top">
                  <span className="tr-provider-name">{provider.name}</span>
                  {provider.verified && (
                    <span className="tr-verified-pill">✓ Verified Pro</span>
                  )}
                </div>
                <p className="tr-provider-tagline">{provider.category} · {provider.tagline}</p>
                <div className="tr-meta-pills">
                  <span className="tr-rating-badge">★ {provider.rating} ({provider.reviewCount} reviews)</span>
                  <span className="tr-distance-badge">{provider.distanceMinutes} min away</span>
                  <span className="tr-response-time">{provider.responseTime}</span>
                </div>
              </div>
            </div>

            {/* Layout Grid */}
            <div className="tr-pd-grid">
              {/* Left Column */}
              <div>
                <div className="tr-card">
                  <div className="tr-card-title">About</div>
                  <p className="tr-bio-text">{provider.bio}</p>
                </div>

                <div className="tr-card">
                  <div className="tr-card-title">Choose a service</div>
                  <div className="tr-services-list">
                    {provider.services.map((service) => (
                      <div
                        key={service.id}
                        className={`tr-service-option ${selectedServiceId === service.id ? 'tr-selected' : ''}`}
                        onClick={() => setSelectedServiceId(service.id)}
                        role="radio"
                        aria-checked={selectedServiceId === service.id}
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedServiceId(service.id); }}
                      >
                        <div>
                          <div className="tr-service-name">{service.name}</div>
                          <div className="tr-service-desc">{service.description}</div>
                          <span className="tr-service-duration">⏱ {service.duration}</span>
                        </div>
                        <div className="tr-service-price">₹{service.price}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="tr-card">
                  <div className="tr-card-title">Reviews ({provider.reviewCount})</div>
                  <div>
                    {provider.reviews.map((review, idx) => (
                      <div className="tr-review-item" key={idx}>
                        <div className="tr-review-header">
                          <span className="tr-review-author">{review.name}</span>
                          <span className="tr-review-stars">{'★'.repeat(review.rating)}</span>
                        </div>
                        <p className="tr-review-body">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column (Sticky Booking Panel) */}
              <div>
                <div className="tr-booking-card">
                  <div className="tr-card-title">Book this pro</div>

                  <span className="tr-field-label">Date</span>
                  <div className="tr-chip-grid">
                    {DATE_OPTIONS.map((date) => (
                      <button
                        key={date}
                        type="button"
                        className={`tr-chip-btn ${selectedDate === date ? 'tr-chip-selected' : ''}`}
                        onClick={() => setSelectedDate(date)}
                      >
                        {date}
                      </button>
                    ))}
                  </div>

                  <span className="tr-field-label">Time</span>
                  <div className="tr-chip-grid">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        className={`tr-chip-btn ${selectedTime === slot ? 'tr-chip-selected' : ''}`}
                        onClick={() => setSelectedTime(slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>

                  <div className="tr-booking-summary">
                    <span className="tr-summary-label">Service total</span>
                    <span className="tr-summary-price">
                      {selectedService ? `₹${selectedService.price}` : '—'}
                    </span>
                  </div>

                  <button className="tr-book-action-btn" onClick={handleBook}>
                    Book Service
                  </button>

                  {bookingError && <div className="tr-error-badge">{bookingError}</div>}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};