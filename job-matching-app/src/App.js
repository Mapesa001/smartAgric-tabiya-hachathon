// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AgriculturalJobSearch from './pages/AgriculturalJobSearch';
import MarketInsights from './pages/MarketInsights';
import JobDetails from './pages/JobDetails';
import About from './pages/About';
import Home from './pages/Home'; // Import Home component
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <div className="content">
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<Home />} /> 
          
          {/* Other routes */}
          <Route path="/agricultural-job-search" element={<AgriculturalJobSearch />} />
          <Route path="/market-insights" element={<MarketInsights />} />
          <Route path="/job-details/:id" element={<JobDetails />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
