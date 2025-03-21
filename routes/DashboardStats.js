const express = require("express");
const router = express.Router();
const Property = require("../models/PropertyAdd");
const User = require("../models/SignupModel");

// Get Dashboard Stats
router.get("/stats", async (req, res) => {
  try {
    const totalProperties = await Property.countDocuments();
    const totalUsers = await User.countDocuments();
    const activeListings = await Property.countDocuments({ status: "active" }); // Assuming 'status' field

    res.json({ totalProperties, totalUsers, activeListings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
