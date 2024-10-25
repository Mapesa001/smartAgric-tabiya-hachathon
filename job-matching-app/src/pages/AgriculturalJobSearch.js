import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AgriculturalJobSearch.css';

function JobSearch() {
  const [jobs, setJobs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('occupation');
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    const fetchSkills = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/skills');
        if (Array.isArray(response.data)) {
          setSkills(response.data);
        } else {
          console.error('Skills data is not an array:', response.data);
          setSkills([]);
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchJobs();
    fetchSkills();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setLoading(true);
    setTimeout(() => {
      if (searchType === 'occupation') {
        const results = jobs.filter(job =>
          job.PREFERREDLABEL.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredResults(results);
      } else {
        const results = skills.filter(skill =>
          skill.PREFERREDLABEL.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredResults(results);
      }
      setLoading(false);
    }, 300);
  };

  const handleSearchType = (event) => {
    setSearchType(event.target.value);
    setSearchTerm('');
    setFilteredResults([]);
  };

  // Sample jobs data
  const sampleJobs = [
    {
      level: "Entry-Level Agricultural Technician",
      description: "Responsible for assisting in the development of agricultural production processes. Requires a basic understanding of farming techniques and machinery.",
    },
    {
      level: "Mid-Level Agronomist",
      description: "Works with farmers to improve crop yields through soil management and crop rotation. Requires a degree in agronomy or a related field.",
    },
    {
      level: "Senior Agricultural Manager",
      description: "Oversees agricultural operations and manages staff. Responsible for strategic planning and decision-making to enhance productivity and profitability.",
    },
  ];

  return (
    <div className="job-search-container">
      <h1>Job Search</h1>
      <p>
        Discover various career opportunities in agriculture! Whether you are looking for roles in farming, research, or agribusiness, our platform connects you with potential employers and resources.
        Use the search feature below to find jobs by occupation or skill.
      </p>

      {/* Search type toggle */}
      <div className="search-type-toggle">
        <label>
          <input type="radio" value="occupation" checked={searchType === 'occupation'} onChange={handleSearchType} />
          Occupation
        </label>
        <label>
          <input type="radio" value="skill" checked={searchType === 'skill'} onChange={handleSearchType} />
          Skill
        </label>
      </div>

      {/* Search input */}
      <input
        type="text"
        placeholder={`Search ${searchType}...`}
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />

      {/* Loading indicator */}
      {loading && <p>Loading results...</p>}

      {/* Results */}
      <ul className="results-list">
        {filteredResults.length > 0 ? (
          filteredResults.map((item, index) => (
            <li key={index} className="result-item">
              <h2>{item.PREFERREDLABEL}</h2>
              <p>{item.DESCRIPTION}</p>
            </li>
          ))
        ) : (
          <li className="result-item">No results found for "{searchTerm}"</li>
        )}
      </ul>

      {/* Sample Agricultural Jobs Section */}
      <div className="job-showcase">
        <h2>Sample Agricultural Jobs</h2>
        <div className="job-cards">
          {sampleJobs.map((job, index) => (
            <div key={index} className="job-card">
              <h3>{job.level}</h3>
              <p>{job.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobSearch;
