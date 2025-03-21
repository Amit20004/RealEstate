const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const tbodyParser=require("body-parser")
const authRoutes = require("./routes/signupRoute");
const loginRoutes = require("./routes/loginRoute");
const BuyerRoutes = require("./routes/BuyerRoute");
const SellerRoute = require("./routes/SellerRoute");
const AddProperty = require("./routes/AddPropertyRoute")
const bodyParser = require("body-parser");
const Contact = require("./routes/ContactRoute")
const mlRoutes = require('./routes/mlRoutes');
const stats = require('./routes/DashboardStats');


const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser());

mongoose.connect("mongodb://localhost:27017/REAL_ESTATE_MANAGEMENT", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/auth", loginRoutes);
app.use("/api/buyer", BuyerRoutes);
app.use("/api/seller", SellerRoute);
app.use("/api", AddProperty );
app.use("/api/admin", stats );
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const propertyRoutes = require("./routes/AddPropertyRoute");
app.use("/api/properties", propertyRoutes);


app.use("/api", Contact);

const somePredictionFunction = (data) => {
  // Sample logic: Replace this with actual ML model logic
  const { area, location, bedrooms, bathrooms } = data;
  return (area * 100) + (bedrooms * 5000) + (bathrooms * 3000);  // Dummy prediction
};

app.post("/api/ml/predict", async (req, res) => {
  console.log("Received Data:", req.body);  // Check if correct data is received

  // Call your ML function here
  const predictedPrice = somePredictionFunction(req.body); 

  console.log("Predicted Price:", predictedPrice);  // Log before sending
  res.json({ predictedPrice });  // Ensure the correct response is sent
});



const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
