const express = require("express");
const router = express.Router();
const User = require("../models/SignupModel"); // Import User model

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

module.exports = router;
