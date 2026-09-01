import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DAYS_OF_WEEK = [
  { id: 'mon', label: 'Mon', date: '1 Sep' },
  { id: 'tue', label: 'Tue', date: '2 Sep' },
  { id: 'wed', label: 'Wed', date: '3 Sep' },
  { id: 'thu', label: 'Thu', date: '4 Sep' },
  { id: 'fri', label: 'Fri', date: '5 Sep' },
  { id: 'sat', label: 'Sat', date: '6 Sep' },
  { id: 'sun', label: 'Sun', date: '7 Sep' },
];

const DEFAULT_SLOTS = [
  '09:00 AM',
  '10:30 AM',
  '12:00 PM',
  '02:00 PM',
  '03:30 PM',
  '05:00 PM',
  '06:30 PM',
];

const INITIAL_SCHEDULE = {
  mon: {
    enabled: true,
    slots: ['09:00 AM', '10:30 AM', '02:00 PM', '03:30 PM'],
    bookings: [
      { id: 'o1', time: '09:00 AM', customer: 'Ananya Roy', service: 'Leak Repair & Pipe Fitting', address: 'Flat 402, Sea View Apts', distance: '0.4 km', price: 450 },
      { id: 'o2', time: '02:00 PM', customer: 'David Kumar', service: 'Electrical Point Wiring', address: '12, Palm Grove Road', distance: '0.8 km', price: 350 },
    ],
  },
  tue: {
    enabled: true,
    slots: ['10:30 AM', '12:00 PM', '05:00 PM'],
    bookings: [
      { id: 'o3', time: '10:30 AM', customer: 'Meera Kapoor', service: 'Door Lock Replacement', address: 'Villa 7, Hill Top Colony', distance: '1.1 km', price: 600 },
    ],
  },
  wed: { enabled: true, slots: ['09:00 AM', '12:00 PM', '03:30 PM'], bookings: [] },
  thu: { enabled: true, slots: ['10:30 AM', '02:00 PM', '05:00 PM'], bookings: [] },
  fri: { enabled: true, slots: ['09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '05:00 PM'], bookings: [] },
  sat: { enabled: false, slots: [], bookings: [] },
  sun: { enabled: false, slots: [], bookings: [] },
};

export const ProviderSchedulePage = () => {
  const [selectedDay, setSelectedDay] = useState('mon');
  const [schedule, setSchedule] = useState(INITIAL_SCHEDULE);
  const [saveToast, setSaveToast] = useState(false);

  const currentDayConfig = schedule[selectedDay];

  const handleToggleDayAvailability = () => {
    setSchedule((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        enabled: !prev[selectedDay].enabled,
      },
    }));
  };

  const handleToggleSlot = (slot) => {
    setSchedule((prev) => {
      const currentSlots = prev[selectedDay].slots;
      const isSelected = currentSlots.includes(slot);
      const updatedSlots = isSelected
        ? currentSlots.filter((s) => s !== slot)
        : [...currentSlots, slot].sort();

      return {
        ...prev,
        [selectedDay]: {
          ...prev[selectedDay],
          slots: updatedSlots,
        },
      };
    });
  };

  const handleSaveSchedule = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  return (
    <div className="tr-sched-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        .tr-sched-root, .tr-sched-root * {
          box-sizing: border-box;
        }

        .tr-sched-root {
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

        .tr-sched-root a { text-decoration: none; color: inherit; }
        .tr-sched-root h1, .tr-sched-root h2, .tr-sched-root h3 { margin: 0; letter-spacing: -0.03em; }
        .tr-sched-root p { margin: 0; }

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
          padding: 2.75rem 1.5rem 5rem;
        }

        .tr-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2rem;
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
          padding: 0.75rem 1.5rem;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.92rem;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(15, 62, 51, 0.15);
          transition: transform 0.15s ease, background 0.15s ease;
        }

        .tr-btn-save:hover {
          background: #144f41;
          transform: translateY(-1px);
        }

        /* ------------------ Day Selector Carousel ------------------ */
        .tr-days-ribbon {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.75rem;
          margin-bottom: 2.25rem;
        }

        .tr-day-card {
          background: var(--surface-panel);
          border: 1.5px solid var(--border-subtle);
          border-radius: 16px;
          padding: 1.1rem 0.75rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .tr-day-card:hover {
          border-color: var(--brand-primary);
          transform: translateY(-2px);
        }

        .tr-day-card.tr-day-active {
          background: var(--brand-primary);
          border-color: var(--brand-primary);
          color: #FFFFFF;
          box-shadow: 0 8px 20px rgba(15, 62, 51, 0.18);
        }

        .tr-day-label {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .tr-day-card.tr-day-active .tr-day-label {
          color: rgba(255, 255, 255, 0.8);
        }

        .tr-day-date {
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .tr-day-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--brand-accent);
          margin-top: 0.2rem;
        }

        .tr-day-card.tr-day-inactive .tr-day-status-dot {
          background: #D1D5DB;
        }

        /* ------------------ Grid Layout ------------------ */
        .tr-schedule-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 2rem;
          align-items: start;
        }

        .tr-card {
          background: var(--surface-panel);
          border: 1px solid var(--border-subtle);
          border-radius: 24px;
          padding: 2rem;
          box-shadow: var(--shadow-floating);
        }

        .tr-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .tr-card-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-main);
        }

        .tr-switch-toggle {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
        }

        .tr-switch-box {
          width: 44px;
          height: 24px;
          background: #E5E7EB;
          border-radius: 100px;
          position: relative;
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

        /* ------------------ Time Slot Chips Grid ------------------ */
        .tr-slots-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .tr-slot-btn {
          border: 1.5px solid var(--border-prominent);
          background: var(--surface-canvas);
          border-radius: 12px;
          padding: 0.75rem 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: center;
        }

        .tr-slot-btn:hover:not(:disabled) {
          border-color: var(--brand-primary);
          color: var(--text-main);
        }

        .tr-slot-btn.tr-slot-active {
          background: rgba(0, 213, 137, 0.12);
          border-color: var(--brand-emerald);
          color: var(--brand-primary);
        }

        .tr-slot-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* ------------------ Bookings Feed Column ------------------ */
        .tr-bookings-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .tr-booking-item {
          background: var(--surface-canvas);
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          padding: 1.25rem;
          transition: transform 0.15s ease, border-color 0.15s ease;
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .tr-booking-item:hover {
          border-color: var(--brand-primary);
          transform: translateY(-2px);
        }

        .tr-booking-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .tr-booking-time {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--brand-primary);
          background: rgba(0, 213, 137, 0.12);
          padding: 0.2rem 0.55rem;
          border-radius: 6px;
        }

        .tr-booking-price {
          font-family: var(--font-mono);
          font-weight: 800;
          font-size: 1.05rem;
          color: var(--text-main);
        }

        .tr-booking-customer {
          font-weight: 700;
          font-size: 1rem;
          margin-bottom: 0.2rem;
        }

        .tr-booking-service {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }

        .tr-booking-footer {
          font-size: 0.78rem;
          color: var(--text-faint);
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px dashed var(--border-subtle);
          padding-top: 0.6rem;
          margin-top: 0.6rem;
        }

        .tr-empty-bookings {
          text-align: center;
          padding: 3.5rem 1rem;
          color: var(--text-muted);
        }

        .tr-empty-bookings-icon {
          font-size: 2rem;
          margin-bottom: 0.75rem;
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

        /* ------------------ Responsive Breakpoints ------------------ */
        @media (max-width: 960px) {
          .tr-schedule-grid { grid-template-columns: 1fr; }
          .tr-days-ribbon { grid-template-columns: repeat(4, 1fr); }
        }

        @media (max-width: 600px) {
          .tr-days-ribbon { grid-template-columns: repeat(2, 1fr); }
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

      {/* Main Container */}
      <main className="tr-shell">
        <div className="tr-header">
          <div>
            <div className="tr-pill-indicator">
              Availability & Dispatch Engine
            </div>
            <h1 className="tr-title">Manage Schedule</h1>
          </div>
          <button className="tr-btn-save" onClick={handleSaveSchedule}>
            Save Availability
          </button>
        </div>

        {/* Days of Week Selector */}
        <div className="tr-days-ribbon">
          {DAYS_OF_WEEK.map((day) => {
            const isDayEnabled = schedule[day.id].enabled;
            const hasBookings = schedule[day.id].bookings.length > 0;
            return (
              <div
                key={day.id}
                className={`tr-day-card ${selectedDay === day.id ? 'tr-day-active' : ''} ${!isDayEnabled ? 'tr-day-inactive' : ''}`}
                onClick={() => setSelectedDay(day.id)}
              >
                <span className="tr-day-label">{day.label}</span>
                <span className="tr-day-date">{day.date}</span>
                <span
                  className="tr-day-status-dot"
                  title={isDayEnabled ? (hasBookings ? 'Active Bookings' : 'Available') : 'Off'}
                />
              </div>
            );
          })}
        </div>

        {/* Configuration Grid */}
        <div className="tr-schedule-grid">
          {/* Left Column: Time Slot Editor */}
          <div className="tr-card">
            <div className="tr-card-header">
              <div className="tr-card-title">
                {DAYS_OF_WEEK.find((d) => d.id === selectedDay)?.label} Time Slots
              </div>
              <div className="tr-switch-toggle" onClick={handleToggleDayAvailability}>
                <span>{currentDayConfig.enabled ? 'Available' : 'Day Off'}</span>
                <div className={`tr-switch-box ${currentDayConfig.enabled ? 'active' : ''}`}>
                  <div className="tr-switch-circle"></div>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Select the time windows you are open to receiving dispatch bookings in your walking/driving mesh.
            </p>

            <div className="tr-slots-grid">
              {DEFAULT_SLOTS.map((slot) => {
                const isSelected = currentDayConfig.slots.includes(slot);
                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={!currentDayConfig.enabled}
                    className={`tr-slot-btn ${isSelected ? 'tr-slot-active' : ''}`}
                    onClick={() => handleToggleSlot(slot)}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-faint)', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
              💡 Native proximity routing will only direct customers matching your active time slots.
            </div>
          </div>

          {/* Right Column: Confirmed Bookings Feed */}
          <div className="tr-card">
            <div className="tr-card-header">
              <div className="tr-card-title">
                Scheduled Jobs ({currentDayConfig.bookings.length})
              </div>
            </div>

            {currentDayConfig.bookings.length === 0 ? (
              <div className="tr-empty-bookings">
                <div className="tr-empty-bookings-icon">☕</div>
                <div style={{ fontWeight: '700', marginBottom: '0.25rem', color: 'var(--text-main)' }}>
                  No scheduled jobs
                </div>
                <div style={{ fontSize: '0.88rem' }}>
                  {currentDayConfig.enabled
                    ? 'Your slots are open for nearby customers.'
                    : 'You have marked this day as off.'}
                </div>
              </div>
            ) : (
              <div className="tr-bookings-list">
                {currentDayConfig.bookings.map((booking) => (
                  <Link to={`/shared/chat/${booking.id}`} className="tr-booking-item" key={booking.id}>
                    <div className="tr-booking-top">
                      <span className="tr-booking-time">{booking.time}</span>
                      <span className="tr-booking-price">₹{booking.price}</span>
                    </div>
                    <div className="tr-booking-customer">{booking.customer}</div>
                    <div className="tr-booking-service">{booking.service}</div>
                    <div className="tr-booking-footer">
                      <span>📍 {booking.address}</span>
                      <span>⚡ {booking.distance} away · Tap to Chat</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Success Toast Notification */}
      {saveToast && (
        <div className="tr-toast">
          ✓ Availability and schedule updated!
        </div>
      )}
    </div>
  );
};