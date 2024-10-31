from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import os

# Disable GPU to force TensorFlow to use CPU
os.environ['CUDA_VISIBLE_DEVICES'] = '-1'

app = Flask(__name__)
CORS(app)

# Check TensorFlow is using CPU only
physical_devices = tf.config.list_physical_devices('GPU')
if not physical_devices:
    print("No GPU found, running on CPU.")
else:
    print(f"Using GPU: {physical_devices}")

# Load the TensorFlow model
try:
    model = tf.keras.models.load_model('C:\\Users\\PC\\Desktop\\mlearning\\backend\\notebooks\\trained_model.keras')
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading the model: {e}")

# Define the class names
class_names = [
    'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust',
    'Apple___healthy', 'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew',
    'Cherry_(including_sour)___healthy', 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
    'Corn_(maize)___Common_rust_', 'Corn_(maize)___Northern_Leaf_Blight',
    'Corn_(maize)___healthy', 'Grape___Black_rot', 'Grape___Esca_(Black_Measles)',
    'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy',
    'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot',
    'Peach___healthy', 'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy',
    'Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy',
    'Raspberry___healthy', 'Soybean___healthy', 'Squash___Powdery_mildew',
    'Strawberry___Leaf_scorch', 'Strawberry___healthy', 'Tomato___Bacterial_spot',
    'Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___Leaf_Mold',
    'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite',
    'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
    'Tomato___Tomato_mosaic_virus', 'Tomato___healthy'
]

