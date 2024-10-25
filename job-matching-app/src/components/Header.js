// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/market-insights">Market Insights</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/sign-in">Sign In</Link></li> {/* New Sign In link */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
