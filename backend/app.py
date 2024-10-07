from flask import Flask, request, jsonify
from keras.models import load_model
import numpy as np
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import os
import traceback

app = Flask(__name__)

# Load your trained model
model_path = 'C:\\Users\\PC\\Desktop\\mlearning\\backend\\notebooks\\crop_disease_model.h5'
model = load_model(model_path)

# Create uploads directory if it doesn't exist
uploads_dir = 'uploads'
if not os.path.exists(uploads_dir):
    os.makedirs(uploads_dir)

@app.route('/predict_disease', methods=['POST'])
def predict_disease():
    try:
        # Check if the file is part of the request
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        
        # Save the uploaded file
        file_path = os.path.join(uploads_dir, file.filename)
        file.save(file_path)

        # Load and preprocess the image
        img = load_img(file_path, target_size=(150, 150))  # Resize as per model's requirement
        img_array = img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
        img_array /= 255.0  # Normalize pixel values to [0, 1]

        # Make prediction
        predictions = model.predict(img_array)

        # Get the predicted class index
        predicted_class_index = np.argmax(predictions[0])

        # Assuming you have a mapping of class indices to class names
        class_names = ['Color Images', 'Grayscale Images', 'Individual Images', 'Segmented Images']  # Update this list if needed
        
        # Get the predicted disease name
        predicted_disease = class_names[predicted_class_index]

        return jsonify({
            'predicted_disease': predicted_disease
        })

    except Exception as e:
        # Log the traceback for debugging
        error_message = traceback.format_exc()
        print("Error during prediction:", error_message)
        return jsonify({'error': 'An error occurred during prediction.'}), 500

if __name__ == '__main__':
    app.run(debug=True)
