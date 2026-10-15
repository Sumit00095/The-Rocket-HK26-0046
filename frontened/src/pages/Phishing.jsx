import { useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Phishing() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeInput = async (e) => {
    e.preventDefault();

    if (!input.trim()) {
      setError("Enter a URL or suspicious message.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const response = await axios.post(
        "http://localhost:5000/api/phishing/analyze",
        { input }
      );

      setResult(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to analyze. Check whether the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <Topbar />

        <div className="page-content">
          <h1>AI Phishing Detection</h1>
          <p>
            Analyze suspicious URLs and messages for potential
            phishing indicators.
          </p>

          <form onSubmit={analyzeInput}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste a suspicious URL or message here..."
              rows={6}
              style={{
                width: "100%",
                maxWidth: "750px",
                padding: "14px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                display: "block",
                marginBottom: "15px"
              }}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Analyzing..." : "Analyze for Phishing"}
            </button>
          </form>

          {error && (
            <p style={{ color: "red", marginTop: "15px" }}>
              {error}
            </p>
          )}

          {result && (
            <div
              style={{
                marginTop: "25px",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                maxWidth: "750px"
              }}
            >
              <h2>Analysis Results</h2>

              <p>
                <strong>Detection method:</strong>{" "}
                {result.analysisType}
              </p>

              <p>
                <strong>Risk score:</strong>{" "}
                {result.riskScore}/100
              </p>

              <p>
                <strong>Risk level:</strong>{" "}
                {result.riskLevel}
              </p>

              <h3>Indicators</h3>

              {result.indicators?.length ? (
                <ul>
                  {result.indicators.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>No suspicious indicators were detected.</p>
              )}

              <h3>Recommendation</h3>
              <p>{result.recommendation}</p>

              <p style={{ fontSize: "13px", color: "#777" }}>
                This is an initial rule-based assessment, not a
                guarantee that a URL or message is safe.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Phishing;