const { detectThreat } = require("./threatDetector");

function analyzeAlert(event) {
  const detection = detectThreat(event);

  let category = "Normal Activity";
  let recommendedActions = [
    "Continue monitoring activity"
  ];

  if (detection.isThreat) {
    category = "Suspicious Activity";

    recommendedActions = [
      "Review the security logs",
      "Investigate the reasons for this detection",
      "Verify whether the activity is authorized"
    ];
  }

  if (detection.score >= 70) {
    category = "High-Risk Security Event";

    recommendedActions = [
      "Investigate the event immediately",
      "Check affected accounts and systems",
      "Follow your incident response procedure"
    ];
  }

  return {
    ...detection,
    category,
    recommendedActions,
    analysisMethod: "Rule-based analysis"
  };
}

module.exports = { analyzeAlert };