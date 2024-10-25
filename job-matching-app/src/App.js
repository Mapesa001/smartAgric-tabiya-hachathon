// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AgriculturalJobSearch from './pages/AgriculturalJobSearch';
import MarketInsights from './pages/MarketInsights';
import JobDetails from './pages/JobDetails';
import About from './pages/About';
import Home from './pages/Home';
import SignIn from './pages/SignIn'; // Import SignIn component
import Profile from './pages/Profile'; // Import Profile component
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <div className="content">
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<Home />} />

          {/* Job Search route */}
          <Route path="/job-search" element={<AgriculturalJobSearch />} />

          {/* Market Insights route */}
          <Route path="/market-insights" element={<MarketInsights />} />

          {/* Job Details route */}
          <Route path="/job-details/:id" element={<JobDetails />} />

          {/* About route */}
          <Route path="/about" element={<About />} />

          {/* Sign In route */}
          <Route path="/sign-in" element={<SignIn />} />

          {/* Profile route with username parameter */}
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
