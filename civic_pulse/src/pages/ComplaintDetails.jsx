import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import "./ComplaintDetails.css";

function ComplaintDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [complaint, setComplaint] =
    useState(null);


  /* =========================
     LOAD COMPLAINT
  ========================= */

  useEffect(() => {

    const currentUser = JSON.parse(
      localStorage.getItem(
        "civicpulse_current_user"
      )
    );

    if (!currentUser) {
      navigate("/login");
      return;
    }


    const complaints =
      JSON.parse(
        localStorage.getItem(
          "civicpulse_complaints"
        )
      ) || [];


    const foundComplaint =
      complaints.find(
        (item) =>
          item.id === id &&
          item.citizenId === currentUser.id
      );


    setComplaint(foundComplaint || null);

  }, [id, navigate]);


  /* =========================
     NOT FOUND
  ========================= */

  if (!complaint) {

    return (

      <div className="details-not-found">

        <div>

          <div className="not-found-icon">
            📋
          </div>

          <h2>
            Complaint Not Found
          </h2>

          <p>
            The complaint does not exist or
            does not belong to your account.
          </p>

          <Link
            to="/citizen/complaints"
            className="back-button"
          >
            ← Back to My Complaints
          </Link>

        </div>

      </div>

    );

  }


  return (

    <div className="details-page">


      {/* HEADER */}

      <header className="details-header">

        <Link
          to="/citizen"
          className="details-logo"
        >

          <div className="details-logo-symbol">
            ✦
          </div>

          <div>

            <div className="details-logo-name">
              Civic<span>Pulse</span>
            </div>

            <div className="details-logo-tagline">
              Civic Complaints Management System
            </div>

          </div>

        </Link>


        <Link
          to="/citizen/complaints"
          className="back-to-complaints"
        >
          ← My Complaints
        </Link>

      </header>


      {/* CONTENT */}

      <main className="details-content">


        {/* BREADCRUMB */}

        <div className="details-breadcrumb">

          <Link to="/citizen">
            Dashboard
          </Link>

          <span>›</span>

          <Link to="/citizen/complaints">
            My Complaints
          </Link>

          <span>›</span>

          <strong>
            {complaint.id}
          </strong>

        </div>


        {/* TITLE */}

        <div className="details-title-section">

          <div>

            <p className="details-label">
              COMPLAINT DETAILS
            </p>

            <h1>
              {complaint.title}
            </h1>

            <p className="details-id">
              Complaint ID:{" "}
              <strong>
                {complaint.id}
              </strong>
            </p>

          </div>


          <span
            className={`details-status status-${complaint.status
              ?.toLowerCase()
              .replace(/\s+/g, "-")}`}
          >
            {complaint.status}
          </span>

        </div>


        <div className="details-grid">


          {/* LEFT */}

          <section className="details-main-card">


            {/* IMAGE */}

            {complaint.image && (

              <div className="details-image-container">

                <img
                  src={complaint.image}
                  alt={complaint.title}
                />

              </div>

            )}


            {/* DESCRIPTION */}

            <div className="details-section">

              <h2>
                Description
              </h2>

              <p>
                {complaint.description}
              </p>

            </div>


            {/* LOCATION */}

            <div className="details-section">

              <h2>
                Location Details
              </h2>

              <div className="location-details">

                <div>

                  <span>
                    Location
                  </span>

                  <strong>
                    {complaint.location}
                  </strong>

                </div>


                {complaint.landmark && (

                  <div>

                    <span>
                      Landmark
                    </span>

                    <strong>
                      {complaint.landmark}
                    </strong>

                  </div>

                )}

              </div>

            </div>


            {/* REMARKS */}

            {complaint.remarks && (

              <div className="details-section">

                <h2>
                  Remarks
                </h2>

                <div className="remarks-box">
                  {complaint.remarks}
                </div>

              </div>

            )}

          </section>


          {/* RIGHT */}

          <aside className="details-side">


            {/* SUMMARY */}

            <div className="summary-card">

              <h2>
                Complaint Summary
              </h2>


              <div className="summary-row">

                <span>
                  Category
                </span>

                <strong>
                  {complaint.category}
                </strong>

              </div>


              <div className="summary-row">

                <span>
                  Priority
                </span>

                <strong
                  className={`priority-text priority-${complaint.priority?.toLowerCase()}`}
                >
                  {complaint.priority}
                </strong>

              </div>


              <div className="summary-row">

                <span>
                  Submitted On
                </span>

                <strong>
                  {formatDate(
                    complaint.submittedDate
                  )}
                </strong>

              </div>


              <div className="summary-row">

                <span>
                  Assigned Staff
                </span>

                <strong>
                  {complaint.assignedStaffName ||
                    "Not Assigned"}
                </strong>

              </div>


              {complaint.resolvedDate && (

                <div className="summary-row">

                  <span>
                    Resolved On
                  </span>

                  <strong>
                    {formatDate(
                      complaint.resolvedDate
                    )}
                  </strong>

                </div>

              )}

            </div>


            {/* STATUS */}

            <div className="status-card">

              <h2>
                Current Status
              </h2>

              <div className="current-status">

                <div className="status-dot"></div>

                <div>

                  <strong>
                    {complaint.status}
                  </strong>

                  <p>
                    Your complaint is currently
                    at this stage.
                  </p>

                </div>

              </div>

            </div>


            <button
              className="details-back-button"
              onClick={() =>
                navigate(
                  "/citizen/complaints"
                )
              }
            >
              ← Back to My Complaints
            </button>

          </aside>

        </div>

      </main>

    </div>

  );
}


/* =========================
   DATE FORMATTER
========================= */

function formatDate(dateString) {

  if (!dateString) {
    return "-";
  }

  return new Date(
    dateString
  ).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

}


export default ComplaintDetails;