import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./AdminHome.css";

function AdminHome() {

  const navigate = useNavigate();

  /* =================================
     CURRENT USER
  ================================= */

  const currentUser = JSON.parse(
    localStorage.getItem("civicpulse_current_user")
  );


  /* =================================
     STATES
  ================================= */

  const [complaints, setComplaints] = useState([]);

  const [selectedComplaint, setSelectedComplaint] =
    useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All Categories");

  const [statusFilter, setStatusFilter] =
    useState("All Status");

  const [priorityFilter, setPriorityFilter] =
    useState("All Priorities");

  const [selectedStaff, setSelectedStaff] =
    useState("");

  const [selectedStatus, setSelectedStatus] =
    useState("");

  const [remarks, setRemarks] =
    useState("");

  const [message, setMessage] =
    useState("");


  /* =================================
     FIELD STAFF
  ================================= */

  const fieldStaff = [
    {
      id: "FS001",
      name: "Ravi Kumar"
    },
    {
      id: "FS002",
      name: "Ramesh Kumar"
    },
    {
      id: "FS003",
      name: "Arjun Rao"
    }
  ];


  /* =================================
     STATUS OPTIONS
  ================================= */

  const statusOptions = [
    "Submitted",
    "Under Review",
    "Assigned",
    "In Progress",
    "Resolved"
  ];


  /* =================================
     LOAD COMPLAINTS
  ================================= */

  useEffect(() => {

    if (!currentUser) {

      navigate("/login");

      return;
    }


    /*
      Admin is allowed to view
      ALL complaints.
    */

    if (currentUser.role !== "admin") {

      navigate("/login");

      return;
    }


    loadComplaints();

  }, []);


  /* =================================
     LOAD FROM LOCAL STORAGE
  ================================= */

  const loadComplaints = () => {

    const storedComplaints =
      JSON.parse(
        localStorage.getItem(
          "civicpulse_complaints"
        )
      ) || [];


    setComplaints(storedComplaints);

  };


  /* =================================
     OPEN COMPLAINT
  ================================= */

  const openComplaint = (complaint) => {

    setSelectedComplaint(complaint);

    setSelectedStaff(
      complaint.assignedStaffId || ""
    );

    setSelectedStatus(
      complaint.status || "Submitted"
    );

    setRemarks(
      complaint.remarks || ""
    );

    setMessage("");

  };


  /* =================================
     FILTER COMPLAINTS
  ================================= */

  const filteredComplaints =
    complaints.filter((complaint) => {

      const search =
        searchTerm.toLowerCase();


      const matchesSearch =
        complaint.id
          ?.toLowerCase()
          .includes(search) ||

        complaint.title
          ?.toLowerCase()
          .includes(search) ||

        complaint.location
          ?.toLowerCase()
          .includes(search);


      const matchesCategory =
        categoryFilter === "All Categories" ||
        complaint.category === categoryFilter;


      const matchesStatus =
        statusFilter === "All Status" ||
        complaint.status === statusFilter;


      const matchesPriority =
        priorityFilter === "All Priorities" ||
        complaint.priority === priorityFilter;


      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesPriority
      );

    });


  /* =================================
     DASHBOARD COUNTS
  ================================= */

  const totalComplaints =
    complaints.length;


  const underReview =
    complaints.filter(
      (complaint) =>
        complaint.status === "Under Review"
    ).length;


  const inProgress =
    complaints.filter(
      (complaint) =>
        complaint.status === "In Progress"
    ).length;


  const resolved =
    complaints.filter(
      (complaint) =>
        complaint.status === "Resolved"
    ).length;


  /* =================================
     VERIFY COMPLAINT
  ================================= */

  const handleVerify = () => {

    if (!selectedComplaint) {
      return;
    }


    updateComplaint(
      selectedComplaint.id,
      {
        status: "Under Review"
      }
    );

  };


  /* =================================
     ASSIGN + UPDATE
  ================================= */

  const handleAssignAndUpdate = () => {

    if (!selectedComplaint) {
      return;
    }


    const staff =
      fieldStaff.find(
        (person) =>
          person.id === selectedStaff
      );


    const updates = {

      status: selectedStatus,

      assignedStaffId:
        selectedStaff || null,

      assignedStaffName:
        staff?.name || null,

      remarks:
        remarks.trim(),

    };


    if (selectedStatus === "Resolved") {

      updates.resolvedDate =
        new Date()
          .toISOString()
          .split("T")[0];

    }


    updateComplaint(
      selectedComplaint.id,
      updates
    );

  };


  /* =================================
     UPDATE COMPLAINT
  ================================= */

  const updateComplaint = (
    complaintId,
    updates
  ) => {

    const storedComplaints =
      JSON.parse(
        localStorage.getItem(
          "civicpulse_complaints"
        )
      ) || [];


    const updatedComplaints =
      storedComplaints.map(
        (complaint) => {

          if (
            complaint.id === complaintId
          ) {

            return {
              ...complaint,
              ...updates
            };

          }

          return complaint;

        }
      );


    /*
      SAVE BACK TO THE SAME
      LOCAL STORAGE KEY USED
      BY MODULE 2.
    */

    localStorage.setItem(
      "civicpulse_complaints",
      JSON.stringify(
        updatedComplaints
      )
    );


    setComplaints(
      updatedComplaints
    );


    const updatedSelected =
      updatedComplaints.find(
        (complaint) =>
          complaint.id === complaintId
      );


    setSelectedComplaint(
      updatedSelected
    );


    if (updatedSelected) {

      setSelectedStaff(
        updatedSelected.assignedStaffId ||
        ""
      );

      setSelectedStatus(
        updatedSelected.status
      );

      setRemarks(
        updatedSelected.remarks || ""
      );

    }


    setMessage(
      "Complaint updated successfully."
    );


    /*
      Remove message after
      a short period.
    */

    setTimeout(() => {
      setMessage("");
    }, 2500);

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
     USER PROTECTION
  ================================= */

  if (!currentUser) {
    return null;
  }


  return (

    <div className="admin-page">


      {/* =================================
          HEADER
      ================================= */}

      <header className="admin-header">


        <Link
          to="/admin"
          className="admin-logo"
        >

          <div className="admin-logo-symbol">
            ✦
          </div>

          <div>

            <div className="admin-logo-name">
              Civic<span>Pulse</span>
            </div>

            <div className="admin-logo-tagline">
              Civic Complaints Management System
            </div>

          </div>

        </Link>


        <div className="admin-header-right">


          <span className="admin-location">
            📍 Hyderabad
          </span>


          <span className="admin-divider">
            |
          </span>


          <div className="notification">
            🔔
            <span>3</span>
          </div>


          <div className="admin-avatar">
            {currentUser.name
              ?.charAt(0)
              .toUpperCase() || "A"}
          </div>


          <div className="admin-user-info">

            <strong>
              {currentUser.name ||
                "Admin Officer"}
            </strong>

            <small>
              GHMC Admin
            </small>

          </div>

        </div>

      </header>


      {/* =================================
          BODY
      ================================= */}

      <div className="admin-layout">


        {/* =================================
            SIDEBAR
        ================================= */}

        <aside className="admin-sidebar">


          <Link
            to="/admin"
            className="admin-sidebar-item active"
          >
            <span>🏠</span>
            Dashboard
          </Link>


          <a
            href="#complaints"
            className="admin-sidebar-item"
          >
            <span>📋</span>
            All Complaints
          </a>


          <button
            className="admin-sidebar-item"
            onClick={() => {

              setStatusFilter(
                "Submitted"
              );

              document
                .getElementById(
                  "complaints"
                )
                ?.scrollIntoView();

            }}
          >
            <span>✓</span>
            Verify Complaints
          </button>


          <button
            className="admin-sidebar-item"
            onClick={() => {

              setStatusFilter(
                "Assigned"
              );

              document
                .getElementById(
                  "complaints"
                )
                ?.scrollIntoView();

            }}
          >
            <span>👥</span>
            Assign Staff
          </button>


          <div className="admin-sidebar-item">
            <span>👤</span>
            Manage Staff
          </div>


          <div className="admin-sidebar-item">
            <span>📊</span>
            Reports & Analytics
          </div>


          <div className="admin-sidebar-separator"></div>


          <Link
            to="/profile"
            className="admin-sidebar-item"
          >
            <span>👤</span>
            My Profile
          </Link>


          <button
            className="admin-sidebar-item admin-logout"
            onClick={handleLogout}
          >
            <span>🚪</span>
            Logout
          </button>


          <div className="admin-sidebar-message">

            <strong>
              Better Governance
            </strong>

            <span>
              Stronger Communities
            </span>

          </div>

        </aside>


        {/* =================================
            MAIN
        ================================= */}

        <main className="admin-content">


          {/* TOP */}

          <div className="admin-page-top">

            <div>

              <h1>
                Good morning, Admin!
              </h1>

              <p>
                Here's an overview of civic
                complaints.
              </p>

            </div>

            <span className="admin-date">
              {new Date().toLocaleDateString(
                "en-IN",
                {
                  weekday: "long",
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                }
              )}
            </span>

          </div>


          {/* =================================
              STAT CARDS
          ================================= */}

          <section className="admin-stat-grid">


            <div className="admin-stat-card blue">

              <div className="admin-stat-icon">
                📄
              </div>

              <div>

                <strong>
                  {totalComplaints}
                </strong>

                <span>
                  Total Complaints
                </span>

              </div>

            </div>


            <div className="admin-stat-card red">

              <div className="admin-stat-icon">
                ◷
              </div>

              <div>

                <strong>
                  {underReview}
                </strong>

                <span>
                  Under Review
                </span>

              </div>

            </div>


            <div className="admin-stat-card yellow">

              <div className="admin-stat-icon">
                🛠
              </div>

              <div>

                <strong>
                  {inProgress}
                </strong>

                <span>
                  In Progress
                </span>

              </div>

            </div>


            <div className="admin-stat-card green">

              <div className="admin-stat-icon">
                ✓
              </div>

              <div>

                <strong>
                  {resolved}
                </strong>

                <span>
                  Resolved
                </span>

              </div>

            </div>

          </section>


          {/* =================================
              COMPLAINTS
          ================================= */}

          <section
            className="admin-complaints-card"
            id="complaints"
          >


            <div className="admin-complaints-heading">

              <div>

                <h2>
                  All Complaints
                </h2>

                <p>
                  View, verify, assign and manage
                  all civic complaints.
                </p>

              </div>

            </div>


            {/* FILTERS */}

            <div className="admin-filters">


              <div className="admin-search">

                <span>
                  🔍
                </span>

                <input
                  type="text"
                  placeholder="Search by ID, title or location..."
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value
                    )
                  }
                />

              </div>


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


              <select
                value={priorityFilter}
                onChange={(event) =>
                  setPriorityFilter(
                    event.target.value
                  )
                }
              >

                <option>
                  All Priorities
                </option>

                <option>
                  Low
                </option>

                <option>
                  Medium
                </option>

                <option>
                  High
                </option>

                <option>
                  Critical
                </option>

              </select>

            </div>


            {/* =================================
                TABLE
            ================================= */}

            {filteredComplaints.length === 0 ? (

              <div className="admin-empty">

                <div>
                  📋
                </div>

                <h3>
                  No complaints found
                </h3>

                <p>
                  Complaints submitted by citizens
                  will appear here.
                </p>

              </div>

            ) : (

              <div className="admin-table-wrapper">

                <table className="admin-table">

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
                          className={
                            selectedComplaint?.id ===
                            complaint.id
                              ? "selected-row"
                              : ""
                          }
                        >

                          <td>
                            {index + 1}
                          </td>


                          <td>

                            <strong className="admin-complaint-id">
                              {complaint.id}
                            </strong>

                          </td>


                          <td>

                            <div className="admin-title-cell">

                              {complaint.image && (

                                <img
                                  src={complaint.image}
                                  alt=""
                                />

                              )}

                              <span>
                                {complaint.title}
                              </span>

                            </div>

                          </td>


                          <td>

                            <span className="admin-category">
                              {complaint.category}
                            </span>

                          </td>


                          <td>
                            {complaint.location}
                          </td>


                          <td>

                            <span
                              className={`admin-priority priority-${complaint.priority?.toLowerCase()}`}
                            >
                              {complaint.priority ||
                                "Not Set"}
                            </span>

                          </td>


                          <td>

                            <span
                              className={`admin-status status-${complaint.status
                                ?.toLowerCase()
                                .replace(/\s+/g, "-")}`}
                            >
                              {complaint.status}
                            </span>

                          </td>


                          <td>
                            {formatDate(
                              complaint.submittedDate
                            )}
                          </td>


                          <td>

                            <button
                              className="admin-view-button"
                              onClick={() =>
                                openComplaint(
                                  complaint
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


            <div className="admin-table-footer">

              Showing{" "}
              <strong>
                {filteredComplaints.length}
              </strong>{" "}
              of{" "}
              <strong>
                {complaints.length}
              </strong>{" "}
              complaints

            </div>

          </section>

        </main>


        {/* =================================
            DETAILS PANEL
        ================================= */}

        {selectedComplaint && (

          <aside className="admin-details-panel">


            <div className="details-panel-header">

              <div>

                <h2>
                  Complaint Details
                </h2>

                <span>
                  {selectedComplaint.id}
                </span>

              </div>

              <button
                onClick={() =>
                  setSelectedComplaint(null)
                }
              >
                ×
              </button>

            </div>


            {/* IMAGE */}

            {selectedComplaint.image && (

              <img
                src={selectedComplaint.image}
                alt="Complaint"
                className="admin-details-image"
              />

            )}


            <div className="admin-details-body">


              {/* TITLE */}

              <div className="details-main-title">

                <div>

                  <strong>
                    {selectedComplaint.id}
                  </strong>

                  <h3>
                    {selectedComplaint.title}
                  </h3>

                </div>

                <span
                  className={`admin-status status-${selectedComplaint.status
                    ?.toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {selectedComplaint.status}
                </span>

              </div>


              {/* INFORMATION */}

              <div className="admin-detail-list">


                <div>

                  <span>
                    Category
                  </span>

                  <strong>
                    {selectedComplaint.category}
                  </strong>

                </div>


                <div>

                  <span>
                    Priority
                  </span>

                  <strong
                    className={`priority-text priority-${selectedComplaint.priority?.toLowerCase()}`}
                  >
                    {selectedComplaint.priority ||
                      "Not Set"}
                  </strong>

                </div>


                <div>

                  <span>
                    Location
                  </span>

                  <strong>
                    {selectedComplaint.location}
                  </strong>

                </div>


                <div>

                  <span>
                    Landmark
                  </span>

                  <strong>
                    {selectedComplaint.landmark ||
                      "Not provided"}
                  </strong>

                </div>


                <div>

                  <span>
                    Submitted By
                  </span>

                  <strong>
                    {selectedComplaint.citizenName ||
                      "Citizen"}
                  </strong>

                </div>


                <div>

                  <span>
                    Contact
                  </span>

                  <strong>
                    {selectedComplaint.citizenEmail ||
                      "Not available"}
                  </strong>

                </div>


                <div>

                  <span>
                    Submitted On
                  </span>

                  <strong>
                    {formatDate(
                      selectedComplaint.submittedDate
                    )}
                  </strong>

                </div>

              </div>


              {/* DESCRIPTION */}

              <div className="admin-description">

                <h3>
                  Description
                </h3>

                <p>
                  {selectedComplaint.description}
                </p>

              </div>


              {/* VERIFY */}

              {selectedComplaint.status ===
                "Submitted" && (

                <button
                  className="verify-button"
                  onClick={handleVerify}
                >
                  ✓ Verify Complaint
                </button>

              )}


              {/* ASSIGN STAFF */}

              <div className="admin-control-section">

                <label>
                  Assign Field Staff
                </label>

                <select
                  value={selectedStaff}
                  onChange={(event) =>
                    setSelectedStaff(
                      event.target.value
                    )
                  }
                >

                  <option value="">
                    Select Field Staff
                  </option>

                  {fieldStaff.map(
                    (staff) => (

                      <option
                        key={staff.id}
                        value={staff.id}
                      >
                        {staff.name} ({staff.id})
                      </option>

                    )
                  )}

                </select>

              </div>


              {/* STATUS */}

              <div className="admin-control-section">

                <label>
                  Update Status
                </label>

                <select
                  value={selectedStatus}
                  onChange={(event) =>
                    setSelectedStatus(
                      event.target.value
                    )
                  }
                >

                  {statusOptions.map(
                    (status) => (

                      <option
                        key={status}
                        value={status}
                      >
                        {status}
                      </option>

                    )
                  )}

                </select>

              </div>


              {/* REMARKS */}

              <div className="admin-control-section">

                <label>
                  Remarks
                </label>

                <textarea
                  rows="4"
                  placeholder="Add remarks..."
                  value={remarks}
                  onChange={(event) =>
                    setRemarks(
                      event.target.value
                    )
                  }
                ></textarea>

              </div>


              {/* UPDATE */}

              <button
                className="update-status-button"
                onClick={
                  handleAssignAndUpdate
                }
              >
                Assign & Update Status
              </button>


              {/* SUCCESS */}

              {message && (

                <div className="admin-success-message">
                  ✓ {message}
                </div>

              )}


              {/* STAFF CURRENT */}

              <div className="current-assignment">

                <span>
                  Currently Assigned
                </span>

                <strong>
                  {selectedComplaint.assignedStaffName ||
                    "Not Assigned"}
                </strong>

              </div>

            </div>

          </aside>

        )}

      </div>


      {/* FOOTER */}

      <footer className="admin-footer">

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


/* =================================
   DATE FORMATTER
================================= */

function formatDate(dateString) {

  if (!dateString) {
    return "-";
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
      year: "numeric"
    }
  );
}


export default AdminHome;