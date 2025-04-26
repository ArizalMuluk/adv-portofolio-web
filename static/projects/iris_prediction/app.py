from flask import Blueprint, render_template, request, jsonify
import pickle
import numpy as np
import os

# Buat Blueprint dengan URL prefix yang benar
iris_bp = Blueprint('iris_prediction', __name__, 
                template_folder='templates',
                static_folder='static',
                url_prefix='/projects/iris-prediction')

# Load model
model_path = os.path.join(os.path.dirname(__file__), 'iris_decision_tree_model.pkl')
with open(model_path, 'rb') as f:
    model = pickle.load(f)

@iris_bp.route('/')
def index():
    print("Iris Blueprint route called!")
    return render_template('indexs.html')

@iris_bp.route('/predict', methods=['POST'])
def predict():
    # Ambil data dari request
    data = request.get_json()
    
    # Ekstrak fitur
    sepal_length = float(data['sepal_length'])
    sepal_width = float(data['sepal_width'])
    petal_length = float(data['petal_length'])
    petal_width = float(data['petal_width'])
    
    # Buat array fitur
    features = np.array([[sepal_length, sepal_width, petal_length, petal_width]])
    
    # Prediksi
    prediction = model.predict(features)[0]
    
    # Map hasil prediksi ke nama spesies
    species_map = {
        0: 'Iris Setosa',
        1: 'Iris Versicolor',
        2: 'Iris Virginica'
    }
    
    result = species_map[prediction]
    
    return jsonify({'prediction': result})