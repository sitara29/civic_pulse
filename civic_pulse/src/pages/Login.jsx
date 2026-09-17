import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const demoUsers = [
    {
      email: "citizen@civicpulse.com",
      password: "Civic@2026#Citizen",
      role: "citizen",
      name: "Citizen User",
    },
    {
      email: "admin@civicpulse.com",
      password: "Civic@2026#Admin",
      role: "admin",
      name: "Admin Officer",
    },
    {
      email: "staff@civicpulse.com",
      password: "Civic@2026#Staff",
      role: "staff",
      name: "Field Staff",
    },
  ];

  const handleLogin = (event) => {
    event.preventDefault();

    setError("");

    if (email.trim() === "" || password.trim() === "") {
      setError("Please enter both email and password.");
      return;
    }

    const user = demoUsers.find(
      (item) =>
        item.email === email.trim() &&
        item.password === password
    );

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    localStorage.setItem(
      "civicpulse_current_user",
      JSON.stringify(user)
    );

    if (user.role === "citizen") {
      navigate("/citizen");
    } else if (user.role === "admin") {
      navigate("/admin");
    } else if (user.role === "staff") {
      navigate("/staff");
    }
  };

  return (
    <div className="login-page">

      {/* HEADER */}

      <header className="login-header">

        <Link to="/login" className="login-logo">

          <div className="logo-symbol">
            ✦
          </div>

          <div>
            <div className="logo-name">
              Civic<span>Pulse</span>
            </div>

            <div className="logo-tagline">
              Civic Complaints Management System
            </div>
          </div>

        </Link>

        <div className="header-links">
          <span>Hyderabad</span>
          <span>|</span>
          <span>Our City</span>
          <span>|</span>
          <span>Our Responsibility</span>
        </div>

      </header>


      {/* MAIN */}

      <main className="login-container">

        {/* LEFT SIDE */}

        <section className="login-intro">

          <div className="intro-logo">
            <div className="big-leaf">
              ◢
            </div>

            <div>
              <h1>
                Civic<span>Pulse</span>
              </h1>

              <p>
                Civic Complaints Management System
              </p>
            </div>
          </div>

          <h2>
            Stronger
            <br />
            Communities.
            <br />
            <span>Cleaner Cities.</span>
          </h2>

          <p className="intro-text">
            Report civic issues, track progress, and
            work together for a better Hyderabad.
          </p>

          <div className="intro-features">

            <div className="intro-feature">
              <div>📢</div>
              <span>Report<br />Issues</span>
            </div>

            <div className="intro-feature">
              <div>⌕</div>
              <span>Track<br />Complaints</span>
            </div>

            <div className="intro-feature">
              <div>👥</div>
              <span>Transparent<br />Governance</span>
            </div>

            <div className="intro-feature">
              <div>🌿</div>
              <span>Cleaner<br />Tomorrow</span>
            </div>

          </div>

          <div className="intro-message">
            <strong>A Cleaner Hyderabad</strong>
            <span>Together</span>
          </div>

        </section>


        {/* RIGHT SIDE */}

        <section className="login-section">

          <div className="login-card">

            <h2>
              Welcome to Civic<span>Pulse</span>
            </h2>

            <p className="login-subtitle">
              Login to continue
            </p>


            <form onSubmit={handleLogin}>

              {/* EMAIL */}

              <label>Email Address</label>

              <div className="login-input">

                <span>✉</span>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                />

              </div>


              {/* PASSWORD */}

              <label>Password</label>

              <div className="login-input">

                <span>🔒</span>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>


              {/* ERROR */}

              {error && (
                <p className="login-error">
                  {error}
                </p>
              )}


              <div className="login-options">

                <label className="remember">
                  <input type="checkbox" />
                  Remember me
                </label>

                <button
                  type="button"
                  className="forgot"
                  onClick={() =>
                    alert(
                      "Password recovery is not implemented in this demo."
                    )
                  }
                >
                  Forgot Password?
                </button>

              </div>


              <button
                type="submit"
                className="login-button"
              >
                Login
                <span>→</span>
              </button>

            </form>


            <div className="login-divider">
              <span></span>
              <p>OR</p>
              <span></span>
            </div>


            <p className="register-text">
              Don't have an account?
            </p>

            <Link
              to="/register"
              className="register-button"
            >
              Create Citizen Account
            </Link>

          </div>


          {/* DEMO ACCOUNTS */}

          <div className="demo-card">

            <h3>
              👥 Demo Accounts
              <span>(For Testing)</span>
            </h3>

            <div className="demo-accounts">

              <div className="demo-account">
                <strong>Citizen</strong>

                <p>
                  Email:
                  <br />
                  citizen@civicpulse.com
                </p>

                <p>
                  Password:
                  <br />
                  Civic@2026#Citizen
                </p>
              </div>


              <div className="demo-account">
                <strong>Admin / Officer</strong>

                <p>
                  Email:
                  <br />
                  admin@civicpulse.com
                </p>

                <p>
                  Password:
                  <br />
                  Civic@2026#Admin
                </p>
              </div>


              <div className="demo-account">
                <strong>Field Staff</strong>

                <p>
                  Email:
                  <br />
                  staff@civicpulse.com
                </p>

                <p>
                  Password:
                  <br />
                  Civic@2026#Staff
                </p>
              </div>

            </div>

          </div>

        </section>

      </main>


      {/* FOOTER */}

      <footer className="login-footer">
        © 2026 CivicPulse. All rights reserved.
      </footer>

    </div>
  );
}

export default Login;