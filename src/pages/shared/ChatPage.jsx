import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const MOCK_CONVERSATIONS = {
  o1: {
    orderId: 'o1',
    peer: {
      id: 'p1',
      name: 'Rahul Menon',
      role: 'Provider',
      avatar: 'RM',
      category: 'Home Repair',
      status: 'En route · ~6 min away',
      isOnline: true,
      serviceTitle: 'Leak Repair & Pipe Fitting',
      servicePrice: '₹473',
      address: '14, Lighthouse Hill Road, Mangaluru',
    },
    initialMessages: [
      {
        id: 'm1',
        sender: 'peer',
        text: 'Hi there! I have accepted your booking for the pipe fitting task. Packing my toolkit now.',
        time: '4:10 PM',
      },
      {
        id: 'm2',
        sender: 'user',
        text: 'Great, thanks! Please let me know if you need parking in the building.',
        time: '4:12 PM',
      },
      {
        id: 'm3',
        sender: 'peer',
        text: 'I will be on my scooter, so standard visitor parking works. Leaving my current block now!',
        time: '4:15 PM',
      },
    ],
  },
  o2: {
    orderId: 'o2',
    peer: {
      id: 'p2',
      name: 'Kavya Shetty',
      role: 'Provider',
      avatar: 'KS',
      category: 'Cleaning',
      status: 'Scheduled for Tomorrow',
      isOnline: false,
      serviceTitle: 'Deep Home Cleaning',
      servicePrice: '₹850',
      address: '14, Lighthouse Hill Road, Mangaluru',
    },
    initialMessages: [
      {
        id: 'm1',
        sender: 'peer',
        text: 'Hello! Looking forward to the deep cleaning session tomorrow morning at 10:00 AM.',
        time: 'Yesterday',
      },
    ],
  },
};

const DEFAULT_CONVERSATION = MOCK_CONVERSATIONS.o1;

const QUICK_PROMPTS = [
  'I am waiting at the gate',
  'Please call when you arrive',
  'What is your current ETA?',
  'Gate code is #402',
];

