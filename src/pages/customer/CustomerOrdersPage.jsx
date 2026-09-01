import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth';
// import { getOrdersForCustomer } from '../../services/dbService';

const MOCK_ORDERS = [
  {
    id: 'o1',
    status: 'upcoming',
    provider: { id: '1', name: 'Rahul Menon', category: 'Home Repair' },
    service: 'Leak Repair & Pipe Fitting',
    date: 'Today',
    time: '4:30 PM',
    distanceMinutes: 9,
    price: 473,
  },
  {
    id: 'o2',
    status: 'upcoming',
    provider: { id: '2', name: 'Kavya Shetty', category: 'Cleaning' },
    service: 'Deep Home Cleaning',
    date: 'Tomorrow',
    time: '10:00 AM',
    distanceMinutes: 6,
    price: 850,
  },
  {
    id: 'o3',
    status: 'completed',
    provider: { id: '3', name: 'Imran Baig', category: 'Pet Care' },
    service: 'Evening Dog Walk',
    date: '24 Aug',
    time: '6:00 PM',
    distanceMinutes: 5,
    price: 200,
    rated: false,
  },
  {
    id: 'o4',
    status: 'completed',
    provider: { id: '4', name: 'Sneha Kamath', category: 'Beauty & Wellness' },
    service: 'Home Haircut',
    date: '18 Aug',
    time: '3:00 PM',
    distanceMinutes: 11,
    price: 400,
    rated: true,
  },
  {
    id: 'o5',
    status: 'cancelled',
    provider: { id: '5', name: 'Deepak Rao', category: 'Moving & Hauling' },
    service: 'Furniture Pickup',
    date: '12 Aug',
    time: '1:00 PM',
    distanceMinutes: 14,
    price: 600,
  },
];

const TABS = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
];

const STATUS_STYLES = {
  upcoming: { label: 'Upcoming', className: 'tr-status-upcoming' },
  completed: { label: 'Completed', className: 'tr-status-completed' },
  cancelled: { label: 'Cancelled', className: 'tr-status-cancelled' },
};

