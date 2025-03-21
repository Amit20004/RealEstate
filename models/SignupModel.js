const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: String,
  contact: { type: String, required: true }, // Added contact number
  role: { type: String, enum: ["buyer", "seller"], required: true },
});

module.exports = mongoose.model("User", UserSchema);
