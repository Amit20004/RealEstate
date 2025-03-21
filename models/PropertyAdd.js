const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  property_type: { type: String, required: true },
  status: { type: String, default: "Available" },
  image: { type: String, default: "", set: (value) => (typeof value === "string" ? value : "") },
  sellerContact: { type: String, required: true }, // Added seller contact
  sellerEmail: { type: String, required: true }, // Added seller email
});

const Property = mongoose.model("Property", PropertySchema);

module.exports = Property;
