function detectPhishing(input) {
  const text = String(input || "").trim();

  if (!text) {
    return {
      success: false,
      message: "Please enter a URL or message to analyze."
    };
  }

  const indicators = [];
  let riskScore = 0;

  // Extract URLs from the submitted text
  const urls = text.match(/https?:\/\/[^\s"'<>]+/gi) || [];
  const lowerText = text.toLowerCase();

  // Suspicious words commonly used in phishing messages
  const suspiciousWords = [
    "verify your account",
    "urgent action",
    "account suspended",
    "password expired",
    "claim your reward",
    "click here",
    "confirm your password"
  ];

  for (const word of suspiciousWords) {
    if (lowerText.includes(word)) {
      indicators.push(`Suspicious wording: "${word}"`);
      riskScore += 15;
    }
  }

  // Check URLs for suspicious patterns
  for (const url of urls) {
    try {
      const parsed = new URL(url);
      const hostname = parsed.hostname.toLowerCase();

      if (parsed.protocol !== "https:") {
        indicators.push("URL does not use HTTPS");
        riskScore += 15;
      }

      if (parsed.username || parsed.password) {
        indicators.push("URL contains embedded credentials");
        riskScore += 30;
      }

      if (hostname.startsWith("xn--")) {
        indicators.push("Hostname uses an internationalized encoding");
        riskScore += 20;
      }

      if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) {
        indicators.push("URL uses an IP address instead of a domain name");
        riskScore += 20;
      }

      if (hostname.split(".").length >= 5) {
        indicators.push("URL contains an unusually long subdomain chain");
        riskScore += 10;
      }
    } catch {
      indicators.push("A URL could not be parsed");
      riskScore += 10;
    }
  }

  riskScore = Math.min(riskScore, 100);

  let riskLevel = "Low";

  if (riskScore >= 60) {
    riskLevel = "High";
  } else if (riskScore >= 30) {
    riskLevel = "Medium";
  }

  return {
    success: true,
    analysisType: "Rule-Based Phishing Detection",
    riskScore,
    riskLevel,
    indicators,
    recommendation:
      riskLevel === "High"
        ? "Avoid opening the link or sharing sensitive information. Verify through the official website."
        : riskLevel === "Medium"
        ? "Check the sender and destination carefully before taking action."
        : "No strong phishing indicators were detected. This does not guarantee the message is safe."
  };
}

module.exports = { detectPhishing };