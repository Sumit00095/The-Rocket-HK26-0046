const express = require("express");
const Threat = require("../models/Threat");
const Alert = require("../models/Alert");

const router = express.Router();

// ===============================
// GET ALL THREATS
// ===============================
router.get("/", async (req, res) => {
  try {
    const threats = await Threat.find().sort({ createdAt: -1 });

    res.json(threats);
  } catch (error) {
    console.error("Fetch threats error:", error);

    res.status(500).json({
      message: "Failed to fetch threats"
    });
  }
});


// ===============================
// ADD A THREAT
// ===============================
router.post("/", async (req, res) => {
  try {
    const {
      type,
      source,
      severity,
      description
    } = req.body;

    // Check required fields
    if (!type || !source || !severity || !description) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Create threat
    const threat = await Threat.create({
      type,
      source,
      severity,
      description
    });

    console.log("Threat created:", severity);

    // ===============================
    // AUTOMATIC ALERT GENERATION
    // ===============================
    if (severity === "High" || severity === "Critical") {

      const alert = await Alert.create({
        title: `${severity} Threat Detected`,

        message: `${type} detected from ${source}. ${description}`,

        severity: severity,

        threatId: threat._id
      });

      console.log("Alert created:", alert._id);
    }

    // Send response
    res.status(201).json(threat);

  } catch (error) {

    console.error("Threat creation error:", error);

    res.status(500).json({
      message: "Failed to create threat"
    });
  }
});


module.exports = router;