export const CustomerOrdersPage = () => {
  const routerLocation = useLocation();
  // const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState('upcoming');
  const [showSuccessBanner, setShowSuccessBanner] = useState(!!routerLocation.state?.justBooked);
  const orders = MOCK_ORDERS; // replace with getOrdersForCustomer(currentUser.uid)

  const filteredOrders = useMemo(
    () => orders.filter((order) => order.status === activeTab),
    [orders, activeTab]
  );

  const counts = useMemo(
    () => ({
      upcoming: orders.filter((o) => o.status === 'upcoming').length,
      completed: orders.filter((o) => o.status === 'completed').length,
      cancelled: orders.filter((o) => o.status === 'cancelled').length,
    }),
    [orders]
  );

  return (
    <div className="tr-ord-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        .tr-ord-root, .tr-ord-root * {
          box-sizing: border-box;
        }

        .tr-ord-root {
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

        .tr-ord-root a { text-decoration: none; color: inherit; }
        .tr-ord-root h1, .tr-ord-root h2, .tr-ord-root h3 { margin: 0; letter-spacing: -0.03em; }
        .tr-ord-root p { margin: 0; }
        .tr-ord-root button:focus-visible, .tr-ord-root a:focus-visible { outline: 2px solid var(--brand-accent); outline-offset: 2px; }

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
          max-width: 980px;
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
          max-width: 980px;
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

        .tr-header h1 {
          font-size: clamp(2rem, 3.5vw, 2.6rem);
          font-weight: 800;
          margin-bottom: 1.75rem;
          color: var(--text-main);
        }

        /* ------------------ Success Banner ------------------ */
        .tr-success-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          background: rgba(0, 213, 137, 0.12);
          border: 1px solid rgba(0, 213, 137, 0.35);
          color: var(--brand-primary);
          border-radius: 16px;
          padding: 1rem 1.25rem;
          margin-bottom: 2rem;
        }

        .tr-success-text {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-weight: 600;
          font-size: 0.92rem;
        }

        .tr-success-dismiss {
          background: none;
          border: none;
          color: var(--brand-primary);
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          text-decoration: underline;
        }

        /* ------------------ Modern Segmented Tabs ------------------ */
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
          padding: 0.6rem 1.25rem;
          border-radius: 12px;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.9rem;
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
          background: var(--surface-subtle);
          color: var(--text-main);
          padding: 0.15rem 0.5rem;
          border-radius: 100px;
        }

        .tr-tab-btn.tr-tab-active .tr-tab-badge {
          background: rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
        }

        /* ------------------ Order Bento Card ------------------ */
        .tr-order-list {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .tr-order-card {
          background: var(--surface-panel);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 1.5rem 1.75rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          box-shadow: var(--shadow-floating);
          transition: all 0.2s ease;
        }

        .tr-order-card:hover {
          border-color: var(--brand-primary);
          transform: translateY(-2px);
        }

        .tr-order-avatar {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          flex-shrink: 0;
          background: var(--surface-subtle);
          color: var(--brand-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.05rem;
          border: 1px solid var(--border-subtle);
        }

        .tr-order-main {
          flex: 1;
          min-width: 0;
        }

        .tr-order-top-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 0.35rem;
        }

        .tr-order-service {
          font-weight: 700;
          font-size: 1.05rem;
          color: var(--text-main);
        }

        .tr-status-badge {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 0.25rem 0.65rem;
          border-radius: 8px;
          white-space: nowrap;
        }

        .tr-status-upcoming {
          background: rgba(232, 163, 61, 0.15);
          color: #B45309;
        }

        .tr-status-completed {
          background: rgba(0, 213, 137, 0.14);
          color: var(--brand-primary);
        }

        .tr-status-cancelled {
          background: var(--danger-soft);
          color: var(--danger);
        }

        .tr-order-meta {
          font-size: 0.88rem;
          color: var(--text-muted);
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          align-items: center;
        }

        .tr-order-meta-dot {
          color: var(--text-faint);
        }

        .tr-distance-badge {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 600;
          background: var(--surface-subtle);
          color: var(--brand-primary);
          padding: 0.2rem 0.55rem;
          border-radius: 6px;
          white-space: nowrap;
        }

        .tr-order-side {
          text-align: right;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.6rem;
        }

        .tr-order-price {
          font-family: var(--font-mono);
          font-weight: 800;
          font-size: 1.15rem;
          color: var(--text-main);
        }

        .tr-order-action {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.85rem;
          text-decoration: none;
          padding: 0.5rem 1.1rem;
          border-radius: 10px;
          border: 1px solid var(--border-prominent);
          color: var(--text-main);
          background: var(--surface-panel);
          transition: all 0.15s ease;
        }

        .tr-order-action:hover {
          background: var(--surface-subtle);
          border-color: var(--brand-primary);
        }

        .tr-order-action.tr-action-primary {
          background: var(--brand-primary);
          border-color: var(--brand-primary);
          color: #FFFFFF;
          box-shadow: 0 4px 12px rgba(15, 62, 51, 0.15);
        }

        .tr-order-action.tr-action-primary:hover {
          background: #144f41;
        }

        /* ------------------ Empty State ------------------ */
        .tr-empty-state {
          text-align: center;
          padding: 5rem 2rem;
          background: var(--surface-panel);
          border: 1.5px dashed var(--border-prominent);
          border-radius: 24px;
        }

        .tr-empty-state h3 {
          font-size: 1.3rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .tr-empty-state p {
          color: var(--text-muted);
          font-size: 0.95rem;
          margin-bottom: 1.75rem;
        }

        .tr-empty-cta {
          display: inline-flex;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.92rem;
          padding: 0.75rem 1.6rem;
          border-radius: 12px;
          background: var(--brand-primary);
          color: #FFFFFF;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .tr-empty-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(15, 62, 51, 0.2);
        }

        /* ------------------ Responsive Breakpoints ------------------ */
        @media (max-width: 680px) {
          .tr-order-card {
            flex-direction: column;
            align-items: flex-start;
          }
          .tr-order-side {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin-top: 0.75rem;
            padding-top: 0.75rem;
            border-top: 1px solid var(--border-subtle);
          }
          .tr-tabs-wrap {
            display: flex;
            width: 100%;
          }
          .tr-tab-btn {
            flex: 1;
            justify-content: center;
            padding: 0.55rem 0.5rem;
          }
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
        <div className="tr-header">
          <div className="tr-pill-indicator">
            Active Bookings Hub
          </div>
          <h1>My Orders</h1>
        </div>

        {showSuccessBanner && (
          <div className="tr-success-banner">
            <span className="tr-success-text">
              ✓ Booking confirmed — your pro will be notified directly.
            </span>
            <button className="tr-success-dismiss" onClick={() => setShowSuccessBanner(false)}>
              Dismiss
            </button>
          </div>
        )}

        {/* Segmented Tab Controller */}
        <div className="tr-tabs-wrap" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`tr-tab-btn ${activeTab === tab.id ? 'tr-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              <span className="tr-tab-badge">{counts[tab.id]}</span>
            </button>
          ))}
        </div>

        {/* Orders Feed */}
        {filteredOrders.length === 0 ? (
          <div className="tr-empty-state">
            <h3>No {activeTab} orders</h3>
            <p>
              {activeTab === 'upcoming'
                ? "You don't have anything booked right now."
                : `You have no ${activeTab} bookings yet.`}
            </p>
            <Link to="/customer/home" className="tr-empty-cta">Browse nearby pros</Link>
          </div>
        ) : (
          <div className="tr-order-list">
            {filteredOrders.map((order) => (
              <div className="tr-order-card" key={order.id}>
                <div className="tr-order-avatar">
                  {order.provider.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </div>

                <div className="tr-order-main">
                  <div className="tr-order-top-row">
                    <span className="tr-order-service">{order.service}</span>
                    <span className={`tr-status-badge ${STATUS_STYLES[order.status].className}`}>
                      {STATUS_STYLES[order.status].label}
                    </span>
                  </div>
                  <div className="tr-order-meta">
                    <span>{order.provider.name}</span>
                    <span className="tr-order-meta-dot">·</span>
                    <span>{order.date}, {order.time}</span>
                    <span className="tr-distance-badge">{order.distanceMinutes} min away</span>
                  </div>
                </div>

                <div className="tr-order-side">
                  <span className="tr-order-price">₹{order.price}</span>
                  {order.status === 'upcoming' && (
                    <Link to={`/shared/chat/${order.id}`} className="tr-order-action">
                      Message
                    </Link>
                  )}
                  {order.status === 'completed' && !order.rated && (
                    <button
                      type="button"
                      className="tr-order-action tr-action-primary"
                      onClick={() => alert(`Review submitted for ${order.provider.name}!`)}
                    >
                      Rate
                    </button>
                  )}
                  {order.status === 'completed' && order.rated && (
                    <span className="tr-order-action" style={{ cursor: 'default', opacity: 0.7 }}>
                      Rated ★
                    </span>
                  )}
                  {order.status === 'cancelled' && (
                    <Link to={`/customer/provider/${order.provider.id || '1'}`} className="tr-order-action">
                      Rebook
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};