const mongoose = require("mongoose");

const threatSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true
    },

    source: {
      type: String,
      required: true
    },

    severity: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Low"
    },

    description: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["Detected", "Investigating", "Resolved"],
      default: "Detected"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Threat", threatSchema);