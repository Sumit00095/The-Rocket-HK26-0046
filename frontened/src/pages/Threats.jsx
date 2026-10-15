import { useEffect, useState } from "react";
import axios from "axios";
import "./Threats.css";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Threats() {
  const [threats, setThreats] = useState([]);

  const [form, setForm] = useState({
    type: "",
    source: "",
    severity: "Low",
    description: ""
  });

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
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const addThreat = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/threats",
        form
      );

      alert("Threat added successfully!");

      setForm({
        type: "",
        source: "",
        severity: "Low",
        description: ""
      });

      fetchThreats();

    } catch (error) {
      alert("Failed to add threat");
    }
  };

  return (
    <div className="app">

      <Sidebar />

      <main className="main">

        <Topbar />

        <div className="threat-page">

          <h2 className="S">Threat Management</h2>

          {/* Add Threat */}

          <form
            onSubmit={addThreat}
            className="threat-form"
          >

            <input
              type="text"
              name="type"
              placeholder="Threat Type"
              value={form.type}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="source"
              placeholder="Source / IP"
              value={form.source}
              onChange={handleChange}
              required
            />

            <select
              name="severity"
              value={form.severity}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>

            <input
              type="text"
              name="description"
              placeholder="Threat Description"
              value={form.description}
              onChange={handleChange}
              required
            />

            <button type="submit">
              Add Threat
            </button>

          </form>

          {/* Threat List */}

          <div className="threat-list">

            <h3>Detected Threats</h3>

            {threats.map((threat) => (
              <div
                className="threat-item"
                key={threat._id}
              >

                <div>
                  <strong>
                    {threat.type}
                  </strong>

                  <p>
                    Source: {threat.source}
                  </p>

                  <p>
                    {threat.description}
                  </p>
                </div>

                <span>
                  {threat.severity}
                </span>

              </div>
            ))}

          </div>

        </div>

      </main>

    </div>
  );
 
}

export default Threats;