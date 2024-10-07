import React, { useState } from 'react';
import axios from 'axios';
import './DiseasePrediction.css';  // Optional CSS for styling

function DiseasePrediction() {
    const [file, setFile] = useState(null);
    const [predictedDisease, setPredictedDisease] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        
        if (selectedFile) {
            setImagePreview(URL.createObjectURL(selectedFile));
        } else {
            setImagePreview('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/predict_disease', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Display the predicted disease
            setPredictedDisease(response.data.predicted_disease);
        } catch (error) {
            console.error('Error predicting disease:', error);
            setPredictedDisease('Error predicting disease');
        }
    };

    return (
        <div className="disease-prediction">
            <h2>Disease Prediction</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleFileChange} required />
                {imagePreview && <img src={imagePreview} alt="Leaf Preview" className="image-preview" />}
                <button type="submit">Predict Disease</button>
            </form>
            {predictedDisease && <h3>Predicted Disease: {predictedDisease}</h3>}
        </div>
    );
}

export default DiseasePrediction;
