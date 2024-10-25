import React, { useState } from 'react';
import axios from 'axios';
import './DiseasePrediction.css'; // Optional CSS for styling

function DiseasePrediction() {
    const [file, setFile] = useState(null);
    const [predictedDisease, setPredictedDisease] = useState('');
    const [advice, setAdvice] = useState(''); // New state for advice
    const [imagePreview, setImagePreview] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            setImagePreview(URL.createObjectURL(selectedFile));
            setError(''); // Clear any previous error
        } else {
            setImagePreview('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous error
        setPredictedDisease(''); // Clear previous prediction
        setAdvice(''); // Clear previous advice
        setLoading(true); // Set loading state

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Check for predicted disease and advice
            if (response.data.predicted_disease) {
                setPredictedDisease(response.data.predicted_disease);
                setAdvice(response.data.advice || 'No advice available'); // Set the advice
            } else {
                setError('No disease predicted');
            }
        } catch (error) {
            console.error('Error predicting disease:', error);
            setError('Error predicting disease: ' + (error.response?.data?.error || 'Please try again.'));
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="disease-prediction">
            <h2>Disease Prediction</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    required 
                />
                {imagePreview && <img src={imagePreview} alt="Leaf Preview" className="image-preview" />}
                <button type="submit" disabled={!file || loading}>
                    {loading ? 'Predicting...' : 'Predict Disease'}
                </button>
            </form>

            {predictedDisease && <h3>Predicted Disease: {predictedDisease}</h3>}
            {advice && <p><strong>Advice:</strong> {advice}</p>} {/* Display the advice */}
            {error && <h3 className="error-message">{error}</h3>}
        </div>
    );
}

export default DiseasePrediction;
