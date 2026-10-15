import { useEffect, useState } from "react";
import axios from "axios";
import AIAlertAnalyzer from "../components/AIAlertAnalyzer";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";

import {
  ShieldAlert,
  AlertTriangle,
  Activity,
  CheckCircle
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Dashboard() {
  const [threats, setThreats] = useState([]);

  useEffect(() => {
    fetchThreats();
  }, []);

  const fetchThreats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/threats"
      );

      setThreats(response.data);
    } catch (error) {
      console.error("Error fetching threats:", error);
    }
  };

  const totalThreats = threats.length;

  const criticalThreats = threats.filter(
    (threat) => threat.severity === "Critical"
  ).length;

  const activeThreats = threats.filter(
    (threat) => threat.status !== "Resolved"
  ).length;

  const chartData = [
    { day: "Mon", threats: 0 },
    { day: "Tue", threats: 0 },
    { day: "Wed", threats: 0 },
    { day: "Thu", threats: 0 },
    { day: "Fri", threats: 0 },
    { day: "Sat", threats: 0 },
    { day: "Sun", threats: totalThreats }
  ];

  return (
    <div className="app">

      <Sidebar />

      <main className="main">

        <Topbar />

        <section className="stats">

          <StatCard
            title="Threats Detected"
            value={totalThreats}
            description="Total detected threats"
            icon={<ShieldAlert />}
          />

          <StatCard
            title="Critical Alerts"
            value={criticalThreats}
            description="Requires attention"
            icon={<AlertTriangle />}
          />

          <StatCard
            title="Active Threats"
            value={activeThreats}
            description="Currently active"
            icon={<Activity />}
          />

          <StatCard
            title="System Status"
            value={criticalThreats > 0 ? "Alert" : "Secure"}
            description={
              criticalThreats > 0
                ? "Critical threats detected"
                : "All systems normal"
            }
            icon={<CheckCircle />}
          />

        </section>

        <section className="dashboard-grid">

          <div className="chart-card">

            <h3>Threat Activity</h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>

                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="threats"
                  strokeWidth={3}
                />

              </LineChart>
            </ResponsiveContainer>

          </div>

          <div className="recent-card">

            <h3>Recent Threats</h3>

            {threats.length === 0 ? (
              <p>No threats detected.</p>
            ) : (
              threats.slice(0, 5).map((threat) => (
                <div className="threat" key={threat._id}>

                  <span>
                    {threat.severity === "Critical"
                      ? "🔴"
                      : threat.severity === "High"
                      ? "🟠"
                      : "🟡"}
                  </span>

                  <div>
                    <strong>{threat.type}</strong>
                    <p>
                      {threat.severity} • {threat.status}
                    </p>
                  </div>

                </div>
              ))
            )}

          </div>

        </section>

      </main>
     <AIAlertAnalyzer />
    </div>
  );
}

export default Dashboard;