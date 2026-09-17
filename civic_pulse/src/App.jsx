import React from "react";

import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import CitizenHome from "./pages/CitizenHome";

import ReportComplaint from "./pages/ReportComplaint";

import MyComplaints from "./pages/MyComplaints";
import ComplaintDetails from "./pages/ComplaintDetails";

import TrackComplaint from "./pages/TrackComplaint";

import AdminHome from "./pages/AdminHome";
import StaffHome from "./pages/StaffHome";


function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Navigate to="/login" />}
      />


      {/* MODULE 1 */}

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


      {/* CITIZEN */}

      <Route
        path="/citizen"
        element={<CitizenHome />}
      />


      {/* MODULE 2 */}

      <Route
        path="/citizen/report"
        element={<ReportComplaint />}
      />


      {/* MODULE 3 */}

      <Route
        path="/citizen/complaints"
        element={<MyComplaints />}
      />

      <Route
        path="/citizen/complaints/:id"
        element={<ComplaintDetails />}
      />


      {/* MODULE 4 */}

      <Route
        path="/citizen/track"
        element={<TrackComplaint />}
      />

      <Route
        path="/citizen/track/:id"
        element={<TrackComplaint />}
      />


      {/* ADMIN */}

      <Route
        path="/admin"
        element={<AdminHome />}
      />


      {/* FIELD STAFF */}

      <Route
        path="/staff"
        element={<StaffHome />}
      />

    </Routes>

  );

}

export default App;