import React from 'react';
import './About.css'; // Add custom styles

const About = () => {
  return (
    <div className="about-container">
      <h1>About Agricultural Market Explorer</h1>
      
      <section className="about-overview">
        <p>
          The <strong>Agricultural Market Explorer</strong> is an innovative platform designed to provide users with deep insights into the agricultural job market, helping individuals and businesses stay informed on the latest trends, opportunities, and developments. Whether you're a job seeker, an employer, or an industry expert, this platform offers valuable resources to help you navigate the agricultural sector more efficiently.
        </p>
      </section>
      
      <section className="about-features">
        <h2>Key Features</h2>
        <ul>
          <li>
            <strong>Comprehensive Job Listings:</strong> Browse through a diverse range of agricultural jobs across different regions in Kenya and beyond. From farm labor positions to agri-tech roles, we provide listings that cater to various skill sets and expertise.
          </li>
          <li>
            <strong>Industry Insights:</strong> Gain insights into the latest trends shaping the agricultural industry. Explore reports, research, and market trends that are pivotal to understanding the current job market.
          </li>
          <li>
            <strong>Regional Data:</strong> Get region-specific information on agricultural activities, including job demand, prominent industries, and emerging markets within Kenya’s agricultural sector.
          </li>
          <li>
            <strong>Salary Benchmarking:</strong> Stay informed about salary trends across different agricultural roles and regions, helping you make informed career decisions or compensation plans for employees.
          </li>
          <li>
            <strong>Training and Certification Programs:</strong> Explore various training opportunities to enhance your skills. Our platform offers access to educational resources, certification courses, and workshops tailored to the needs of the agricultural workforce.
          </li>
          <li>
            <strong>Employer Solutions:</strong> For employers, the platform provides tools to post jobs, manage applications, and identify skilled workers that fit your organization’s needs.
          </li>
        </ul>
      </section>

      <section className="about-purpose">
        <h2>Our Purpose</h2>
        <p>
          The agricultural industry plays a critical role in Kenya’s economy, and we believe that empowering individuals and businesses with the right information can lead to sustainable growth. Our platform was built with the purpose of bridging the gap between talent and opportunity, fostering a well-informed and dynamic agricultural workforce.
        </p>
        <p>
          With the tools provided by <strong>Tapiya</strong>, the Agricultural Market Explorer allows users to make data-driven decisions that lead to better job placements, industry advancements, and market competitiveness. We aim to connect agricultural employers with skilled professionals while giving job seekers the information they need to succeed in their careers.
        </p>
      </section>

      <section className="about-vision">
        <h2>Our Vision</h2>
        <p>
          Our vision is to create an ecosystem where agriculture thrives through the seamless exchange of knowledge, talent, and innovation. We strive to become a central hub for all things related to agricultural employment, learning, and market intelligence, ultimately contributing to a vibrant and resilient agricultural economy.
        </p>
      </section>

      <section className="about-team">
        <h2>Meet Our Team</h2>
        <p>
          The Agricultural Market Explorer platform is powered by a dedicated team of professionals passionate about agriculture, technology, and human resources. Our experts in agronomy, data analytics, software development, and market research work tirelessly to provide an intuitive and impactful user experience.
        </p>
      </section>

      <section className="about-contact">
        <h2>Get in Touch</h2>
        <p>
          Have questions or need assistance? Our support team is here to help. Whether you're looking to post a job, explore market insights, or learn more about training programs, don't hesitate to reach out to us.
        </p>
        <p>
          <strong>Contact us:</strong> <a href="mailto:support@agriculturalmarketexplorer.com">support@agriculturalmarketexplorer.com</a>
        </p>
      </section>
    </div>
  );
};

export default About;
