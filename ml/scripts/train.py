import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import OneHotEncoder

# Load dataset (ensure it contains all locations)
df = pd.read_csv("A:/MyProjects/RealEstate/backend/ml/data/house_prices.csv")

# Feature selection
X = df[['area', 'location', 'bedrooms', 'bathrooms']]
y = df['price']

# One-hot encoding for categorical features
encoder = OneHotEncoder(handle_unknown='ignore')
X_encoded = encoder.fit_transform(X[['location']]).toarray()

# Convert to DataFrame and merge with other features
X_encoded_df = pd.DataFrame(X_encoded, columns=encoder.get_feature_names_out(['location']))
X_final = pd.concat([X[['area', 'bedrooms', 'bathrooms']], X_encoded_df], axis=1)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X_final, y, test_size=0.2, random_state=42)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Save model and encoder
pickle.dump(model, open("../model/house_price_model.pkl", "wb"))
pickle.dump(encoder, open("../model/location_encoder.pkl", "wb"))
