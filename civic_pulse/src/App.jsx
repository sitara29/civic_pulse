import React from "react";

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import CitizenHome from "./pages/CitizenHome";
import AdminHome from "./pages/AdminHome";
import StaffHome from "./pages/StaffHome";

import ReportComplaint from "./pages/ReportComplaint";

import MyComplaints from "./pages/MyComplaints";
import ComplaintDetails from "./pages/ComplaintDetails";


function App() {

  return (

    <Routes>

      {/* =========================
          DEFAULT
      ========================= */}

      <Route
        path="/"
        element={
          <Navigate to="/login" />
        }
      />


      {/* =========================
          MODULE 1
      ========================= */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />


      {/* =========================
          CITIZEN DASHBOARD
      ========================= */}

      <Route
        path="/citizen"
        element={<CitizenHome />}
      />


      {/* =========================
          MODULE 2
          COMPLAINT REGISTRATION
      ========================= */}

      <Route
        path="/citizen/report"
        element={<ReportComplaint />}
      />


      {/* =========================
          MODULE 3
          COMPLAINT HISTORY
      ========================= */}

      <Route
        path="/citizen/complaints"
        element={<MyComplaints />}
      />

      <Route
        path="/citizen/complaints/:id"
        element={<ComplaintDetails />}
      />


      {/* =========================
          ADMIN
      ========================= */}

      <Route
        path="/admin"
        element={<AdminHome />}
      />


      {/* =========================
          FIELD STAFF
      ========================= */}

      <Route
        path="/staff"
        element={<StaffHome />}
      />

    </Routes>

  );
}

export default App;