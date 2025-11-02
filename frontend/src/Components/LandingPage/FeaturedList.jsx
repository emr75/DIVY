import React from 'react';
import { Link } from 'react-router-dom';
import '../../Pages/LandingPage.css';

export const FeaturedList = () => {
  return (
    <div className="wrapper">
      {/* For connection */}
      <h1>Featured Listing</h1>
      <ul>
        <li>Feature 1</li>
        <li>Feature 2</li>
        <li>Feature 3</li>
        <li>Feature 4</li>
        <li>Feature 5</li>
        <li>Feature 6</li>
      </ul>
    </div>
  );
};

export default FeaturedList;
