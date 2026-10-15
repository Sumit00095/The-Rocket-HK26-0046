import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/alerts"
      );

      console.log("Alerts received:", response.data);

      setAlerts(response.data);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Sidebar />

      <main className="main">
        <Topbar />

        <div className="threat-page">
          <h2>Security Alerts</h2>

          {loading ? (
            <p>Loading alerts...</p>
          ) : alerts.length === 0 ? (
            <p>No active alerts.</p>
          ) : (
            alerts.map((alert) => (
              <div
                className="threat-item"
                key={alert._id}
              >
                <div>
                  <strong>{alert.title}</strong>

                  <p>{alert.message}</p>

                  <p>
                    Severity: {alert.severity}
                  </p>

                  <p>
                    Status: {alert.status}
                  </p>
                </div>

                <span>
                  {alert.severity}
                </span>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default Alerts;