import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./MyComplaints.css";

function MyComplaints() {

  const navigate = useNavigate();

  /* =========================
     CURRENT LOGGED-IN USER
  ========================= */

  const currentUser = JSON.parse(
    localStorage.getItem("civicpulse_current_user")
  );


  /* =========================
     STATES
  ========================= */

  const [complaints, setComplaints] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All Categories");

  const [statusFilter, setStatusFilter] =
    useState("All Status");

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");


  /* =========================
     LOAD COMPLAINTS
  ========================= */

  useEffect(() => {

    if (!currentUser) {
      navigate("/login");
      return;
    }

    const storedComplaints =
      JSON.parse(
        localStorage.getItem(
          "civicpulse_complaints"
        )
      ) || [];


    /*
      IMPORTANT:

      We only show complaints belonging
      to the currently logged-in citizen.
    */

    const userComplaints =
      storedComplaints.filter(
        (complaint) =>
          complaint.citizenId === currentUser.id
      );


    setComplaints(userComplaints);

  }, []);


  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {

    localStorage.removeItem(
      "civicpulse_current_user"
    );

    navigate("/login");

  };


  /* =========================
     FILTER COMPLAINTS
  ========================= */

  const filteredComplaints =
    complaints.filter((complaint) => {

      /* SEARCH */

      const search =
        searchTerm.toLowerCase();

      const matchesSearch =
        complaint.id
          .toLowerCase()
          .includes(search) ||

        complaint.title
          .toLowerCase()
          .includes(search);


      /* CATEGORY */

      const matchesCategory =
        categoryFilter === "All Categories" ||
        complaint.category === categoryFilter;


      /* STATUS */

      const matchesStatus =
        statusFilter === "All Status" ||
        complaint.status === statusFilter;


      /* FROM DATE */

      const matchesFromDate =
        !fromDate ||
        complaint.submittedDate >= fromDate;


      /* TO DATE */

      const matchesToDate =
        !toDate ||
        complaint.submittedDate <= toDate;


      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesFromDate &&
        matchesToDate
      );

    });


  /* =========================
     RESET FILTERS
  ========================= */

  const resetFilters = () => {

    setSearchTerm("");

    setCategoryFilter(
      "All Categories"
    );

    setStatusFilter(
      "All Status"
    );

    setFromDate("");

    setToDate("");

  };


  /* =========================
     PROTECTION
  ========================= */

  if (!currentUser) {
    return null;
  }


  return (

    <div className="complaints-page">


      {/* =================================
          HEADER
      ================================= */}

      <header className="complaints-header">

        <Link
          to="/citizen"
          className="complaints-logo"
        >

          <div className="complaints-logo-symbol">
            ✦
          </div>

          <div>

            <div className="complaints-logo-name">
              Civic<span>Pulse</span>
            </div>

            <div className="complaints-logo-tagline">
              Civic Complaints Management System
            </div>

          </div>

        </Link>


        <div className="complaints-user">

          <span className="location-text">
            📍 Hyderabad
          </span>

          <span className="header-divider">
            |
          </span>

          <div className="user-avatar">
            {currentUser.name
              ?.charAt(0)
              .toUpperCase()}
          </div>

          <div className="user-info">

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
          MAIN LAYOUT
      ================================= */}

      <div className="complaints-layout">


        {/* =================================
            SIDEBAR
        ================================= */}

        <aside className="complaints-sidebar">


          <Link
            to="/citizen"
            className="complaints-sidebar-item"
          >
            <span>🏠</span>
            Dashboard
          </Link>


          <Link
            to="/citizen/report"
            className="complaints-sidebar-item"
          >
            <span>➕</span>
            Report Complaint
          </Link>


          <Link
            to="/citizen/complaints"
            className="complaints-sidebar-item active"
          >
            <span>📋</span>
            My Complaints
          </Link>


          <Link
            to="/citizen/track"
            className="complaints-sidebar-item"
          >
            <span>🔍</span>
            Track Complaint
          </Link>


          <Link
            to="/citizen/feedback"
            className="complaints-sidebar-item"
          >
            <span>💬</span>
            Feedback
          </Link>


          <div className="sidebar-separator"></div>


          <Link
            to="/profile"
            className="complaints-sidebar-item"
          >
            <span>👤</span>
            My Profile
          </Link>


          <button
            className="complaints-sidebar-item logout"
            onClick={handleLogout}
          >
            <span>🚪</span>
            Logout
          </button>


          <div className="sidebar-message">

            <strong>
              A Cleaner Hyderabad
            </strong>

            <span>
              Together
            </span>

          </div>

        </aside>


        {/* =================================
            CONTENT
        ================================= */}

        <main className="complaints-content">


          {/* BREADCRUMB */}

          <div className="complaints-breadcrumb">

            <Link to="/citizen">
              Dashboard
            </Link>

            <span>›</span>

            <strong>
              My Complaints
            </strong>

          </div>


          {/* =================================
              PAGE HEADING
          ================================= */}

          <section className="complaints-heading">

            <div className="complaints-heading-icon">
              📋
            </div>

            <div>

              <h1>
                My Complaints
              </h1>

              <p>
                View all the complaints you have
                submitted and check their current status.
              </p>

            </div>


            <Link
              to="/citizen/report"
              className="new-complaint-button"
            >
              <span>＋</span>
              Report New Complaint
            </Link>

          </section>


          {/* =================================
              FILTER CARD
          ================================= */}

          <section className="filter-card">


            {/* SEARCH */}

            <div className="filter-field search-field">

              <label>
                Search
              </label>

              <div className="search-input-wrapper">

                <span>
                  🔍
                </span>

                <input
                  type="text"
                  placeholder="Search by Complaint ID or title..."
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value
                    )
                  }
                />

              </div>

            </div>


            {/* CATEGORY */}

            <div className="filter-field">

              <label>
                Category
              </label>

              <select
                value={categoryFilter}
                onChange={(event) =>
                  setCategoryFilter(
                    event.target.value
                  )
                }
              >

                <option>
                  All Categories
                </option>

                <option>
                  Water Supply
                </option>

                <option>
                  Roads
                </option>

                <option>
                  Garbage
                </option>

                <option>
                  Streetlights
                </option>

                <option>
                  Drainage
                </option>

                <option>
                  Public Safety
                </option>

                <option>
                  Other
                </option>

              </select>

            </div>


            {/* STATUS */}

            <div className="filter-field">

              <label>
                Status
              </label>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value
                  )
                }
              >

                <option>
                  All Status
                </option>

                <option>
                  Submitted
                </option>

                <option>
                  Under Review
                </option>

                <option>
                  Assigned
                </option>

                <option>
                  In Progress
                </option>

                <option>
                  Resolved
                </option>

              </select>

            </div>


            {/* FROM DATE */}

            <div className="filter-field date-field">

              <label>
                From Date
              </label>

              <input
                type="date"
                value={fromDate}
                onChange={(event) =>
                  setFromDate(
                    event.target.value
                  )
                }
              />

            </div>


            {/* TO DATE */}

            <div className="filter-field date-field">

              <label>
                To Date
              </label>

              <input
                type="date"
                value={toDate}
                onChange={(event) =>
                  setToDate(
                    event.target.value
                  )
                }
              />

            </div>


            {/* RESET */}

            <button
              className="reset-button"
              onClick={resetFilters}
            >
              Reset
            </button>

          </section>


          {/* =================================
              COMPLAINT TABLE
          ================================= */}

          <section className="complaints-table-card">


            <div className="table-header">

              <div>

                <h2>
                  Complaint History
                </h2>

                <p>
                  {filteredComplaints.length} complaint
                  {filteredComplaints.length !== 1
                    ? "s"
                    : ""} found
                </p>

              </div>

            </div>


            {/* EMPTY STATE */}

            {filteredComplaints.length === 0 ? (

              <div className="empty-state">

                <div className="empty-icon">
                  📋
                </div>

                <h3>
                  No complaints found
                </h3>

                {complaints.length === 0 ? (

                  <>

                    <p>
                      You haven't submitted any
                      complaints yet.
                    </p>

                    <Link
                      to="/citizen/report"
                      className="empty-action"
                    >
                      Report Your First Complaint →
                    </Link>

                  </>

                ) : (

                  <>

                    <p>
                      No complaints match your
                      current filters.
                    </p>

                    <button
                      onClick={resetFilters}
                      className="empty-action-button"
                    >
                      Clear Filters
                    </button>

                  </>

                )}

              </div>

            ) : (

              <div className="table-wrapper">

                <table>

                  <thead>

                    <tr>

                      <th>#</th>

                      <th>
                        Complaint ID
                      </th>

                      <th>
                        Title
                      </th>

                      <th>
                        Category
                      </th>

                      <th>
                        Location
                      </th>

                      <th>
                        Priority
                      </th>

                      <th>
                        Status
                      </th>

                      <th>
                        Submitted On
                      </th>

                      <th>
                        Actions
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {filteredComplaints.map(
                      (complaint, index) => (

                        <tr
                          key={complaint.id}
                        >

                          <td>
                            {index + 1}
                          </td>


                          {/* ID */}

                          <td>

                            <strong className="complaint-id">
                              {complaint.id}
                            </strong>

                          </td>


                          {/* TITLE */}

                          <td>

                            <div className="title-cell">

                              {complaint.image && (

                                <img
                                  src={complaint.image}
                                  alt=""
                                  className="complaint-thumbnail"
                                />

                              )}

                              <span>
                                {complaint.title}
                              </span>

                            </div>

                          </td>


                          {/* CATEGORY */}

                          <td>

                            <span className="category-badge">
                              {complaint.category}
                            </span>

                          </td>


                          {/* LOCATION */}

                          <td>

                            <div className="location-cell">

                              <span>
                                {complaint.location}
                              </span>

                              {complaint.landmark && (

                                <small>
                                  {complaint.landmark}
                                </small>

                              )}

                            </div>

                          </td>


                          {/* PRIORITY */}

                          <td>

                            <span
                              className={`priority-badge priority-${complaint.priority?.toLowerCase()}`}
                            >
                              {complaint.priority}
                            </span>

                          </td>


                          {/* STATUS */}

                          <td>

                            <span
                              className={`status-badge status-${complaint.status
                                ?.toLowerCase()
                                .replace(/\s+/g, "-")}`}
                            >
                              {complaint.status}
                            </span>

                          </td>


                          {/* DATE */}

                          <td>

                            {formatDate(
                              complaint.submittedDate
                            )}

                          </td>


                          {/* ACTION */}

                          <td>

                            <button
                              className="view-button"
                              onClick={() =>
                                navigate(
                                  `/citizen/complaints/${complaint.id}`
                                )
                              }
                            >
                              View
                            </button>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </section>

        </main>

      </div>


      {/* =================================
          FOOTER
      ================================= */}

      <footer className="complaints-footer">

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


/* =========================
   DATE FORMATTER
========================= */

function formatDate(dateString) {

  if (!dateString) {
    return "-";
  }

  const date = new Date(dateString);

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}


export default MyComplaints;