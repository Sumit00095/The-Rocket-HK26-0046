const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    message: {
      type: String,
      required: true
    },

    severity: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      required: true
    },

    status: {
      type: String,
      enum: ["Active", "Resolved"],
      default: "Active"
    },

    threatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Threat"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Alert", alertSchema);