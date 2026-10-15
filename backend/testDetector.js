const { detectThreat } = require("./services/threatDetector");

const event = {
  failedLogins: 8,
  requestsPerMinute: 150,
  unusualCountry: false,
  suspiciousPayload: false
};

const result = detectThreat(event);

console.log("Detection result:", result);