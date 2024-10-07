// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/disease-prediction">Disease Prediction</Link></li>
        <li><Link to="/crop-yield-prediction">Crop Yield Prediction</Link></li>
        <li><Link to="/crop-recommendation">Crop Recommendation</Link></li>
        <li><Link to="/advice">Advice</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
