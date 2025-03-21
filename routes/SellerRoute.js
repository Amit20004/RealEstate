const express = require("express");
const router = express.Router();
const User = require("../models/SignupModel"); // Import User model
const properties=require("../models/PropertyAdd")

// GET Buyer Profile by Email
router.get("/profile/:email", async (req, res) => {
    try {
        const email = req.params.email; // Get email from URL
        console.log("Fetching user for email:", email); // Debugging

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});


// router.get("/:contact", async (req, res) => {
//     try {
//       const { contact } = req.params;
  
//       // Find the seller in the User database using the contact number
//       const seller = await User.findOne({ contact });
  
//       if (!seller) {
//         return res.status(404).json({ message: "Seller not found" });
//       }
  
//       res.status(200).json(seller);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });
router.get("/contact", async (req, res) => {
  try {
    const { contact } = req.query; // Get seller contact from query params

    if (!contact) {
      return res.status(400).json({ message: "Seller contact is required" });
    }

    const seller = await User.findOne({ contact });

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.json(seller); // Send the seller details as JSON
  } catch (error) {
    console.error("Error fetching seller details:", error);
    res.status(500).json({ message: "Server error", error });
  }
});




router.get("/email/:email", async (req, res) => {
  try {
    const sellerEmail = req.params.email;

    if (!sellerEmail) {
      return res.status(400).json({ error: "Seller email is required" });
    }

    const properties = await Property.find({ sellerEmail });
    
    if (!properties.length) {
      return res.status(404).json({ message: "No properties found for this email" });
    }

    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties by email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;



module.exports = router;
