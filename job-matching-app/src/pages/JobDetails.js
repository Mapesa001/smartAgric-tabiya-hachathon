// src/pages/JobDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './JobDetails.css'; // Add custom styles

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    // Fetch specific job details using the job ID
    fetch(`https://api.tapiya.com/agriculture/jobs/${id}`) // Replace with actual Tapiya API endpoint
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
      });
  }, [id]);

  return (
    <div className="job-details-container">
      {job ? (
        <>
          <h1>{job.title}</h1>
          <p>{job.company}</p>
          <p>{job.location}</p>
          <p>{job.description}</p>
        </>
      ) : (
        <p>Loading job details...</p>
      )}
    </div>
  );
};

export default JobDetails;
