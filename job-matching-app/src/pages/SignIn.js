import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './SignIn.css';

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  // Switch between login and register form
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage('');
    setFormData({ username: '', email: '', password: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? 'http://localhost:5000/login' : 'http://localhost:5000/register';
      const response = await axios.post(url, formData);
      setMessage(response.data.message);

      // Redirect to job search page after successful login
      if (isLogin) {
        navigate('/job-search'); // Redirect to job search if logging in
      }
    } catch (error) {
      setMessage('An error occurred.');
    }
  };

  return (
    <div className="signin-container"> {/* Added specific class */}
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <p>{message}</p>
      <button onClick={toggleForm}>
        {isLogin ? 'Don’t have an account? Register' : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default SignIn;
