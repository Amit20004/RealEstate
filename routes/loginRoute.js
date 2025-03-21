const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/SignupModel"); // Adjust path if necessary
const router = express.Router();

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    console.log("Login request received", req.body); // Debugging line

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, "your_secret_key", { expiresIn: "1h" });

    res.json({ success: true, token, role: user.role, email:email, contact:user.contact });
  } catch (error) {
    console.error("Login error:", error); // Show detailed error in logs
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;


