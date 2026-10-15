const express = require("express");
const router = express.Router();

const { analyzeAlert } = require("../services/aiAlertService");

router.post("/analyze", (req, res) => {
  try {
    const event = req.body || {};

    const hasInput = [
      "failedLogins",
      "requestsPerMinute",
      "unusualCountry",
      "suspiciousPayload"
    ].some(key => event[key] !== undefined);

    if (!hasInput) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one threat detection field."
      });
    }

    const analysis = analyzeAlert(event);

    return res.status(200).json({
      success: true,
      analysis
    });
  } catch (error) {
    console.error("AI alert error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to analyze alert."
    });
  }
});

module.exports = router;