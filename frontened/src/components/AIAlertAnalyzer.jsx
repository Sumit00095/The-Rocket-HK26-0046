import { useState } from "react";
import axios from "axios";

function AIAlertAnalyzer() {
  const [form, setForm] = useState({
    failedLogins: 8,
    requestsPerMinute: 120,
    unusualCountry: true,
    suspiciousPayload: false,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const analyzeAlert = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/ai-alerts/analyze",
        {
          failedLogins: Number(form.failedLogins),
          requestsPerMinute: Number(form.requestsPerMinute),
          unusualCountry: form.unusualCountry,
          suspiciousPayload: form.suspiciousPayload,
        }
      );

      setResult(response.data.analysis);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Unable to analyze the alert."
      );
    } finally {
      setLoading(false);
    }
  };

  const severityColor =
    result?.severity === "High"
      ? "#dc2626"
      : result?.severity === "Medium"
      ? "#d97706"
      : "#16a34a";

  const cardStyle = {
    background: "var(--card-bg, #ffffff)",
    color: "var(--text-color, #1f2937)",
    border: "1px solid var(--border-color, #e5e7eb)",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px",
  };

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    marginTop: "6px",
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={cardStyle}>
        <h2>AI-Powered Alert Analysis</h2>

        <p>
          Analyze suspicious activity and view its risk score.
        </p>

        <form onSubmit={analyzeAlert}>
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="failedLogins">
              Failed Login Attempts
            </label>
            <input
              id="failedLogins"
              style={inputStyle}
              type="number"
              name="failedLogins"
              min="0"
              value={form.failedLogins}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="requestsPerMinute">
              Requests Per Minute
            </label>
            <input
              id="requestsPerMinute"
              style={inputStyle}
              type="number"
              name="requestsPerMinute"
              min="0"
              value={form.requestsPerMinute}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label>
              <input
                type="checkbox"
                name="unusualCountry"
                checked={form.unusualCountry}
                onChange={handleChange}
              />{" "}
              Unusual login location
            </label>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>
              <input
                type="checkbox"
                name="suspiciousPayload"
                checked={form.suspiciousPayload}
                onChange={handleChange}
              />{" "}
              Suspicious payload detected
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: "#2563eb",
              color: "#ffffff",
              border: "none",
              borderRadius: "7px",
              padding: "12px 18px",
              cursor: loading ? "wait" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Analyzing..." : "Analyze Alert"}
          </button>
        </form>
      </div>

      {error && (
        <div
          role="alert"
          style={{
            ...cardStyle,
            color: "#dc2626",
          }}
        >
          <strong>Analysis failed:</strong> {error}
        </div>
      )}

      {result && (
        <div style={cardStyle}>
          <h2>Analysis Results</h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "24px",
              marginBottom: "20px",
            }}
          >
            <div>
              <p>Risk Score</p>
              <h1 style={{ color: severityColor }}>
                {result.score}/100
              </h1>
            </div>

            <div>
              <p>Severity</p>
              <h2 style={{ color: severityColor }}>
                {result.severity}
              </h2>
            </div>
          </div>

          <p>
            <strong>Category:</strong>{" "}
            {result.category}
          </p>

          <p>
            <strong>Threat detected:</strong>{" "}
            {result.isThreat ? "Yes" : "No"}
          </p>

          <h3>Detection Reasons</h3>

          {result.reasons?.length > 0 ? (
            <ul>
              {result.reasons.map((reason, index) => (
                <li key={`${reason}-${index}`}>
                  {reason}
                </li>
              ))}
            </ul>
          ) : (
            <p>No suspicious indicators detected.</p>
          )}

          <h3>Recommended Actions</h3>

          <ul>
            {result.recommendedActions?.map(
              (action, index) => (
                <li key={`${action}-${index}`}>
                  {action}
                </li>
              )
            )}
          </ul>

          <p>
            <small>
              Analysis method: {result.analysisMethod}
            </small>
          </p>
        </div>
      )}
    </div>
  );
}

export default AIAlertAnalyzer;