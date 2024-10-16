// src/pages/AgriculturalJobSearch.js
import React, { useState } from 'react';
import './AgriculturalJobSearch.css'; // Ensure you have a CSS file for styling

const AgriculturalJobSearch = () => {
  // Hardcoded job listings for demonstration
  const jobs = [
    {
      id: 1,
      title: 'Farm Manager',
      company: 'Green Farms Ltd.',
      location: 'Nakuru, Kenya',
      description: 'Manage daily operations on the farm, including planting, harvesting, and employee management.',
      skills: ['management', 'leadership', 'agriculture'],
    },
    {
      id: 2,
      title: 'Agricultural Engineer',
      company: 'AgriTech Solutions',
      location: 'Nairobi, Kenya',
      description: 'Design and develop agricultural machinery and equipment.',
      skills: ['engineering', 'design', 'innovation'],
    },
    {
      id: 3,
      title: 'Crop Scientist',
      company: 'Food Security Agency',
      location: 'Eldoret, Kenya',
      description: 'Conduct research on crop production and sustainable farming practices.',
      skills: ['research', 'agriculture', 'biology'],
    },
    {
      id: 4,
      title: 'Agronomy Consultant',
      company: 'Harvest Consultants',
      location: 'Mombasa, Kenya',
      description: 'Provide expert advice to farmers on crop management and soil health.',
      skills: ['consulting', 'agriculture', 'communication'],
    },
  ];

  const [userSkills, setUserSkills] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Split the input into an array of skills
    const skillsArray = userSkills.split(',').map(skill => skill.trim().toLowerCase());
    
    // Filter jobs based on user skills
    const matchedJobs = jobs.filter(job => 
      skillsArray.some(skill => job.skills.includes(skill))
    );

    setFilteredJobs(matchedJobs);
  };

  return (
    <div className="job-search-container">
      <h1>Agricultural Job Search</h1>
      <p>Find job opportunities in the agricultural sector.</p>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter your skills (comma-separated)"
          value={userSkills}
          onChange={(e) => setUserSkills(e.target.value)}
          className="skill-input"
          required
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      <div className="job-listings">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div className="job-card" key={job.id}>
              <h2 className="job-title">{job.title}</h2>
              <p className="job-company">{job.company}</p>
              <p className="job-location">{job.location}</p>
              <p className="job-description">{job.description}</p>
              <a href={`/job-details/${job.id}`} className="view-details">View Details</a>
            </div>
          ))
        ) : (
          <p>No jobs found matching your skills.</p>
        )}
      </div>
    </div>
  );
};

export default AgriculturalJobSearch;
