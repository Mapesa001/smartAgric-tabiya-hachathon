from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np

app = Flask(__name__)

# Load the model
model = load_model('crop_disease_model.h5')

@app.route('/predict', methods=['POST'])
def predict():
    # Get the file from the request
    img_file = request.files['file']
    img_path = 'uploaded_image.jpg'  # Temporary save path
    img_file.save(img_path)

    # Preprocess the image
    img = image.load_img(img_path, target_size=(150, 150))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0  # Normalize

    # Make prediction
    predictions = model.predict(img_array)
    result = predictions[0][0]  # Adjust according to your output

    # Return the result
    return jsonify({'disease_probability': result})

if __name__ == '__main__':
    app.run(debug=True)
