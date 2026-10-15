import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  ShieldAlert,
  Bell,
  FileText,
  LogOut
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="brand">
        🛡️ CyberShield
      </div>

      <nav>

        <NavLink to="/dashboard">
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink to="/threats">
          <ShieldAlert size={20} />
          Threats
        </NavLink>

        <NavLink to="/alerts">
          <Bell size={20} />
          Alerts
        </NavLink>

        <NavLink to="/reports">
          <FileText size={20} />
          Reports
        </NavLink>
        <Link to="/phishing">
  <span>🛡️</span>
  <span>AI Phishing Detection</span>
</Link>

      </nav>

      <button className="logout" onClick={() => window.location.href = "/"}>
        <LogOut size={20} />
        Logout
      </button>

    </aside>
  );
}

export default Sidebar;