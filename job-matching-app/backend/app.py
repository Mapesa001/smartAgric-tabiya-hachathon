from flask import Flask, jsonify, request
import pandas as pd
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS

# Configurations for SQLite Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# Define the User model for SQL
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), nullable=False, unique=True)
    email = db.Column(db.String(150), nullable=False, unique=True)
    password = db.Column(db.String(150), nullable=False)

# Create database tables
with app.app_context():
    db.create_all()

# Load the CSV files for the original functionality
occupations_file_path = 'C:\\Users\\PC\\Desktop\\mlearning\\job-matching-app\\public\\data\\occupations (1).csv'
skills_file_path = 'C:\\Users\\PC\\Desktop\\mlearning\\job-matching-app\\public\\data\\skill_groups.csv'

occupations_data = pd.read_csv(occupations_file_path)
skills_data = pd.read_csv(skills_file_path)

# Route to serve jobs data from CSV
@app.route('/jobs', methods=['GET'])
def get_jobs():
    jobs = occupations_data[['PREFERREDLABEL', 'DESCRIPTION', 'CODE']].to_dict(orient='records')
    return jsonify(jobs)

# Route to serve skills data from CSV
@app.route('/skills', methods=['GET'])
def get_skills():
    skills = skills_data[['PREFERREDLABEL', 'DESCRIPTION']].to_dict(orient='records')
    return jsonify(skills)

# New SQL-based routes for user registration, login, and profile

# Register Route
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully!"})

# Login Route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        return jsonify({"message": "Login successful!", "user": {"username": user.username, "email": user.email}})
    return jsonify({"message": "Invalid credentials!"}), 401

# Profile Route
@app.route('/profile/<username>', methods=['GET'])
def profile(username):
    user = User.query.filter_by(username=username).first()
    if user:
        return jsonify({"username": user.username, "email": user.email})
    return jsonify({"message": "User not found!"}), 404

if __name__ == '__main__':
    app.run(debug=True)
