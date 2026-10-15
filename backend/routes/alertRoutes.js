const express = require("express");
const Alert = require("../models/Alert");

const router = express.Router();

// Get all alerts
router.get("/", async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 });

    res.json(alerts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch alerts"
    });
  }
});

// Create alert
router.post("/", async (req, res) => {
  try {
    const { title, message, severity, threatId } = req.body;

    const alert = await Alert.create({
      title,
      message,
      severity,
      threatId
    });

    res.status(201).json(alert);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create alert"
    });
  }
});

module.exports = router;