import sys
import pickle
import numpy as np
import pandas as pd

# Load the trained model and encoder
model = pickle.load(open("../model/house_price_model.pkl", "rb"))
encoder = pickle.load(open("../model/location_encoder.pkl", "rb"))

# Get inputs from command line
area = float(sys.argv[1])
location = sys.argv[2]
bedrooms = int(sys.argv[3])
bathrooms = int(sys.argv[4])

# Encode the location using the same encoder
location_encoded = encoder.transform([[location]]).toarray()

# Convert to DataFrame
location_df = pd.DataFrame(location_encoded, columns=encoder.get_feature_names_out(['location']))

# Create the final input array
sample = np.hstack([[area, bedrooms, bathrooms], location_encoded[0]])

# Predict price
predicted_price = model.predict([sample])[0]
return jsonify({"predictedPrice": predicted_price})
