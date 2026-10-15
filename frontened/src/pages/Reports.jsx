import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Reports() {
  return (
    <div className="app">
      <Sidebar />

      <main className="main">
        <Topbar />

        <div className="page">
          <h2>Security Reports</h2>
          <p>Generate and view cybersecurity reports.</p>
        </div>
      </main>
    </div>
  );
}

export default Reports;