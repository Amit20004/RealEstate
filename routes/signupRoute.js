const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/SignupModel");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password, contact, role } = req.body;

  if (!name || !email || !password || !contact || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, contact, role });
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role, contact:user.contact }, "secretKey", { expiresIn: "1d" });

    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
