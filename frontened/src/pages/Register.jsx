
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert("Registration successful! Please log in.");
      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration failed"
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

        .register-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 25px;
          background: linear-gradient(
            135deg,
            #020617,
            #172554,
            #2563eb
          );
          font-family: Arial, sans-serif;
        }

        .register-form {
          width: 100%;
          max-width: 440px;
          padding: 38px 32px;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 20px 55px rgba(0, 0, 0, 0.35);
          text-align: center;
          animation: registerAppear 0.6s ease;
        }

        .register-logo {
          width: 78px;
          height: 78px;
          margin: 0 auto 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #dbeafe;
          border-radius: 22px;
          font-size: 42px;
        }

        .register-form h1 {
          margin: 0 0 10px;
          color: #0f172a;
          font-size: 29px;
          font-weight: 800;
        }

        .register-subtitle {
          margin: 0 0 28px;
          color: #64748b;
          font-size: 14px;
        }

        .register-form label {
          display: block;
          margin-bottom: 8px;
          color: #334155;
          font-size: 14px;
          font-weight: bold;
          text-align: left;
        }

        .register-form input {
          display: block;
          width: 100%;
          padding: 14px;
          margin-bottom: 20px;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          background: #f8fafc;
          color: #0f172a;
          font-size: 15px;
          outline: none;
          transition: 0.3s;
        }

        .register-form input:focus {
          border-color: #2563eb;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
        }

        .register-button {
          width: 100%;
          padding: 15px;
          margin-top: 5px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(
            135deg,
            #2563eb,
            #1d4ed8
          );
          color: #ffffff;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
        }

        .register-button:hover:not(:disabled) {
          background: #1e40af;
          transform: translateY(-2px);
          box-shadow: 0 8px 18px rgba(37, 99, 235, 0.25);
        }

        .register-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .register-login {
          margin-top: 24px;
          color: #64748b;
          font-size: 14px;
        }

        .register-login span {
          color: #2563eb;
          font-weight: bold;
          cursor: pointer;
        }

        .register-login span:hover {
          color: #1e40af;
          text-decoration: underline;
        }

        .register-footer {
          margin-top: 24px;
          color: #94a3b8;
          font-size: 12px;
        }

        @keyframes registerAppear {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 480px) {
          .register-form {
            padding: 30px 22px;
          }

          .register-form h1 {
            font-size: 25px;
          }
        }
      `}</style>

      <div className="register-container">
        <form
          onSubmit={handleRegister}
          className="register-form"
        >
          <div className="register-logo">🛡️</div>

          <h1>CyberShield</h1>

          <p className="register-subtitle">
            Create your security account
          </p>

          <label htmlFor="register-name">
            Full Name
          </label>
          <input
            id="register-name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />

          <label htmlFor="register-email">
            Email Address
          </label>
          <input
            id="register-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <label htmlFor="register-password">
            Password
          </label>
          <input
            id="register-password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            minLength={8}
            required
          />

          <button
            type="submit"
            className="register-button"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account →"}
          </button>

          <p className="register-login">
            Already have an account?{" "}
            <span onClick={() => navigate("/")}>
              Login
            </span>
          </p>

          <div className="register-footer">
            🔒 Secure Registration • CyberShield
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
