const jwt = require("jsonwebtoken");
// require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization"); // Get token from headers

  if (!token) {
    return res.status(401).json({ success: false, message: "Access Denied! No Token Provided" });
  }

  try {
    const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = verified; // Attach user info from token to request
    next(); // Proceed to next middleware
  } catch (error) {
    res.status(403).json({ success: false, message: "Invalid Token" });
  }
};

module.exports = authenticateToken;
