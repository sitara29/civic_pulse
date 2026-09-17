import React from "react";
import { useNavigate } from "react-router-dom";

function AdminHome() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("civicpulse_current_user")
  );

  const handleLogout = () => {

    localStorage.removeItem(
      "civicpulse_current_user"
    );

    navigate("/login");
  };

  return (
    <div style={{ padding: "40px" }}>

      <h1>
        Welcome, {user?.name || "Admin Officer"}!
      </h1>

      <p>
        Admin / Officer Dashboard
      </p>

      <hr />

      <p>
        Module 1 — User Management
      </p>

      <button onClick={handleLogout}>
        Logout
      </button>

    </div>
  );
}

export default AdminHome;