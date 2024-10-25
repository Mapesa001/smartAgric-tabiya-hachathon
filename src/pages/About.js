// src/pages/About.js
import React from 'react';
import './About.css'; // Assuming you will create a CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <section className="intro-section">
        <h1>About Us</h1>
        <p>
          Welcome to the Smart Agriculture System! Our mission is to empower farmers with advanced tools and resources to enhance agricultural practices, increase productivity, and ensure sustainable farming methods.
        </p>
      </section>
      
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          We are dedicated to bridging the gap between traditional farming methods and modern technology. By providing data-driven insights, we aim to revolutionize the way agriculture is practiced, making it more efficient and sustainable.
        </p>
      </section>

      <section className="features-section">
        <h2>What We Offer</h2>
        <ul>
          <li>**Crop Recommendations**: Analyzing weather patterns and soil conditions to suggest the best crops for each region.</li>
          <li>**Yield Prediction**: Utilizing machine learning for accurate predictions of crop yields based on various parameters.</li>
          <li>**Market Insights**: Access real-time market data to make informed decisions about selling produce.</li>
          <li>**Sustainability Practices**: Learning about sustainable practices to improve soil health and reduce environmental impact.</li>
        </ul>
      </section>

      <section className="team-section">
        <h2>Meet Our Team</h2>
        <p>
          Our diverse team consists of agronomists, data scientists, and software engineers, all working together to bring the best agricultural solutions to farmers. We believe in collaboration and continuous improvement to meet the evolving needs of the agricultural sector.
        </p>
      </section>

      <section className="get-in-touch-section">
        <h2>Get In Touch</h2>
        <p>
          We would love to hear from you! Whether you have questions about our system or want to share your feedback, feel free to contact us at <a href="mailto:support@smartagriculture.com">support@smartagriculture.com</a>.
        </p>
      </section>
    </div>
  );
};

export default About;
