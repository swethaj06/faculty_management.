// server/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Load environment variables from the correct path
require("dotenv").config({ path: path.join(__dirname, '.env') });

// Debug environment variables
console.log("Environment variables loaded:");
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("PORT:", process.env.PORT);

const app = express();

// Configure CORS properly
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:3000', 'http://127.0.0.1:5173', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`📞 ${req.method} ${req.path} - ${new Date().toISOString()}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log("📦 Request body:", req.body);
  }
  next();
});

const PORT = process.env.PORT || 5000;

// MongoDB connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/facultymanagement";
console.log("Connecting to MongoDB:", mongoURI);

mongoose.connect(mongoURI)
.then(() => {
  console.log("✅ MongoDB connected successfully!");
  console.log("Database:", mongoose.connection.db.databaseName);
})
.catch((err) => {
  console.log("❌ MongoDB connection error:", err);
});

// Routes
const facultyRoutes = require("./routes/facultyRoutes");
const departmentRoutes = require("./routes/departmentRoutes");

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "Faculty Management API is running!", 
    timestamp: new Date().toISOString(),
    endpoints: {
      faculty: "/api/faculty",
      departments: "/api/department"
    }
  });
});

app.use("/api/faculty", facultyRoutes);
app.use("/api/department", departmentRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Server URL: http://localhost:${PORT}`);
  console.log(`📡 Ready to receive requests!`);
});
