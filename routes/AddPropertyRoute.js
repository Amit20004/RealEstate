const express = require("express");
const Property = require("../models/PropertyAdd"); // Property Model
const upload = require("../middleware/Upload"); // Multer Middleware
const router = express.Router();

router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { title, location, price, bedrooms, bathrooms, property_type, status, sellerContact, sellerEmail } = req.body;

    if (!sellerContact) {
      return res.status(400).json({ error: "Seller contact number is required" });
    }

    if (!sellerEmail) {
      return res.status(400).json({ error: "Seller email is required" });
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const newProperty = new Property({
      title,
      location,
      price,
      bedrooms,
      bathrooms,
      property_type,
      status,
      image: imagePath,
      sellerContact, // Save seller's contact
      sellerEmail, // Save seller's email
    });

    await newProperty.save();
    res.status(201).json({ message: "Property added successfully", property: newProperty });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.get("/", async (req, res) => {
  try {
    const properties = await Property.find(); // Fetch all properties
    res.json(properties); // Send the properties as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});







module.exports = router;
