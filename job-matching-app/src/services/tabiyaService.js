import axios from 'axios';

const API_URL = 'https://tabiya-api-endpoint';  // Replace with the actual API URL

export const classifyJob = async (jobTitle) => {
  try {
    const response = await axios.post(`${API_URL}/taxonomy/classify`, {
      title: jobTitle,
    });
    return response.data; 
  } catch (error) {
    console.error('Error classifying the job:', error);
    throw error;
  }
};

export const recommendJobs = async (userSkills) => {
  try {
    const response = await axios.post(`${API_URL}/compass/recommend`, {
      skills: userSkills,
    });
    return response.data; 
  } catch (error) {
    console.error('Error recommending jobs:', error);
    throw error;
  }
};
