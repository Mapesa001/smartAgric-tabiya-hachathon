import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = ({ username }) => {
    const [userData, setUserData] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            if (!username) {
                setError('No username provided');
                return; // Exit early if no username
            }

            try {
                const response = await axios.get(`http://localhost:5000/profile/${username}`);
                if (response.data) {
                    setUserData(response.data);
                } else {
                    setError('User not found');
                }
            } catch (error) {
                setError('An error occurred');
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, [username]);

    return (
        <div className="profile-page">
            <h2>Profile</h2>
            {error ? <p className="error-message">{error}</p> : (
                <div>
                    <p>Username: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                </div>
            )}
        </div>
    );
};

export default Profile;
