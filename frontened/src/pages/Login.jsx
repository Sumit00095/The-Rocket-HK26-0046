
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .login-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          background-image:url(/Rocket.jpeg);
          background-size:cover;

          // background: transparent;
          // background: linear-gradient(
          //   135deg,
          //   #020617,
          //   #172554,
          //   #1e40af
          );
          font-family: Arial, sans-serif;
        }

        .login-form {
          width: 100%;
          max-width: 420px;
          padding: 40px 32px;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
          text-align: center;
          animation: appear 0.6s ease;
          background:transparent;
          border:7px solid black;
        }

        .login-logo {
          width: 75px;
          height: 75px;
          margin: 0 auto 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #dbeafe;
          border-radius: 20px;
          font-size: 42px;
        }

        .login-form h1 {
          margin: 0 0 10px;
          color:red;
          font-size: 50px;
          font-weight: 800;
        }

        .login-form p {
          margin-bottom: 30px;
          color: yellow;
          font-size: 25px;
        }

        .login-form label {
          display: block;
          margin-bottom: 8px;
          color:turquoise ;
          font-size: 20px;
          font-weight: bold;
          text-align: left;
        }

        .login-form input {
          width: 100%;
          padding: 14px;
          margin-bottom: 20px;
          border: 3px solid black;
          border-radius: 10px;
          background: #f8fafc;
          color: #0f172a;
          font-size: 15px;
          outline: none;
          transition: 0.3s;
          background:transparent;

        }

        .login-form input:focus {
          border-color: #2563eb;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
        }

        .login-form button {
          width: 100%;
          padding: 15px;
          margin-top: 5px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: #ffffff;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
        }

        .login-form button:hover {
          background: #1e40af;
          transform: translateY(-2px);
          box-shadow: 0 8px 18px rgba(37, 99, 235, 0.25);
        }

        .login-form button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .login-footer {
          margin-top: 25px;
          color: #94a3b8;
          font-size: 12px;
        }

        @keyframes appear {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 480px) {
          .login-form {
            padding: 30px 22px;
          }

          .login-form h1 {
            font-size: 26px;
          }
        }
      `}</style>

      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <div className="login-logo">🛡️</div>

          <h1>ROCKET</h1>
          <p>Security Management System</p>

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login Securely →"}
          </button>
          
<p>
  Don't have an account?{" "}
  <button
    type="button"
    onClick={() => navigate("/register")}
  >
    Register
  </button>
</p>


          <div className="login-footer">
            🔒 Secure Access • CyberShield
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
