// src/pages/Home.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { AuthContext } from '../context/AuthContext'; // Import your AuthContext or state management
import './Home.css'; // Import CSS file for styling

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext); // Get authentication status from context
  const navigate = useNavigate(); // Initialize useNavigate

  const handleExploreClick = () => {
    if (isAuthenticated) {
      navigate('/job-search'); // Navigate to job search page if authenticated
    } else {
      navigate('/sign-in'); // Redirect to sign-in page if not authenticated
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Find Your Perfect Job Match</h1>
          <p>
            Unlock a world of opportunities. Our platform connects you with job roles that match your skills, experience, and passion.
          </p>
          {/* Update the button to use handleExploreClick */}
          <button onClick={handleExploreClick} className="explore-button">  
            Explore Jobs
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Use Our Platform?</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>Skill-based Matching</h3>
            <p>We use advanced algorithms to match you with jobs based on your skills and preferences.</p>
          </div>
          <div className="feature">
            <h3>Location-based Filters</h3>
            <p>Filter jobs based on location to find opportunities close to you or in your preferred cities.</p>
          </div>
          <div className="feature">
            <h3>Personalized Job Alerts</h3>
            <p>Get instant notifications when a new job that matches your profile is posted.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Create your profile today and start matching with the best job opportunities!</p>
        <Link to="/signup" className="cta-button">Sign Up Now</Link>
      </section>
    </div>
  );
};

export default Home;
