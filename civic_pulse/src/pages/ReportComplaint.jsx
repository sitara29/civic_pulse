import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { addComplaint } from "../utils/storage";
import { generateComplaintId } from "../utils/complaintIdGenerator";

import "./ReportComplaint.css";

function ReportComplaint() {

  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("civicpulse_current_user")
  );

  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    location: "",
    landmark: "",
    priority: "",
  });

  const [image, setImage] = useState("");

  const [error, setError] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const [complaintId, setComplaintId] = useState("");


  /* =========================
     HANDLE INPUT
  ========================= */

  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setError("");
  };


  /* =========================
     HANDLE IMAGE
  ========================= */

  const handleImageChange = (event) => {

    const file = event.target.files[0];

    if (!file) {
      return;
    }

    // Maximum 5 MB
    if (file.size > 5 * 1024 * 1024) {

      setError(
        "Image size must be less than 5 MB."
      );

      return;
    }

    // Only images
    if (!file.type.startsWith("image/")) {

      setError(
        "Please upload a valid image file."
      );

      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);

    setError("");
  };


  /* =========================
     SUBMIT COMPLAINT
  ========================= */

  const handleSubmit = (event) => {

    event.preventDefault();

    setError("");


    // Make sure user is logged in
    if (!currentUser) {

      setError(
        "Please login before submitting a complaint."
      );

      return;
    }


    // Required fields
    if (
      !formData.category ||
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.location.trim() ||
      !formData.priority
    ) {

      setError(
        "Please fill in all required fields."
      );

      return;
    }


    // Image required
    if (!image) {

      setError(
        "Please upload an image of the issue."
      );

      return;
    }


    // Generate ID
    const id = generateComplaintId();


    // Create complaint object
    const complaint = {

      id: id,

      citizenId: currentUser.id,

      citizenName: currentUser.name,

      citizenEmail: currentUser.email,

      category: formData.category,

      title: formData.title.trim(),

      description: formData.description.trim(),

      location: formData.location.trim(),

      landmark: formData.landmark.trim(),

      image: image,

      priority: formData.priority,

      status: "Submitted",

      assignedStaffId: null,

      assignedStaffName: null,

      remarks: "",

      feedback: null,

      submittedDate:
        new Date().toISOString().split("T")[0],

      resolvedDate: null,
    };


    // Save complaint
    addComplaint(complaint);


    // Show success
    setComplaintId(id);

    setSubmitted(true);
  };


  /* =========================
     SUCCESS SCREEN
  ========================= */

  if (submitted) {

    return (
      <div className="report-page">

        <header className="report-header">

          <Link
            to="/citizen"
            className="report-logo"
          >

            <div className="report-logo-symbol">
              ✦
            </div>

            <div>

              <div className="report-logo-name">
                Civic<span>Pulse</span>
              </div>

              <div className="report-logo-tagline">
                Civic Complaints Management System
              </div>

            </div>

          </Link>

        </header>


        <main className="success-container">

          <div className="success-card">

            <div className="success-icon">
              ✓
            </div>

            <h1>
              Complaint Submitted Successfully!
            </h1>

            <p>
              Your complaint has been registered
              successfully.
            </p>

            <div className="complaint-id-box">

              <span>
                Complaint ID
              </span>

              <strong>
                {complaintId}
              </strong>

            </div>

            <div className="success-status">

              <span>
                Status
              </span>

              <strong>
                Submitted
              </strong>

            </div>

            <p className="success-note">
              Please save your Complaint ID to
              track the progress of your complaint.
            </p>


            <div className="success-actions">

              <button
                onClick={() =>
                  navigate("/citizen")
                }
                className="success-primary"
              >
                Go to Dashboard
              </button>

              <button
                onClick={() =>
                  navigate("/citizen/complaints")
                }
                className="success-secondary"
              >
                My Complaints
              </button>

            </div>

          </div>

        </main>

      </div>
    );
  }


  /* =========================
     MAIN FORM
  ========================= */

  return (
    <div className="report-page">


      {/* HEADER */}

      <header className="report-header">

        <Link
          to="/citizen"
          className="report-logo"
        >

          <div className="report-logo-symbol">
            ✦
          </div>

          <div>

            <div className="report-logo-name">
              Civic<span>Pulse</span>
            </div>

            <div className="report-logo-tagline">
              Civic Complaints Management System
            </div>

          </div>

        </Link>


        <div className="report-user">

          <span>
            📍 Hyderabad
          </span>

          <span className="user-divider">
            |
          </span>

          <div className="user-avatar">
            {currentUser?.name
              ?.charAt(0)
              .toUpperCase() || "C"}
          </div>

          <div className="user-info">

            <strong>
              {currentUser?.name || "Citizen"}
            </strong>

            <small>
              Citizen
            </small>

          </div>

        </div>

      </header>


      <div className="report-layout">


        {/* SIDEBAR */}

        <aside className="report-sidebar">

          <Link
            to="/citizen"
            className="sidebar-item"
          >
            🏠
            <span>Dashboard</span>
          </Link>

          <Link
            to="/citizen/report"
            className="sidebar-item active"
          >
            ➕
            <span>Report Complaint</span>
          </Link>

          <Link
            to="/citizen/complaints"
            className="sidebar-item"
          >
            📋
            <span>My Complaints</span>
          </Link>

          <Link
            to="/citizen/track"
            className="sidebar-item"
          >
            🔍
            <span>Track Complaint</span>
          </Link>

          <Link
            to="/citizen/feedback"
            className="sidebar-item"
          >
            💬
            <span>Feedback</span>
          </Link>


          <div className="sidebar-divider"></div>


          <Link
            to="/profile"
            className="sidebar-item"
          >
            👤
            <span>My Profile</span>
          </Link>

          <button
            className="sidebar-item logout-item"
            onClick={() => {

              localStorage.removeItem(
                "civicpulse_current_user"
              );

              navigate("/login");

            }}
          >
            🚪
            <span>Logout</span>
          </button>


          <div className="sidebar-bottom">

            <strong>
              A Cleaner Hyderabad
            </strong>

            <span>
              Together
            </span>

          </div>

        </aside>


        {/* CONTENT */}

        <main className="report-content">

          <div className="breadcrumb">

            <Link to="/citizen">
              Dashboard
            </Link>

            <span>
              ›
            </span>

            <strong>
              Report Complaint
            </strong>

          </div>


          {/* PAGE HEADING */}

          <div className="report-heading">

            <div className="heading-icon">
              📄
            </div>

            <div>

              <h1>
                Report a Complaint
              </h1>

              <p>
                Help us make Hyderabad a cleaner
                and better place. Fill in the details
                below to register your complaint.
              </p>

            </div>

          </div>


          <div className="report-main-grid">


            {/* FORM */}

            <section className="complaint-form-card">

              <form onSubmit={handleSubmit}>


                <div className="form-grid">


                  {/* CATEGORY */}

                  <div className="form-group">

                    <label>
                      Complaint Category
                      <span>*</span>
                    </label>

                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >

                      <option value="">
                        Select Category
                      </option>

                      <option value="Water Supply">
                        Water Supply
                      </option>

                      <option value="Roads">
                        Roads
                      </option>

                      <option value="Garbage">
                        Garbage
                      </option>

                      <option value="Streetlights">
                        Streetlights
                      </option>

                      <option value="Drainage">
                        Drainage
                      </option>

                      <option value="Public Safety">
                        Public Safety
                      </option>

                      <option value="Other">
                        Other
                      </option>

                    </select>

                  </div>


                  {/* PRIORITY */}

                  <div className="form-group">

                    <label>
                      Priority
                      <span>*</span>
                    </label>

                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                    >

                      <option value="">
                        Select Priority
                      </option>

                      <option value="Low">
                        Low
                      </option>

                      <option value="Medium">
                        Medium
                      </option>

                      <option value="High">
                        High
                      </option>

                      <option value="Critical">
                        Critical
                      </option>

                    </select>

                    <small className="field-hint">
                      Select priority based on the
                      severity of the issue.
                    </small>

                  </div>


                  {/* TITLE */}

                  <div className="form-group full-width">

                    <label>
                      Complaint Title
                      <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="title"
                      placeholder="Enter a short title for your complaint"
                      value={formData.title}
                      onChange={handleChange}
                    />

                  </div>


                  {/* DESCRIPTION */}

                  <div className="form-group full-width">

                    <label>
                      Description
                      <span>*</span>
                    </label>

                    <textarea
                      name="description"
                      rows="5"
                      placeholder="Describe the issue in detail..."
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>

                  </div>


                  {/* LOCATION */}

                  <div className="form-group">

                    <label>
                      Location
                      <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="location"
                      placeholder="Enter the location"
                      value={formData.location}
                      onChange={handleChange}
                    />

                  </div>


                  {/* LANDMARK */}

                  <div className="form-group">

                    <label>
                      Landmark
                    </label>

                    <input
                      type="text"
                      name="landmark"
                      placeholder="Nearby landmark"
                      value={formData.landmark}
                      onChange={handleChange}
                    />

                  </div>


                  {/* IMAGE */}

                  <div className="form-group full-width">

                    <label>
                      Upload Image
                      <span>*</span>
                    </label>

                    <div className="upload-area">

                      {image ? (

                        <div className="image-preview">

                          <img
                            src={image}
                            alt="Complaint preview"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setImage("")
                            }
                            className="remove-image"
                          >
                            ×
                          </button>

                        </div>

                      ) : (

                        <label
                          htmlFor="complaint-image"
                          className="upload-label"
                        >

                          <div className="upload-icon">
                            ☁
                          </div>

                          <strong>
                            Click to upload an image
                          </strong>

                          <span>
                            PNG, JPG up to 5MB
                          </span>

                          <input
                            id="complaint-image"
                            type="file"
                            accept="image/png,image/jpeg,image/jpg"
                            onChange={handleImageChange}
                          />

                        </label>

                      )}

                    </div>

                  </div>

                </div>


                {/* ERROR */}

                {error && (

                  <div className="form-error">
                    ⚠ {error}
                  </div>

                )}


                {/* SUBMIT */}

                <button
                  type="submit"
                  className="submit-complaint"
                >
                  <span>
                    ➤
                  </span>

                  Submit Complaint
                </button>

              </form>

            </section>


            {/* RIGHT INFORMATION */}

            <aside className="report-info">


              <div className="info-card before-report">

                <h3>
                  💡 Before You Report
                </h3>

                <ul>

                  <li>
                    Provide accurate and clear details
                  </li>

                  <li>
                    Upload a recent image of the issue
                  </li>

                  <li>
                    Mention the exact location and landmark
                  </li>

                  <li>
                    Select the appropriate priority
                  </li>

                  <li>
                    Avoid false complaints
                  </li>

                </ul>

              </div>


              <div className="info-card help-card">

                <h3>
                  ❓ Need Help?
                </h3>

                <p>
                  If you are unsure about the
                  category or priority, please
                  contact the appropriate civic
                  authority.
                </p>

              </div>

            </aside>

          </div>

        </main>

      </div>


      <footer className="report-footer">

        <span>
          © 2026 CivicPulse. All rights reserved.
        </span>

        <div>
          <span>Privacy Policy</span>
          <span>Terms of Use</span>
          <span>Contact</span>
        </div>

      </footer>

    </div>
  );
}

export default ReportComplaint;