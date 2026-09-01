import React from 'react';

/**
 * Renders a compact "★ 4.8 (132)" style rating.
 * Pure presentational — styling comes from the bw-rating class
 * defined in the page-level stylesheet (see CustomerHomePage.jsx).
 */
export const RatingStars = ({ rating, reviewCount, showCount = true }) => {
  if (rating == null) return null;

  return (
    <span className="bw-rating">
      &#9733; {rating.toFixed(1)}
      {showCount && reviewCount != null && ` (${reviewCount})`}
    </span>
  );
};