# Define advice for each disease
disease_advice = {
    'Apple___Apple_scab': 'Apply fungicides such as Mancozeb at a rate of 2.5-5 lbs per acre. Remove fallen leaves and ensure good air circulation around the plants.',
    'Apple___Black_rot': 'Prune affected areas and apply fungicides like Captan or myclobutanil at 2-3 week intervals. Ensure proper spacing between trees for airflow.',
    'Apple___Cedar_apple_rust': 'Remove nearby junipers and apply fungicides like Systhane or Mancozeb. Monitor for signs of infection in early spring.',
    'Apple___healthy': 'Your plant is healthy. Continue with normal care: water adequately, prune annually, and monitor for pests.',
    'Blueberry___healthy': 'Blueberries are thriving. Maintain soil acidity (pH 4.5-5.5) and ensure consistent irrigation during dry spells.',
    'Cherry_(including_sour)___Powdery_mildew': 'Apply fungicides such as sulfur or myclobutanil. Prune for better airflow and avoid overhead watering.',
    'Cherry_(including_sour)___healthy': 'Your cherry plant is healthy. Continue regular care, monitor for pests, and prune to enhance airflow.',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot': 'Use resistant varieties and apply fungicides like Chlorothalonil at 2-3 week intervals. Rotate crops to break disease cycles.',
    'Corn_(maize)___Common_rust_': 'Apply fungicides such as Triazole and use resistant maize varieties. Scout fields regularly for early signs of infection.',
    'Corn_(maize)___Northern_Leaf_Blight': 'Rotate crops with non-host plants and apply fungicides like Propiconazole. Practice proper sanitation after harvest.',
    'Corn_(maize)___healthy': 'Healthy corn. Maintain soil fertility through regular testing and appropriate irrigation practices.',
    'Grape___Black_rot': 'Prune infected areas and apply fungicides like Copper Hydroxide or Pyraclostrobin at bloom and post-harvest.',
    'Grape___Esca_(Black_Measles)': 'Prune affected vines and avoid excessive irrigation. Consider using fungicides like myclobutanil if symptoms appear.',
    'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)': 'Improve ventilation by proper pruning and remove infected leaves. Apply fungicides like Benomyl if needed.',
    'Grape___healthy': 'Your grape plant is healthy. Ensure good irrigation and sunlight; prune regularly to promote healthy growth.',
    'Orange___Haunglongbing_(Citrus_greening)': 'Remove infected trees to prevent spreading. Consider using antibiotics like oxytetracycline under guidance.',
    'Peach___Bacterial_spot': 'Use copper-based sprays such as Copper Hydroxide or fixed copper before blooming. Remove infected fruits and foliage.',
    'Peach___healthy': 'Your peach tree is healthy. Prune regularly, monitor for pests, and ensure consistent watering.',
    'Pepper,_bell___Bacterial_spot': 'Apply copper fungicides like Kocide at the first sign of disease. Avoid overhead watering to reduce humidity.',
    'Pepper,_bell___healthy': 'Your bell pepper plant is healthy. Maintain proper watering, nutrition, and monitor for pest activity.',
    'Potato___Early_blight': 'Use certified seed and apply fungicides like Chlorothalonil at 1.5-2 lbs per acre at the first sign of blight.',
    'Potato___Late_blight': 'Apply systemic fungicides like Ridomil Gold and practice crop rotation with non-solanaceous crops.',
    'Potato___healthy': 'Your potato crop is healthy. Ensure proper hilling and irrigation; monitor for pests and diseases.',
    'Raspberry___healthy': 'Healthy raspberry plant. Maintain soil drainage, prune to remove old canes, and monitor for pest issues.',
    'Soybean___healthy': 'Healthy soybean plant. Rotate crops with non-legumes, monitor for pests, and ensure proper drainage.',
    'Squash___Powdery_mildew': 'Apply sulfur-based fungicides like Microthiol Disperss or Potassium bicarbonate. Improve air circulation by spacing plants.',
    'Strawberry___Leaf_scorch': 'Remove infected leaves and apply fungicides like Captan. Ensure adequate watering to avoid stress.',
    'Strawberry___healthy': 'Healthy strawberry plant. Water appropriately and apply mulch to retain soil moisture.',
    'Tomato___Bacterial_spot': 'Remove infected plants and use copper-based fungicides like Kocide. Rotate crops annually to manage soil health.',
    'Tomato___Early_blight': 'Apply fungicides like Chlorothalonil at 1.5 lbs per acre at first signs of infection. Remove lower leaves for airflow.',
    'Tomato___Late_blight': 'Use resistant varieties and apply systemic fungicides like Ridomil. Remove affected foliage promptly.',
    'Tomato___Leaf_Mold': 'Increase ventilation and apply fungicides like copper or sulfur. Ensure adequate sunlight reaches the plants.',
    'Tomato___Septoria_leaf_spot': 'Prune lower leaves and apply fungicides like Mancozeb at 1.5 lbs per acre. Avoid overhead irrigation.',
    'Tomato___Spider_mites Two-spotted_spider_mite': 'Apply miticides like Abamectin and introduce beneficial predators like ladybugs.',
    'Tomato___Target_Spot': 'Remove infected leaves and apply fungicides like Copper or Mancozeb. Practice crop rotation to minimize recurrence.',
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus': 'Control whiteflies using insecticides and remove infected plants to prevent spreading.',
    'Tomato___Tomato_mosaic_virus': 'Remove infected plants and disinfect tools regularly. Use resistant varieties in future plantings.',
    'Tomato___healthy': 'Healthy tomato plant. Ensure proper watering and nutrient balance; monitor regularly for pest and disease signs.'
}


@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']

    try:
        # Preprocess the image
        img = Image.open(file.stream).convert('RGB')
        img = img.resize((128, 128))
        img_array = np.array(img)
        img_array = np.expand_dims(img_array, axis=0)

        # Predict using the loaded model
        prediction = model.predict(img_array)
        result_index = np.argmax(prediction)
        predicted_disease = class_names[result_index]

        # Fetch advice based on the predicted disease
        advice = disease_advice.get(predicted_disease, 'No specific advice available for this disease.')

        # Return both the predicted disease and the advice in the response
        return jsonify({
            'predicted_disease': predicted_disease,
            'advice': advice
        })
    
    except Exception as e:
        return jsonify({'error': f"Prediction failed: {str(e)}"}), 500

if __name__ == '__main__':
    try:
        app.run(debug=True, port=5001)  # Change to 5001 or any other unused port
    except Exception as e:
        print(f"Error running the app: {e}")

