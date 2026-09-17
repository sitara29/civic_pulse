import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";

/* =========================================
   MODULE 1
   Login / Registration / Profile
========================================= */

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";


/* =========================================
   CITIZEN MODULES
========================================= */

import CitizenHome from "./pages/CitizenHome";

import ReportComplaint from "./pages/ReportComplaint";

import MyComplaints from "./pages/MyComplaints";

import ComplaintDetails from "./pages/ComplaintDetails";

import TrackComplaint from "./pages/TrackComplaint";


/* =========================================
   ADMIN / OFFICER MODULE
========================================= */

import AdminHome from "./pages/AdminHome";


/* =========================================
   FIELD STAFF MODULE
========================================= */

import StaffHome from "./pages/StaffHome";


function App() {

  return (

    <Routes>


      {/* =====================================
          DEFAULT ROUTE
      ===================================== */}

      <Route
        path="/"
        element={<Home />}
      />


      {/* =====================================
          MODULE 1
          AUTHENTICATION
      ===================================== */}

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


      {/* =====================================
          CITIZEN DASHBOARD
      ===================================== */}

      <Route
        path="/citizen"
        element={<CitizenHome />}
      />


      {/* =====================================
          MODULE 2
          REPORT COMPLAINT
      ===================================== */}

      <Route
        path="/citizen/report"
        element={<ReportComplaint />}
      />


      {/* =====================================
          MODULE 3
          COMPLAINT HISTORY
      ===================================== */}

      <Route
        path="/citizen/complaints"
        element={<MyComplaints />}
      />

      <Route
        path="/citizen/complaints/:id"
        element={<ComplaintDetails />}
      />


      {/* =====================================
          MODULE 4
          TRACK COMPLAINT
      ===================================== */}

      <Route
        path="/citizen/track"
        element={<TrackComplaint />}
      />

      <Route
        path="/citizen/track/:id"
        element={<TrackComplaint />}
      />


      {/* =====================================
          ADMIN / OFFICER
      ===================================== */}

      <Route
        path="/admin"
        element={<AdminHome />}
      />


      {/* =====================================
          FIELD STAFF
      ===================================== */}

      <Route
        path="/staff"
        element={<StaffHome />}
      />


      {/* =====================================
          FALLBACK
          If URL doesn't exist
      ===================================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />

    </Routes>

  );
}


export default App;