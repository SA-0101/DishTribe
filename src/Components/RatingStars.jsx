// RatingStars.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fullStar, faStarHalfAlt as halfStar, faStar as emptyStar } from '@fortawesome/free-solid-svg-icons';

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const stars = [];

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FontAwesomeIcon icon={fullStar} key={`full-${i}`} className="text-yellow-400" />);
  }

  // Half star
  if (hasHalfStar) {
    stars.push(<FontAwesomeIcon icon={halfStar} key="half" className="text-yellow-400" />);
  }

  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FontAwesomeIcon icon={fullStar} key={`empty-${i}`} className="text-gray-300" />);
  }

  return <div className="flex gap-1">{stars}</div>;
};

export default RatingStars;