export const ChatPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { userData } = useAuth();

  const conversationData = MOCK_CONVERSATIONS[orderId] || DEFAULT_CONVERSATION;
  const [messages, setMessages] = useState(conversationData.initialMessages);
  const [inputText, setInputText] = useState('');
  const [isPeerTyping, setIsPeerTyping] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isPeerTyping]);

  const handleSendMessage = (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const newMessage = {
      id: `m_${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');

    if (conversationData.peer.isOnline) {
      setTimeout(() => {
        setIsPeerTyping(true);
      }, 700);

      setTimeout(() => {
        setIsPeerTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `m_reply_${Date.now()}`,
            sender: 'peer',
            text: 'Got it! Following the live coordinate route now.',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }, 2200);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="tr-chat-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        .tr-chat-root, .tr-chat-root * {
          box-sizing: border-box;
        }

        .tr-chat-root {
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

          height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: var(--surface-canvas);
          color: var(--text-main);
          font-family: var(--font-display);
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
          overflow: hidden;
        }

        .tr-chat-root a { text-decoration: none; color: inherit; }

        /* ------------------ Top Navigation ------------------ */
        .tr-chat-navbar {
          background: rgba(250, 250, 249, 0.9);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-subtle);
          padding: 0.875rem 1.5rem;
          flex-shrink: 0;
          z-index: 50;
        }

        .tr-nav-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1100px;
          margin: 0 auto;
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

        /* ------------------ Chat Main Container ------------------ */
        .tr-chat-layout {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 340px;
          max-width: 1100px;
          width: 100%;
          margin: 0 auto;
          overflow: hidden;
          padding: 1rem 1.5rem 1.5rem;
          gap: 1.5rem;
        }

        /* Left: Messaging Column */
        .tr-chat-pane {
          background: var(--surface-panel);
          border: 1px solid var(--border-subtle);
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: var(--shadow-floating);
        }

        /* Peer Header */
        .tr-peer-header {
          padding: 1.15rem 1.5rem;
          border-bottom: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--surface-panel);
        }

        .tr-peer-meta {
          display: flex;
          align-items: center;
          gap: 0.9rem;
        }

        .tr-avatar-wrapper {
          position: relative;
        }

        .tr-peer-avatar {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          background: var(--surface-subtle);
          color: var(--brand-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1rem;
          border: 1px solid var(--border-subtle);
        }

        .tr-online-dot {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--brand-accent);
          border: 2px solid #FFFFFF;
        }

        .tr-peer-name {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 0.15rem;
        }

        .tr-peer-status {
          font-family: var(--font-mono);
          font-size: 0.74rem;
          color: var(--brand-primary);
          font-weight: 600;
        }

        /* Messages Thread Scroll Area */
        .tr-messages-thread {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: var(--surface-canvas);
        }

        .tr-msg-row {
          display: flex;
          flex-direction: column;
          max-width: 70%;
        }

        .tr-msg-row.user {
          align-self: flex-end;
          align-items: flex-end;
        }

        .tr-msg-row.peer {
          align-self: flex-start;
          align-items: flex-start;
        }

        .tr-msg-bubble {
          padding: 0.85rem 1.15rem;
          border-radius: 18px;
          font-size: 0.93rem;
          line-height: 1.45;
          position: relative;
        }

        .tr-msg-row.user .tr-msg-bubble {
          background: var(--brand-primary);
          color: #FFFFFF;
          border-bottom-right-radius: 4px;
        }

        .tr-msg-row.peer .tr-msg-bubble {
          background: var(--surface-panel);
          color: var(--text-main);
          border: 1px solid var(--border-subtle);
          border-bottom-left-radius: 4px;
          box-shadow: 0 2px 8px rgba(15, 62, 51, 0.04);
        }

        .tr-msg-time {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--text-faint);
          margin-top: 0.35rem;
          padding: 0 0.25rem;
        }

        .tr-typing-indicator {
          font-family: var(--font-mono);
          font-size: 0.74rem;
          color: var(--brand-primary);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 0;
        }

        .tr-typing-dots {
          display: flex;
          gap: 3px;
        }

        .tr-typing-dots span {
          width: 4px;
          height: 4px;
          background: var(--brand-accent);
          border-radius: 50%;
          animation: bounce 1.2s infinite ease-in-out;
        }
        .tr-typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .tr-typing-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-4px); }
        }

        /* Quick Reply Prompt Chips */
        .tr-quick-chips {
          display: flex;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: var(--surface-panel);
          border-top: 1px solid var(--border-subtle);
          overflow-x: auto;
          white-space: nowrap;
        }

        .tr-chip-prompt {
          font-family: var(--font-display);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-muted);
          background: var(--surface-subtle);
          border: 1px solid var(--border-subtle);
          padding: 0.35rem 0.8rem;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .tr-chip-prompt:hover {
          color: var(--brand-primary);
          border-color: var(--brand-primary);
          background: rgba(0, 213, 137, 0.08);
        }

        /* Message Input Bar */
        .tr-chat-input-bar {
          padding: 1rem 1.25rem;
          background: var(--surface-panel);
          border-top: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .tr-chat-input {
          flex: 1;
          padding: 0.85rem 1.15rem;
          border-radius: 14px;
          border: 1.5px solid var(--border-prominent);
          background: var(--surface-canvas);
          font-family: var(--font-display);
          font-size: 0.92rem;
          color: var(--text-main);
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .tr-chat-input:focus {
          border-color: var(--brand-primary);
          background: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(15, 62, 51, 0.08);
        }

        .tr-chat-send-btn {
          background: var(--brand-primary);
          color: #FFFFFF;
          border: none;
          border-radius: 12px;
          padding: 0.85rem 1.35rem;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: transform 0.15s ease, background 0.15s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .tr-chat-send-btn:hover:not(:disabled) {
          background: #144f41;
          transform: translateY(-1px);
        }

        .tr-chat-send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Right: Context Sidebar */
        .tr-context-sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .tr-context-card {
          background: var(--surface-panel);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 1.35rem;
          box-shadow: var(--shadow-floating);
        }

        .tr-card-title {
          font-size: 0.92rem;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .tr-order-spec-badge {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--brand-primary);
          background: rgba(0, 213, 137, 0.12);
          padding: 0.2rem 0.5rem;
          border-radius: 6px;
        }

        .tr-spec-item {
          font-size: 0.88rem;
          margin-bottom: 0.6rem;
        }

        .tr-spec-label {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-muted);
          display: block;
          margin-bottom: 0.15rem;
        }

        .tr-spec-value {
          font-weight: 700;
          color: var(--text-main);
        }

        .tr-direct-call-btn {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border-radius: 12px;
          border: 1.5px solid var(--border-prominent);
          background: var(--surface-canvas);
          color: var(--text-main);
          font-weight: 700;
          font-size: 0.88rem;
          margin-top: 0.5rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .tr-direct-call-btn:hover {
          background: var(--surface-subtle);
          border-color: var(--brand-primary);
        }

        /* ------------------ Responsive Breakpoints ------------------ */
        @media (max-width: 880px) {
          .tr-chat-layout {
            grid-template-columns: 1fr;
          }
          .tr-context-sidebar {
            display: none;
          }
        }
      `}</style>

      {/* Top Navbar */}
      <nav className="tr-chat-navbar">
        <div className="tr-nav-row">
          <Link
            to={userData?.role === 'provider' ? '/provider/schedule' : '/customer/orders'}
            className="tr-nav-back"
          >
            ← {userData?.role === 'provider' ? 'My Schedule' : 'My Bookings'}
          </Link>
          <div className="tr-brand-logo">
            <span className="tr-brand-logo-pill"></span>
            LocalFix
          </div>
          <div style={{ width: '4rem' }} />
        </div>
      </nav>

      {/* Chat Layout Grid */}
      <div className="tr-chat-layout">
        {/* Chat Thread Panel */}
        <div className="tr-chat-pane">
          {/* Header */}
          <div className="tr-peer-header">
            <div className="tr-peer-meta">
              <div className="tr-avatar-wrapper">
                <div className="tr-peer-avatar">{conversationData.peer.avatar}</div>
                {conversationData.peer.isOnline && <span className="tr-online-dot" />}
              </div>
              <div>
                <div className="tr-peer-name">{conversationData.peer.name}</div>
                <div className="tr-peer-status">{conversationData.peer.status}</div>
              </div>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="tr-messages-thread">
            {messages.map((msg) => (
              <div key={msg.id} className={`tr-msg-row ${msg.sender}`}>
                <div className="tr-msg-bubble">{msg.text}</div>
                <span className="tr-msg-time">{msg.time}</span>
              </div>
            ))}

            {isPeerTyping && (
              <div className="tr-typing-indicator">
                {conversationData.peer.name} is typing
                <span className="tr-typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="tr-quick-chips">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                className="tr-chip-prompt"
                onClick={() => handleSendMessage(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="tr-chat-input-bar">
            <input
              type="text"
              className="tr-chat-input"
              placeholder={`Message ${conversationData.peer.name}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              className="tr-chat-send-btn"
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
            >
              Send
            </button>
          </div>
        </div>

        {/* Right Details Sidebar */}
        <div className="tr-context-sidebar">
          <div className="tr-context-card">
            <div className="tr-card-title">
              Booking Details
              <span className="tr-order-spec-badge">Order #{conversationData.orderId}</span>
            </div>

            <div className="tr-spec-item">
              <span className="tr-spec-label">Service</span>
              <span className="tr-spec-value">{conversationData.peer.serviceTitle}</span>
            </div>

            <div className="tr-spec-item">
              <span className="tr-spec-label">Total Amount</span>
              <span className="tr-spec-value" style={{ fontFamily: 'var(--font-mono)' }}>
                {conversationData.peer.servicePrice}
              </span>
            </div>

            <div className="tr-spec-item">
              <span className="tr-spec-label">Destination</span>
              <span className="tr-spec-value" style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                📍 {conversationData.peer.address}
              </span>
            </div>

            <button
              type="button"
              className="tr-direct-call-btn"
              onClick={() => alert(`Calling ${conversationData.peer.name}...`)}
            >
              📞 Call Provider
            </button>
          </div>

          <div className="tr-context-card" style={{ background: 'var(--surface-subtle)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              🔒 <strong>Local Mesh Encrypted:</strong> Direct in-browser messaging between you and your verified neighbor provider.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};