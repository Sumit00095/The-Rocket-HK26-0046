const express = require("express");
const cors = require("cors");
require("dotenv").config();

const alertRoutes = require("./routes/alertRoutes");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const threatRoutes = require("./routes/threatRoutes");
const aiAlertRoutes = require("./routes/aiAlertRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "CyberShield Backend is running!"
  });
});
app.use("/api/ai-alerts", aiAlertRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/threats", threatRoutes);
app.use("/api/alerts", alertRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect to MongoDB first
    await connectDB();

    // Start server after successful connection
    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Failed to start backend:",
      error.message
    );
    process.exit(1);
  }
}

startServer();