import React from 'react';
import { Link } from 'react-router-dom';
import { RatingStars } from './RatingStars';

export const ProviderCard = ({ provider }) => {
  const initials = provider.name.split(' ').map((n) => n[0]).join('').slice(0, 2);

  return (
    <Link to={`/customer/provider/${provider.id}`} className="bw-pcard">
      <div className="bw-pcard-top">
        <div className="bw-avatar">{initials}</div>
        <span className="bw-distance-badge">{provider.distanceMinutes} min away</span>
      </div>
      <div className="bw-pcard-name">{provider.name}</div>
      <div className="bw-pcard-category">{provider.category}</div>
      <RatingStars rating={provider.rating} reviewCount={provider.reviewCount} />
      <div className="bw-pcard-footer">
        <span className="bw-pcard-from">From</span>
        <span className="bw-pcard-price">&#8377;{provider.startingPrice}</span>
      </div>
    </Link>
  );
};