const express = require("express");
const router = express.Router();
const Property = require("../models/PropertyAdd"); // Import Mongoose model

// GET all properties
router.get("/properties", async (req, res) => {
  try {
    const properties = await Property.find(); // Fetch all properties from DB
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch properties" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Property.findByIdAndDelete(id);
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get("/email/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const properties = await Property.find({ sellerEmail: email }); // Modify as per your schema
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching properties' });
  }
});


module.exports = router;
