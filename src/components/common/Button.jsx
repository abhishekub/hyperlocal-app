import React from 'react';

export const Button = ({ children, onClick, type = 'button', variant = 'primary', disabled = false, style = {} }) => {
  const baseStyle = {
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.7 : 1,
    fontWeight: 'bold',
    ...style
  };

  const variants = {
    primary: { background: '#0066cc', color: '#fff' },
    secondary: { background: '#eee', color: '#333' },
    danger: { background: '#dc3545', color: '#fff' }
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} style={{ ...baseStyle, ...variants[variant] }}>
      {children}
    </button>
  );
};