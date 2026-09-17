import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import "./TrackComplaint.css";

function TrackComplaint() {

  const navigate = useNavigate();
  const { id } = useParams();

  /* =================================
     CURRENT USER
  ================================= */

  const [currentUser, setCurrentUser] = useState(null);


  /* =================================
     STATES
  ================================= */

  const [complaintId, setComplaintId] = useState(
    id || ""
  );

  const [complaint, setComplaint] = useState(null);

  const [searched, setSearched] = useState(false);

  const [error, setError] = useState("");


  /* =================================
     LOAD CURRENT USER
  ================================= */

  useEffect(() => {

    const storedUser = JSON.parse(
      localStorage.getItem(
        "civicpulse_current_user"
      )
    );

    if (!storedUser) {
      navigate("/login");
      return;
    }

    setCurrentUser(storedUser);

  }, [navigate]);


  /* =================================
     AUTO SEARCH IF ID IN URL
  ================================= */

  useEffect(() => {

    if (id && currentUser) {
      searchComplaint(id);
    }

  }, [id, currentUser]);


  /* =================================
     SEARCH COMPLAINT
  ================================= */

  const searchComplaint = (searchId) => {

    const storedComplaints =
      JSON.parse(
        localStorage.getItem(
          "civicpulse_complaints"
        )
      ) || [];


    const enteredId =
      searchId.trim().toUpperCase();


    if (!enteredId) {

      setComplaint(null);

      setError(
        "Please enter a Complaint ID."
      );

      setSearched(true);

      return;
    }


    /*
      IMPORTANT:

      We search the SAME complaint array
      created by Module 2.
    */

    const foundComplaint =
      storedComplaints.find(
        (item) =>
          item.id?.toUpperCase() === enteredId
      );


    /*
      SECURITY:

      Citizen can only track their
      own complaints.
    */

    if (
      !foundComplaint ||
      foundComplaint.citizenId !== currentUser.id
    ) {

      setComplaint(null);

      setError(
        "Complaint not found. Please check the Complaint ID."
      );

      setSearched(true);

      return;
    }


    setComplaint(foundComplaint);

    setError("");

    setSearched(true);

  };


  /* =================================
     FORM SUBMIT
  ================================= */

  const handleTrack = (event) => {

    event.preventDefault();

    searchComplaint(complaintId);

  };


  /* =================================
     STATUS ORDER
  ================================= */

  const statuses = [
    "Submitted",
    "Under Review",
    "Assigned",
    "In Progress",
    "Resolved",
  ];


  /* =================================
     GET CURRENT STATUS INDEX
  ================================= */

  const getStatusIndex = () => {

    if (!complaint) {
      return -1;
    }

    return statuses.indexOf(
      complaint.status
    );

  };


  /* =================================
     FORMAT DATE
  ================================= */

  const formatDate = (dateString) => {

    if (!dateString) {
      return "";
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return dateString;
    }

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  };


  /* =================================
     STATUS DESCRIPTION
  ================================= */

  const getStatusDescription = (status) => {

    switch (status) {

      case "Submitted":
        return "Your complaint has been submitted successfully.";

      case "Under Review":
        return "Your complaint is being reviewed by the municipal team.";

      case "Assigned":
        return "Your complaint has been assigned to field staff.";

      case "In Progress":
        return "Work has started on your complaint.";

      case "Resolved":
        return "Your complaint has been resolved.";

      default:
        return "Complaint status updated.";

    }

  };


  /* =================================
     LOGOUT
  ================================= */

  const handleLogout = () => {

    localStorage.removeItem(
      "civicpulse_current_user"
    );

    navigate("/login");

  };


  /* =================================
     LOADING / USER PROTECTION
  ================================= */

  if (!currentUser) {
    return null;
  }


  return (

    <div className="track-page">


      {/* =================================
          HEADER
      ================================= */}

      <header className="track-header">

        <Link
          to="/citizen"
          className="track-logo"
        >

          <div className="track-logo-symbol">
            ✦
          </div>

          <div>

            <div className="track-logo-name">
              Civic<span>Pulse</span>
            </div>

            <div className="track-logo-tagline">
              Civic Complaints Management System
            </div>

          </div>

        </Link>


        <div className="track-user">

          <span className="track-location">
            📍 Hyderabad
          </span>

          <span className="track-divider">
            |
          </span>

          <div className="track-avatar">

            {currentUser.name
              ?.charAt(0)
              .toUpperCase()}

          </div>

          <div className="track-user-info">

            <strong>
              {currentUser.name}
            </strong>

            <small>
              Citizen
            </small>

          </div>

        </div>

      </header>


      {/* =================================
          LAYOUT
      ================================= */}

      <div className="track-layout">


        {/* =================================
            SIDEBAR
        ================================= */}

        <aside className="track-sidebar">


          <Link
            to="/citizen"
            className="track-sidebar-item"
          >
            <span>🏠</span>
            Dashboard
          </Link>


          <Link
            to="/citizen/report"
            className="track-sidebar-item"
          >
            <span>➕</span>
            Report Complaint
          </Link>


          <Link
            to="/citizen/complaints"
            className="track-sidebar-item"
          >
            <span>📋</span>
            My Complaints
          </Link>


          <Link
            to="/citizen/track"
            className="track-sidebar-item active"
          >
            <span>🔍</span>
            Track Complaint
          </Link>


          <Link
            to="/citizen/feedback"
            className="track-sidebar-item"
          >
            <span>💬</span>
            Feedback
          </Link>


          <div className="track-sidebar-separator"></div>


          <Link
            to="/profile"
            className="track-sidebar-item"
          >
            <span>👤</span>
            My Profile
          </Link>


          <button
            className="track-sidebar-item track-logout"
            onClick={handleLogout}
          >
            <span>🚪</span>
            Logout
          </button>


          <div className="track-sidebar-message">

            <strong>
              A Cleaner Hyderabad
            </strong>

            <span>
              Together
            </span>

          </div>

        </aside>


        {/* =================================
            MAIN CONTENT
        ================================= */}

        <main className="track-content">


          {/* BREADCRUMB */}

          <div className="track-breadcrumb">

            <Link to="/citizen">
              Dashboard
            </Link>

            <span>›</span>

            <strong>
              Track Complaint
            </strong>

          </div>


          {/* =================================
              TITLE
          ================================= */}

          <section className="track-title-card">

            <div className="track-title-icon">
              🔍
            </div>

            <div>

              <h1>
                Track Complaint
              </h1>

              <p>
                Enter your Complaint ID to check
                the current status and progress.
              </p>

            </div>

          </section>


          {/* =================================
              SEARCH
          ================================= */}

          <section className="track-search-card">

            <form
              onSubmit={handleTrack}
              className="track-search-form"
            >

              <div className="track-search-field">

                <label>
                  Complaint ID
                </label>

                <div className="track-input-wrapper">

                  <span>
                    🔍
                  </span>

                  <input
                    type="text"
                    placeholder="Enter Complaint ID (e.g., CP20260001)"
                    value={complaintId}
                    onChange={(event) =>
                      setComplaintId(
                        event.target.value
                      )
                    }
                  />

                </div>

                <small>
                  ℹ️ You can find your Complaint ID
                  in My Complaints.
                </small>

              </div>


              <button
                type="submit"
                className="track-button"
              >
                Track
                <span>→</span>
              </button>

            </form>


            {error && (

              <div className="track-error">
                ⚠️ {error}
              </div>

            )}

          </section>


          {/* =================================
              RESULT
          ================================= */}

          {searched && complaint && (

            <section className="track-result-card">


              {/* =================================
                  RESULT HEADER
              ================================= */}

              <div className="track-result-header">

                <div>

                  <span className="result-label">
                    COMPLAINT ID
                  </span>

                  <div className="result-id-row">

                    <h2>
                      {complaint.id}
                    </h2>

                    <span className="found-badge">
                      ✓ Found
                    </span>

                  </div>

                  <p>
                    Submitted by{" "}
                    <strong>
                      {currentUser.name}
                    </strong>
                  </p>

                  <p>
                    Submitted on{" "}
                    <strong>
                      {formatDate(
                        complaint.submittedDate
                      )}
                    </strong>
                  </p>

                </div>


                <div className="current-status-box">

                  <span>
                    ⚙
                  </span>

                  <strong>
                    {complaint.status}
                  </strong>

                </div>

              </div>


              {/* =================================
                  SUMMARY
              ================================= */}

              <div className="track-summary">

                <div>

                  <span>
                    Category
                  </span>

                  <strong>
                    {complaint.category}
                  </strong>

                </div>


                <div>

                  <span>
                    Priority
                  </span>

                  <strong
                    className={`track-priority priority-${(
                      complaint.priority ||
                      complaint.priorityLevel ||
                      ""
                    )
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {complaint.priority ||
                      complaint.priorityLevel ||
                      "Not Set"}
                  </strong>

                </div>


                <div>

                  <span>
                    Location
                  </span>

                  <strong>
                    {complaint.location}
                  </strong>

                </div>

              </div>


              {/* =================================
                  THREE COLUMNS
              ================================= */}

              <div className="track-grid">


                {/* =================================
                    COMPLAINT DETAILS
                ================================= */}

                <div className="track-details-card">

                  <h3>
                    📄 Complaint Details
                  </h3>


                  {complaint.image && (

                    <img
                      src={complaint.image}
                      alt="Complaint"
                      className="track-complaint-image"
                    />

                  )}


                  <div className="track-detail-row">

                    <span>
                      Title
                    </span>

                    <strong>
                      {complaint.title}
                    </strong>

                  </div>


                  <div className="track-detail-row">

                    <span>
                      Description
                    </span>

                    <p>
                      {complaint.description}
                    </p>

                  </div>


                  <div className="track-location-block">

                    <div>
                      <span>📍 Location</span>

                      <strong>
                        {complaint.location}
                      </strong>
                    </div>


                    {complaint.landmark && (

                      <div>
                        <span>🏛 Landmark</span>

                        <strong>
                          {complaint.landmark}
                        </strong>
                      </div>

                    )}

                  </div>

                </div>


                {/* =================================
                    STATUS TIMELINE
                ================================= */}

                <div className="track-timeline-card">

                  <h3>
                    ⚡ Status Progress
                  </h3>


                  <div className="timeline">

                    {statuses.map(
                      (status, index) => {

                        const currentIndex =
                          getStatusIndex();

                        const isCompleted =
                          index <= currentIndex;

                        const isCurrent =
                          index === currentIndex;


                        return (

                          <div
                            className={`timeline-item ${
                              isCompleted
                                ? "completed"
                                : ""
                            } ${
                              isCurrent
                                ? "current"
                                : ""
                            }`}
                            key={status}
                          >

                            <div className="timeline-marker">

                              {isCompleted
                                ? "✓"
                                : ""}

                            </div>


                            {index <
                              statuses.length - 1 && (

                              <div
                                className={`timeline-line ${
                                  index <
                                  currentIndex
                                    ? "filled"
                                    : ""
                                }`}
                              ></div>

                            )}


                            <div className="timeline-content">

                              <strong>
                                {status}
                              </strong>

                              {isCurrent && (

                                <span className="timeline-current">
                                  Current Status
                                </span>

                              )}

                              {isCompleted && (

                                <p>
                                  {getStatusDescription(
                                    status
                                  )}
                                </p>

                              )}

                            </div>

                          </div>

                        );

                      }
                    )}

                  </div>

                </div>


                {/* =================================
                    ASSIGNED STAFF
                ================================= */}

                <div className="track-side-column">


                  <div className="assigned-card">

                    <h3>
                      👤 Assigned Staff
                    </h3>


                    <div className="staff-profile">

                      <div className="staff-avatar">
                        👤
                      </div>

                      <div>

                        <strong>
                          {complaint.assignedStaffName ||
                            complaint.assignedStaff ||
                            "Not Assigned"}
                        </strong>

                        <span>
                          Field Staff
                        </span>

                      </div>

                    </div>


                    {!complaint.assignedStaffName &&
                      !complaint.assignedStaff && (

                      <p className="not-assigned-text">
                        Staff will be assigned after
                        your complaint is reviewed.
                      </p>

                    )}

                  </div>


                  {/* REMARKS */}

                  {complaint.remarks && (

                    <div className="track-remarks-card">

                      <h3>
                        📝 Latest Remarks
                      </h3>

                      <p>
                        {complaint.remarks}
                      </p>

                    </div>

                  )}


                  {/* RESOLVED */}

                  {complaint.status === "Resolved" && (

                    <div className="resolved-card">

                      <div className="resolved-icon">
                        ✓
                      </div>

                      <strong>
                        Complaint Resolved
                      </strong>

                      <p>
                        Your complaint has been
                        marked as resolved.
                      </p>

                      {complaint.resolvedDate && (

                        <small>
                          Resolved on{" "}
                          {formatDate(
                            complaint.resolvedDate
                          )}
                        </small>

                      )}

                    </div>

                  )}

                </div>

              </div>


              {/* =================================
                  ACTIONS
              ================================= */}

              <div className="track-actions">

                <Link
                  to="/citizen"
                  className="track-back-button"
                >
                  ← Back to Dashboard
                </Link>


                <Link
                  to="/citizen/complaints"
                  className="track-history-button"
                >
                  📋 View in My Complaints →
                </Link>

              </div>

            </section>

          )}


          {/* =================================
              INITIAL STATE
          ================================= */}

          {!searched && (

            <div className="track-initial-state">

              <div className="initial-icon">
                🔎
              </div>

              <h2>
                Track Your Complaint
              </h2>

              <p>
                Enter the Complaint ID you received
                after submitting your complaint.
              </p>

              <Link
                to="/citizen/complaints"
                className="initial-link"
              >
                View My Complaints →
              </Link>

            </div>

          )}

        </main>

      </div>


      {/* =================================
          FOOTER
      ================================= */}

      <footer className="track-footer">

        <span>
          © 2026 CivicPulse. All rights reserved.
        </span>

        <div>

          <span>
            Privacy Policy
          </span>

          <span>
            Terms of Use
          </span>

          <span>
            Contact
          </span>

        </div>

      </footer>

    </div>

  );
}


export default TrackComplaint;