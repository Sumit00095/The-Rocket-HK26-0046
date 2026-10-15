function detectThreat(event) {
  let score = 0;
  const reasons = [];

  const failedLogins = Number(event.failedLogins || 0);
  const requestsPerMinute = Number(event.requestsPerMinute || 0);
  const unusualCountry = event.unusualCountry === true;
  const suspiciousPayload = event.suspiciousPayload === true;

  // Detect repeated failed login attempts
  if (failedLogins >= 5) {
    score += 35;
    reasons.push("Repeated failed login attempts");
  }

  // Detect unusually high request volume
  if (requestsPerMinute >= 100) {
    score += 30;
    reasons.push("Unusually high request volume");
  }

  // Flag unusual login locations for review
  if (unusualCountry) {
    score += 20;
    reasons.push("Unusual login location");
  }

  // Flag payloads identified as suspicious by prior checks
  if (suspiciousPayload) {
    score += 40;
    reasons.push("Suspicious payload detected");
  }

  score = Math.min(score, 100);

  let severity = "Low";

  if (score >= 70) {
    severity = "High";
  } else if (score >= 35) {
    severity = "Medium";
  }

  return {
    score,
    severity,
    isThreat: score >= 35,
    reasons,
    analyzedAt: new Date()
  };
}

module.exports = { detectThreat };