from flask import Flask, request, jsonify
import openai
from flask_cors import CORS

# Initialize the Flask application
app = Flask(__name__)
CORS(app, resources={r"/chat": {"origins": "http://localhost:3000"}})  # Adjust CORS for your frontend

# Directly set the OpenAI API key (for testing purposes only)
openai.api_key = "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"  # Replace with your actual API key

@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_message = request.json.get('message')
        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        # Log the user message for debugging
        print(f"User message: {user_message}")

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": user_message}]
        )

        assistant_reply = response['choices'][0]['message']['content']
        return jsonify({"reply": assistant_reply})

    except Exception as e:
        # Log the error
        print(f"Error occurred: {str(e)}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=False)  # Set debug=False to disable debug mode
