import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("civicpulse_current_user")
  );

  if (!user) {
    return (
      <div className="profile-page">
        <h2>Please login first.</h2>

        <Link to="/login">
          Go to Login
        </Link>
      </div>
    );
  }

  const handleLogout = () => {

    localStorage.removeItem(
      "civicpulse_current_user"
    );

    navigate("/login");
  };

  const goBack = () => {

    if (user.role === "citizen") {
      navigate("/citizen");
    } else if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/staff");
    }

  };

  return (
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <h1>
          My Profile
        </h1>

        <div className="profile-details">

          <div>
            <span>Name</span>
            <strong>{user.name}</strong>
          </div>

          <div>
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>

          {user.phone && (
            <div>
              <span>Phone</span>
              <strong>{user.phone}</strong>
            </div>
          )}

          <div>
            <span>Role</span>
            <strong>
              {user.role === "citizen"
                ? "Citizen"
                : user.role === "admin"
                ? "Admin / Officer"
                : "Field Staff"}
            </strong>
          </div>

        </div>

        <div className="profile-actions">

          <button onClick={goBack}>
            Back to Dashboard
          </button>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;