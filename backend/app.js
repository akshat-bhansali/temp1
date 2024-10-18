const express = require("express");
const cors = require("cors");
const driveRoutes = require("./routes/driveRoutes");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Google Drive Routes
app.use("/api/drive", driveRoutes);

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
