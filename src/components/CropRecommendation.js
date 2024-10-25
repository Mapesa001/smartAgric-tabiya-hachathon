// src/components/CropRecommendation.js
import React, { useState } from 'react';
import './CropRecommendation.css'; // Assuming you will create a CSS file for styling

const CropRecommendation = () => {
  const [soilType, setSoilType] = useState('');
  const [season, setSeason] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const handleRecommendation = () => {
    // Dummy logic for crop recommendation based on soil type and season
    const crops = {
      'loamy': {
        'wet': ['Rice', 'Sugarcane', 'Taro'],
        'dry': ['Wheat', 'Barley', 'Chickpeas'],
      },
      'sandy': {
        'wet': ['Watermelon', 'Sweet Potato', 'Pineapple'],
        'dry': ['Peppers', 'Tomatoes', 'Pumpkin'],
      },
      'clay': {
        'wet': ['Cabbage', 'Onions', 'Garlic'],
        'dry': ['Maize', 'Potatoes', 'Peas'],
      },
    };

    const result = crops[soilType]?.[season] || [];
    setRecommendations(result);
  };

  return (
    <div className="crop-recommendation-container">
      <h1>Crop Recommendation</h1>
      <p>Find the best crops to plant based on your soil type and the current season!</p>
      
      <div className="input-section">
        <label htmlFor="soilType">Select Soil Type:</label>
        <select id="soilType" value={soilType} onChange={(e) => setSoilType(e.target.value)}>
          <option value="">Select...</option>
          <option value="loamy">Loamy</option>
          <option value="sandy">Sandy</option>
          <option value="clay">Clay</option>
        </select>

        <label htmlFor="season">Select Season:</label>
        <select id="season" value={season} onChange={(e) => setSeason(e.target.value)}>
          <option value="">Select...</option>
          <option value="wet">Wet Season</option>
          <option value="dry">Dry Season</option>
        </select>

        <button onClick={handleRecommendation} className="recommendation-button">Get Recommendations</button>
      </div>

      {recommendations.length > 0 && (
        <div className="recommendation-results">
          <h2>Recommended Crops:</h2>
          <ul>
            {recommendations.map((crop, index) => (
              <li key={index}>{crop}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CropRecommendation;
