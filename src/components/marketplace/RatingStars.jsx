import React from 'react';

export const RatingStars = ({ rating = 0 }) => {
  // Simple 5-star representation
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span key={index} style={{ color: index < rating ? '#ffc107' : '#e4e5e9', fontSize: '1.2rem' }}>
      ★
    </span>
  ));

  return <div>{stars}</div>;
};