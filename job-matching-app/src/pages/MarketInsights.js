import React, { useState } from 'react';
import './MarketInsights.css'; // Custom styles
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'; // For charts

const MarketInsights = () => {
  // Hardcoded market insights data
  const hardcodedData = [
    {
      title: 'Maize Prices Surge in Mombasa',
      description: 'Maize prices have seen a sharp increase due to the ongoing drought in the region.',
      region: 'Mombasa',
      date: '2024-09-21',
      priceTrend: 5100,
      priceTrendData: [
        { date: '2024-09-01', price: 4500 },
        { date: '2024-09-10', price: 4800 },
        { date: '2024-09-21', price: 5100 },
      ],
    },
    {
      title: 'Wheat Prices Remain Stable in Nakuru',
      description: 'Wheat prices have remained stable due to favorable weather conditions and a good harvest.',
      region: 'Nakuru',
      date: '2024-09-15',
      priceTrend: 2900,
      priceTrendData: [
        { date: '2024-09-01', price: 2800 },
        { date: '2024-09-07', price: 2850 },
        { date: '2024-09-15', price: 2900 },
      ],
    },
    {
      title: 'Rice Prices Fall in Kisumu',
      description: 'Rice prices have fallen due to increased imports and a bumper harvest in the Nyanza region.',
      region: 'Kisumu',
      date: '2024-09-18',
      priceTrend: 2500,
      priceTrendData: [
        { date: '2024-09-01', price: 2700 },
        { date: '2024-09-10', price: 2600 },
        { date: '2024-09-18', price: 2500 },
      ],
    },
  ];

  const [marketData, setMarketData] = useState(hardcodedData); // Use hardcoded data initially
  const [filteredData, setFilteredData] = useState(hardcodedData); // Set filtered data for search
  const [searchTerm, setSearchTerm] = useState('');

  // Function to filter insights based on user input (search term)
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = marketData.filter(
      (insight) =>
        insight.title.toLowerCase().includes(term) ||
        insight.description.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="market-insights-container">
      <h1>Agricultural Market Insights</h1>
      <p>Explore data trends and insights in the agricultural market.</p>

      {/* Search Filter */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search insights (e.g., crop, region)"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {/* Display Market Insights */}
      <div className="market-data">
        {filteredData.map((insight, index) => (
          <div className="insight-card" key={index}>
            <h2>{insight.title}</h2>
            <p>{insight.description}</p>
            <div className="market-details">
              <p><strong>Region:</strong> {insight.region}</p>
              <p><strong>Date:</strong> {insight.date}</p>
              <p><strong>Price Trend:</strong> {insight.priceTrend} KES</p>
            </div>
            {/* Display chart if price trend data is available */}
            {insight.priceTrendData && (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={insight.priceTrendData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="price" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        ))}

        {/* No Data Found Message */}
        {filteredData.length === 0 && (
          <p>No insights found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default MarketInsights;
