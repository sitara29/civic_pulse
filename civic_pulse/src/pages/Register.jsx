import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleRegister = (event) => {

    event.preventDefault();

    setError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 8) {
      setError(
        "Password must contain at least 8 characters."
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const existingUsers =
      JSON.parse(
        localStorage.getItem("civicpulse_users")
      ) || [];

    const emailExists = existingUsers.some(
      (user) => user.email === formData.email
    );

    if (emailExists) {
      setError("An account with this email already exists.");
      return;
    }

    const newUser = {
      id: `C${String(existingUsers.length + 1).padStart(3, "0")}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: "citizen",
    };

    existingUsers.push(newUser);

    localStorage.setItem(
      "civicpulse_users",
      JSON.stringify(existingUsers)
    );

    alert("Citizen account created successfully!");

    navigate("/login");
  };

  return (
    <div className="register-page">

      <header className="register-header">

        <Link to="/login" className="register-logo">

          <div className="register-logo-symbol">
            ✦
          </div>

          <div>
            <div className="register-logo-name">
              Civic<span>Pulse</span>
            </div>

            <div className="register-logo-tagline">
              Civic Complaints Management System
            </div>
          </div>

        </Link>

        <Link
          to="/login"
          className="back-login"
        >
          Already have an account? Login
        </Link>

      </header>


      <main className="register-main">

        <div className="register-card">

          <div className="register-heading">

            <div className="register-icon">
              👤
            </div>

            <h1>
              Create Citizen Account
            </h1>

            <p>
              Join CivicPulse and help make your city better.
            </p>

          </div>


          <form onSubmit={handleRegister}>

            <div className="form-row">

              <div className="form-group">

                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />

              </div>


              <div className="form-group">

                <label>Phone Number</label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />

              </div>

            </div>


            <div className="form-group">

              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="yourname@example.com"
                value={formData.email}
                onChange={handleChange}
              />

            </div>


            <div className="form-row">

              <div className="form-group">

                <label>Password</label>

                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />

              </div>


              <div className="form-group">

                <label>Confirm Password</label>

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

              </div>

            </div>


            <div className="password-info">

              Password should contain at least 8 characters.

            </div>


            {error && (
              <div className="register-error">
                {error}
              </div>
            )}


            <button
              type="submit"
              className="create-account-button"
            >
              Create Account
              <span>→</span>
            </button>

          </form>


          <div className="register-footer">

            Already registered?

            <Link to="/login">
              Login here
            </Link>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Register;