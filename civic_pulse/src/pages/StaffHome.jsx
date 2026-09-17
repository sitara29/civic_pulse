import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./StaffHome.css";


function StaffHome() {

  const navigate = useNavigate();


  /* =====================================
     CURRENT USER
  ===================================== */

  const currentUser = JSON.parse(
    localStorage.getItem("civicpulse_current_user")
  );


  /* =====================================
     STATES
  ===================================== */

  const [complaints, setComplaints] = useState([]);

  const [selectedComplaint, setSelectedComplaint] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All Categories");

  const [statusFilter, setStatusFilter] =
    useState("All Status");

  const [selectedStatus, setSelectedStatus] =
    useState("");

  const [remarks, setRemarks] =
    useState("");

  const [workPhoto, setWorkPhoto] =
    useState("");

  const [message, setMessage] =
    useState("");


  /* =====================================
     LOAD ASSIGNED COMPLAINTS
  ===================================== */

  useEffect(() => {

    if (!currentUser) {

      navigate("/login");

      return;
    }


    /*
      Only Field Staff can access
      this dashboard.
    */

    if (
      currentUser.role !== "fieldStaff"
    ) {

      navigate("/login");

      return;
    }


    loadComplaints();

  }, []);


  /* =====================================
     LOAD COMPLAINTS
  ===================================== */

  const loadComplaints = () => {

    const storedComplaints =
      JSON.parse(
        localStorage.getItem(
          "civicpulse_complaints"
        )
      ) || [];


    /*
      IMPORTANT:

      We only show complaints assigned
      to the currently logged-in staff.

      Example:

      currentUser.id = FS001

      Only complaints with:

      assignedStaffId = FS001

      will appear.
    */

    const assignedComplaints =
      storedComplaints.filter(
        (complaint) =>
          complaint.assignedStaffId ===
          currentUser.id
      );


    setComplaints(
      assignedComplaints
    );

  };


  /* =====================================
     OPEN COMPLAINT
  ===================================== */

  const openComplaint = (complaint) => {

    setSelectedComplaint(
      complaint
    );

    setSelectedStatus(
      complaint.status ||
      "Assigned"
    );

    setRemarks(
      complaint.remarks || ""
    );

    setWorkPhoto("");

    setMessage("");

  };


  /* =====================================
     FILTER
  ===================================== */

  const filteredComplaints =
    complaints.filter(
      (complaint) => {

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
          categoryFilter ===
            "All Categories" ||

          complaint.category ===
            categoryFilter;


        const matchesStatus =
          statusFilter ===
            "All Status" ||

          complaint.status ===
            statusFilter;


        return (
          matchesSearch &&
          matchesCategory &&
          matchesStatus
        );

      }
    );


  /* =====================================
     DASHBOARD COUNTS
  ===================================== */

  const assignedCount =
    complaints.length;


  const inProgressCount =
    complaints.filter(
      (complaint) =>
        complaint.status ===
        "In Progress"
    ).length;


  const resolvedCount =
    complaints.filter(
      (complaint) =>
        complaint.status ===
        "Resolved"
    ).length;


  const overdueCount =
    complaints.filter(
      (complaint) =>
        complaint.overdue === true
    ).length;


  /* =====================================
     WORK PHOTO
  ===================================== */

  const handlePhotoUpload = (event) => {

    const file =
      event.target.files?.[0];


    if (!file) {
      return;
    }


    /*
      Convert the image into Base64
      so it can be stored in
      LocalStorage.
    */

    const reader =
      new FileReader();


    reader.onload = () => {

      setWorkPhoto(
        reader.result
      );

    };


    reader.readAsDataURL(file);

  };


  /* =====================================
     SAVE UPDATE
  ===================================== */

  const handleSaveUpdate = () => {

    if (!selectedComplaint) {
      return;
    }


    /*
      Prevent invalid update.
    */

    if (
      selectedStatus ===
        "Assigned" &&
      !remarks.trim()
    ) {

      setMessage(
        "Please add a remark before saving."
      );

      return;
    }


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
            complaint.id ===
            selectedComplaint.id
          ) {

            const updatedComplaint = {

              ...complaint,

              status:
                selectedStatus,

              remarks:
                remarks.trim(),

            };


            /*
              Save field staff work photo
              if one was uploaded.
            */

            if (workPhoto) {

              updatedComplaint.workPhoto =
                workPhoto;

            }


            /*
              When resolved, save
              the resolution date.
            */

            if (
              selectedStatus ===
              "Resolved"
            ) {

              updatedComplaint.resolvedDate =
                new Date()
                  .toISOString()
                  .split("T")[0];

            }


            /*
              When work starts,
              make sure the complaint
              is assigned.
            */

            if (
              selectedStatus ===
              "In Progress"
            ) {

              updatedComplaint.assignedStaffId =
                currentUser.id;

              updatedComplaint.assignedStaffName =
                currentUser.name;

            }


            return updatedComplaint;

          }


          return complaint;

        }
      );


    /*
      VERY IMPORTANT:

      Save to the SAME storage key
      used by:

      Module 2
      Module 3
      Module 4
      Admin
    */

    localStorage.setItem(
      "civicpulse_complaints",
      JSON.stringify(
        updatedComplaints
      )
    );


    /*
      Update local dashboard.
    */

    const updatedAssignedComplaints =
      updatedComplaints.filter(
        (complaint) =>
          complaint.assignedStaffId ===
          currentUser.id
      );


    setComplaints(
      updatedAssignedComplaints
    );


    const updatedSelected =
      updatedComplaints.find(
        (complaint) =>
          complaint.id ===
          selectedComplaint.id
      );


    setSelectedComplaint(
      updatedSelected
    );


    if (updatedSelected) {

      setSelectedStatus(
        updatedSelected.status
      );

      setRemarks(
        updatedSelected.remarks ||
        ""
      );

    }


    setMessage(
      "Work update saved successfully."
    );


    setTimeout(() => {

      setMessage("");

    }, 2500);

  };


  /* =====================================
     LOGOUT
  ===================================== */

  const handleLogout = () => {

    localStorage.removeItem(
      "civicpulse_current_user"
    );

    navigate("/login");

  };


  /* =====================================
     PROTECTION
  ===================================== */

  if (!currentUser) {
    return null;
  }


  return (

    <div className="staff-page">


      {/* =================================
          HEADER
      ================================= */}

      <header className="staff-header">


        <Link
          to="/staff"
          className="staff-logo"
        >

          <div className="staff-logo-symbol">
            ✦
          </div>


          <div>

            <div className="staff-logo-name">
              Civic<span>Pulse</span>
            </div>

            <div className="staff-logo-tagline">
              Civic Complaints Management System
            </div>

          </div>

        </Link>


        <div className="staff-header-right">


          <span className="staff-location">
            📍 Hyderabad
          </span>


          <span className="staff-divider">
            |
          </span>


          <div className="staff-notification">
            🔔
            <span>2</span>
          </div>


          <div className="staff-avatar">
            {currentUser.name
              ?.charAt(0)
              .toUpperCase() || "R"}
          </div>


          <div className="staff-user-info">

            <strong>
              {currentUser.name ||
                "Field Staff"}
            </strong>

            <small>
              Field Staff ({currentUser.id})
            </small>

          </div>

        </div>

      </header>


      {/* =================================
          LAYOUT
      ================================= */}

      <div className="staff-layout">


        {/* =================================
            SIDEBAR
        ================================= */}

        <aside className="staff-sidebar">


          <Link
            to="/staff"
            className="staff-sidebar-item active"
          >
            <span>🏠</span>
            Dashboard
          </Link>


          <button
            className="staff-sidebar-item"
            onClick={() => {

              setStatusFilter(
                "All Status"
              );

              document
                .getElementById(
                  "staff-complaints"
                )
                ?.scrollIntoView();

            }}
          >
            <span>📋</span>
            My Assigned Complaints
          </button>


          <button
            className="staff-sidebar-item"
            onClick={() => {

              setStatusFilter(
                "In Progress"
              );

              document
                .getElementById(
                  "staff-complaints"
                )
                ?.scrollIntoView();

            }}
          >
            <span>🛠</span>
            Update Work Status
          </button>


          <button
            className="staff-sidebar-item"
            onClick={() => {

              setStatusFilter(
                "Resolved"
              );

              document
                .getElementById(
                  "staff-complaints"
                )
                ?.scrollIntoView();

            }}
          >
            <span>✓</span>
            Completed Tasks
          </button>


          <div className="staff-sidebar-separator"></div>


          <Link
            to="/profile"
            className="staff-sidebar-item"
          >
            <span>👤</span>
            My Profile
          </Link>


          <button
            className="staff-sidebar-item staff-logout"
            onClick={handleLogout}
          >
            <span>🚪</span>
            Logout
          </button>


          <div className="staff-sidebar-message">

            <strong>
              Serve Your City
            </strong>

            <span>
              Every action matters.
            </span>

          </div>

        </aside>


        {/* =================================
            MAIN CONTENT
        ================================= */}

        <main className="staff-content">


          {/* PAGE HEADER */}

          <div className="staff-page-top">

            <div>

              <h1>
                Hello,{" "}
                {currentUser.name || "Ravi Kumar"}!
              </h1>

              <p>
                Here are the complaints assigned
                to you.
              </p>

            </div>


            <span className="staff-date">

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

          <section className="staff-stat-grid">


            <div className="staff-stat-card blue">

              <div className="staff-stat-icon">
                📄
              </div>

              <div>

                <strong>
                  {assignedCount}
                </strong>

                <span>
                  Assigned to Me
                </span>

              </div>

            </div>


            <div className="staff-stat-card yellow">

              <div className="staff-stat-icon">
                🛠
              </div>

              <div>

                <strong>
                  {inProgressCount}
                </strong>

                <span>
                  In Progress
                </span>

              </div>

            </div>


            <div className="staff-stat-card green">

              <div className="staff-stat-icon">
                ✓
              </div>

              <div>

                <strong>
                  {resolvedCount}
                </strong>

                <span>
                  Resolved
                </span>

              </div>

            </div>


            <div className="staff-stat-card red">

              <div className="staff-stat-icon">
                ◷
              </div>

              <div>

                <strong>
                  {overdueCount}
                </strong>

                <span>
                  Overdue
                </span>

              </div>

            </div>


          </section>


          {/* =================================
              COMPLAINTS
          ================================= */}

          <section
            className="staff-complaints-card"
            id="staff-complaints"
          >


            <div className="staff-complaints-heading">

              <div>

                <h2>
                  My Assigned Complaints
                </h2>

                <p>
                  View complaint details and
                  update your work.
                </p>

              </div>

            </div>


            {/* FILTERS */}

            <div className="staff-filters">


              <div className="staff-search">

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


            {/* =================================
                TABLE
            ================================= */}

            {filteredComplaints.length === 0 ? (

              <div className="staff-empty">

                <div>
                  📋
                </div>

                <h3>
                  No assigned complaints
                </h3>

                <p>
                  Complaints assigned to you by
                  the Admin will appear here.
                </p>

              </div>

            ) : (

              <div className="staff-table-wrapper">

                <table className="staff-table">

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
                        Assigned On
                      </th>

                      <th>
                        Action
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {filteredComplaints.map(
                      (complaint, index) => (

                        <tr
                          key={
                            complaint.id
                          }
                        >

                          <td>
                            {index + 1}
                          </td>


                          <td>

                            <strong className="staff-complaint-id">
                              {complaint.id}
                            </strong>

                          </td>


                          <td>

                            <div className="staff-title-cell">

                              {complaint.image && (

                                <img
                                  src={
                                    complaint.image
                                  }
                                  alt=""
                                />

                              )}

                              <span>
                                {complaint.title}
                              </span>

                            </div>

                          </td>


                          <td>

                            <span className="staff-category">
                              {complaint.category}
                            </span>

                          </td>


                          <td>
                            {complaint.location}
                          </td>


                          <td>

                            <span
                              className={`staff-priority priority-${complaint.priority?.toLowerCase()}`}
                            >
                              {complaint.priority ||
                                "Not Set"}
                            </span>

                          </td>


                          <td>

                            <span
                              className={`staff-status status-${complaint.status
                                ?.toLowerCase()
                                .replace(
                                  /\s+/g,
                                  "-"
                                )}`}
                            >
                              {complaint.status}
                            </span>

                          </td>


                          <td>
                            {formatDate(
                              complaint.assignedDate ||
                              complaint.submittedDate
                            )}
                          </td>


                          <td>

                            <button
                              className="staff-update-button"
                              onClick={() =>
                                openComplaint(
                                  complaint
                                )
                              }
                            >
                              Update
                            </button>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}


            <div className="staff-table-footer">

              Showing{" "}

              <strong>
                {filteredComplaints.length}
              </strong>

              {" "}of{" "}

              <strong>
                {complaints.length}
              </strong>

              {" "}assigned complaints

            </div>

          </section>

        </main>


        {/* =================================
            DETAILS PANEL
        ================================= */}

        {selectedComplaint && (

          <aside className="staff-details-panel">


            {/* PANEL HEADER */}

            <div className="staff-details-header">

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
                  setSelectedComplaint(
                    null
                  )
                }
              >
                ×
              </button>

            </div>


            {/* COMPLAINT IMAGE */}

            {selectedComplaint.image && (

              <img
                src={
                  selectedComplaint.image
                }
                alt="Complaint"
                className="staff-details-image"
              />

            )}


            <div className="staff-details-body">


              {/* TITLE */}

              <div className="staff-detail-title">

                <div>

                  <strong>
                    {selectedComplaint.id}
                  </strong>

                  <h3>
                    {selectedComplaint.title}
                  </h3>

                </div>


                <span
                  className={`staff-status status-${selectedComplaint.status
                    ?.toLowerCase()
                    .replace(
                      /\s+/g,
                      "-"
                    )}`}
                >
                  {selectedComplaint.status}
                </span>

              </div>


              {/* INFORMATION */}

              <div className="staff-detail-list">


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
                    Assigned By
                  </span>

                  <strong>
                    {selectedComplaint.assignedBy ||
                      "Admin Officer"}
                  </strong>

                </div>


              </div>


              {/* DESCRIPTION */}

              <div className="staff-description">

                <h3>
                  Description
                </h3>

                <p>
                  {selectedComplaint.description}
                </p>

              </div>


              {/* =================================
                  UPDATE STATUS
              ================================= */}

              <div className="staff-control-section">

                <label>
                  Update Work Status
                </label>

                <select
                  value={selectedStatus}
                  onChange={(event) =>
                    setSelectedStatus(
                      event.target.value
                    )
                  }
                >

                  <option value="Assigned">
                    Assigned
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Resolved">
                    Resolved
                  </option>

                </select>

              </div>


              {/* =================================
                  REMARKS
              ================================= */}

              <div className="staff-control-section">

                <label>
                  Work Remarks
                </label>

                <textarea
                  rows="4"
                  placeholder="Describe the work completed or progress..."
                  value={remarks}
                  onChange={(event) =>
                    setRemarks(
                      event.target.value
                    )
                  }
                ></textarea>

              </div>


              {/* =================================
                  WORK PHOTO
              ================================= */}

              <div className="staff-control-section">

                <label>
                  Add Work Photo
                  <span>
                    {" "} (Optional)
                  </span>
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    handlePhotoUpload
                  }
                />

              </div>


              {/* PHOTO PREVIEW */}

              {workPhoto && (

                <img
                  src={workPhoto}
                  alt="Work preview"
                  className="staff-work-preview"
                />

              )}


              {/* =================================
                  SAVE
              ================================= */}

              <button
                className="staff-save-button"
                onClick={
                  handleSaveUpdate
                }
              >
                Save Update
              </button>


              {/* SUCCESS MESSAGE */}

              {message && (

                <div className="staff-success-message">

                  ✓ {message}

                </div>

              )}


              {/* CURRENT ASSIGNMENT */}

              <div className="staff-assignment">

                <span>
                  Assigned To
                </span>

                <strong>
                  {selectedComplaint.assignedStaffName ||
                    currentUser.name}
                </strong>

              </div>

            </div>

          </aside>

        )}

      </div>


      {/* =================================
          FOOTER
      ================================= */}

      <footer className="staff-footer">

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


/* =====================================
   DATE FORMATTER
===================================== */

function formatDate(dateString) {

  if (!dateString) {
    return "-";
  }


  const date =
    new Date(dateString);


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

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


export default StaffHome;