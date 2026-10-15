const express = require("express");
const router = express.Router();

const {
  detectPhishing
} = require("../services/phishingDetection");

router.post("/analyze", (req, res) => {
  try {
    const { input } = req.body;

    if (!input || typeof input !== "string" || !input.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a URL or message to analyze."
      });
    }

    const result = detectPhishing(input);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Phishing analysis error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to analyze the submitted input."
    });
  }
});

module.exports = router;
