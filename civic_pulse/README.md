# CivicPulse

### Civic Complaints Management System

> **See it. Report it. Track it. Resolve it.**

CivicPulse is a web-based Civic Complaints Management System designed to provide a simple and transparent workflow for reporting, managing, assigning, resolving, and tracking civic complaints.

The system connects **Citizens, Admin/Officers, and Field Staff** through a single complaint lifecycle.

---

# 1. Project Overview

CivicPulse provides a digital platform through which citizens can report civic issues such as:

- Water supply problems
- Road damage
- Garbage and waste
- Streetlight issues
- Drainage problems
- Public safety concerns
- Other civic issues

Instead of handling each role separately, CivicPulse connects all users through one common complaint workflow.

### Complete Workflow

```text
Citizen
   |
   | Report Complaint
   v
Complaint Created
   |
   v
Admin / Officer
   |
   | Verify Complaint
   | Assign Field Staff
   | Update Status
   v
Field Staff
   |
   | View Assigned Complaint
   | Update Work Status
   | Add Remarks
   | Mark Resolved
   v
Complaint Resolved
   |
   v
Citizen
   |
   | Track Complaint
   | View History
   | Give Feedback
   v
Completed

2. Problem Statement

Citizens frequently face civic problems such as:

Broken roads
Water leakage
Uncollected garbage
Damaged streetlights
Blocked drainage
Local infrastructure problems

Traditional complaint handling can make it difficult for citizens to know:

Whether their complaint was received.
Whether the complaint was verified.
Who is responsible for handling it.
Whether work has started.
Whether the problem has been resolved.

CivicPulse addresses this by providing a centralized digital workflow where the complaint can be followed from submission to resolution.

3. Project Objective

The primary objective of CivicPulse is to create a simple complaint management system that provides:

Easy complaint submission.
Complaint identification through a unique Complaint ID.
Image upload for supporting evidence.
Complaint history for citizens.
Complaint tracking.
Centralized administration.
Complaint verification.
Field staff assignment.
Work-status updates.
Resolution remarks.
Citizen feedback.

The main goal is to make the complaint lifecycle visible and connected to all relevant users.

4. User Roles

CivicPulse has three major user roles.

4.1 Citizen

The Citizen is responsible for reporting civic issues.

Citizen capabilities
Login
Register
Access Citizen Dashboard
Report a complaint
Select complaint category
Enter complaint title
Enter description
Provide location
Provide landmark
Upload an image
Receive Complaint ID
View complaint history
View complaint details
Track complaint status
Give feedback
4.2 Admin / Officer

The Admin/Officer manages complaints submitted by citizens.

Admin capabilities
Login
View dashboard
View all complaints
Search complaints
Filter complaints
View complaint details
Verify complaints
Assign Field Staff
Update complaint status
Add remarks
View uploaded complaint images
Monitor complaint progress
4.3 Field Staff

The Field Staff handles complaints assigned by the Admin/Officer.

Field Staff capabilities
Login
View assigned complaints
Search assigned complaints
Filter assigned complaints
View complaint details
View complaint location
Update work status
Add work remarks
Upload work/resolution image
Mark complaint as resolved
5. Four Project Modules

The project is divided into four major functional modules.

MODULE 1 — Authentication & User Access
Purpose

Provides controlled access to the CivicPulse system.

Features
Citizen login
Admin login
Field Staff login
Citizen registration
Role-based navigation
Current-user storage
Logout
Role-based navigation
Citizen Login
      |
      v
Citizen Dashboard
      |
      /citizen


Admin Login
      |
      v
Admin Dashboard
      |
      /admin


Field Staff Login
      |
      v
Field Staff Dashboard
      |
      /staff
Demo Accounts
Citizen
Email:
citizen@civicpulse.com

Password:
Civic@2026#Citizen
Admin / Officer
Email:
admin@civicpulse.com

Password:
Civic@2026#Admin
Field Staff
Email:
staff@civicpulse.com

Password:
Civic@2026#Staff
MODULE 2 — Citizen Complaint Management
Purpose

Allows citizens to submit and manage their civic complaints.

Complaint submission flow
Citizen Dashboard
       |
       v
Report Complaint
       |
       v
Select Category
       |
       v
Enter Title
       |
       v
Enter Description
       |
       v
Enter Location
       |
       v
Enter Landmark
       |
       v
Upload Image
       |
       v
Submit Complaint
       |
       v
Complaint ID Generated
Complaint Information

Each complaint can contain:

Complaint ID
Citizen ID
Category
Title
Description
Location
Landmark
Image
Priority
Status
Assigned Staff
Remarks
Submitted Date
Resolved Date
Example
Complaint ID:
CP20260001

Category:
Water Supply

Title:
Water leakage near road

Description:
Continuous water leakage near the road.

Location:
Kukatpally

Landmark:
Near KPHB Metro

Status:
Submitted
MODULE 3 — Admin / Officer Complaint Management
Purpose

Provides administrators with a centralized interface for managing citizen complaints.

Admin workflow
View All Complaints
        |
        v
Search / Filter
        |
        v
Open Complaint
        |
        v
Verify Complaint
        |
        v
Assign Field Staff
        |
        v
Update Status
        |
        v
Monitor Progress
Admin can:
View all citizen complaints.
Search using Complaint ID.
Search using complaint title.
Search using location.
Filter by category.
Filter by status.
Filter by priority.
View complaint details.
Verify submitted complaints.
Assign Field Staff.
Update complaint status.
Add administrative remarks.
Complaint Status Lifecycle
Submitted
    |
    v
Under Review
    |
    v
Assigned
    |
    v
In Progress
    |
    v
Resolved
MODULE 4 — Field Staff & Complaint Resolution
Purpose

Allows Field Staff to handle complaints assigned to them.

Field Staff workflow
Field Staff Login
        |
        v
View Assigned Complaints
        |
        v
Open Complaint
        |
        v
View Location & Details
        |
        v
Start Work
        |
        v
Update Status
        |
        v
Add Remarks
        |
        v
Upload Work Image
        |
        v
Mark Resolved
Field Staff can:
View complaints assigned specifically to them.
Search assigned complaints.
Filter complaints.
View citizen complaint details.
View complaint image.
View location and landmark.
Update work status.
Add work remarks.
Upload resolution/work image.
Mark the complaint as resolved.
6. End-to-End Complaint Lifecycle

This is the most important part of CivicPulse.

A single complaint travels through all user roles.

                     CITIZEN
                        |
                        |
                 Submit Complaint
                        |
                        v
                +---------------+
                |   SUBMITTED   |
                +---------------+
                        |
                        v
                  ADMIN / OFFICER
                        |
                    Verify
                        |
                        v
                +---------------+
                | UNDER REVIEW  |
                +---------------+
                        |
                   Assign Staff
                        |
                        v
                +---------------+
                |    ASSIGNED   |
                +---------------+
                        |
                        v
                  FIELD STAFF
                        |
                    Start Work
                        |
                        v
                +---------------+
                | IN PROGRESS   |
                +---------------+
                        |
                   Complete Work
                        |
                        v
                +---------------+
                |    RESOLVED   |
                +---------------+
                        |
                        v
                     CITIZEN
                        |
                 Track Complaint
                        |
                  Give Feedback
7. Module Connectivity

CivicPulse is designed as one connected application rather than four independent pages.

The modules communicate through shared application data.

Shared LocalStorage Keys
civicpulse_users
civicpulse_complaints
civicpulse_current_user
civicpulse_feedback
Complaint Data Flow
Citizen
   |
   | Creates complaint
   v
civicpulse_complaints
   |
   +--------------------+
   |                    |
   v                    v
Admin              Citizen
   |                    |
   | Verify             | History
   | Assign             | Tracking
   | Update             | Details
   |                    |
   v                    |
Field Staff             |
   |                    |
   | Work Update        |
   | Remarks            |
   | Resolve            |
   |                    |
   +----------+---------+
              |
              v
   civicpulse_complaints

The same complaint object is updated throughout its lifecycle.

8. Example Connected Workflow

Consider the following complaint:

CP20260001
Water leakage near road
Step 1 — Citizen

Citizen submits the complaint.

Status: Submitted
Step 2 — Admin

Admin logs in and sees:

CP20260001

Admin verifies it.

Status: Under Review
Step 3 — Admin Assigns Field Staff

Admin assigns:

Field Staff:
Ravi Kumar

Staff ID:
FS001

The complaint becomes:

Status: Assigned
Step 4 — Field Staff

Ravi Kumar logs in.

His dashboard displays:

CP20260001
Water leakage near road
Assigned

He starts working.

Status: In Progress

He adds:

Remark:
Repair work has started.
Step 5 — Resolution

Field Staff completes the work.

Status: Resolved

He can also upload a work image.

Step 6 — Citizen

The citizen opens the complaint tracking page.

The timeline now shows:

✓ Submitted

✓ Under Review

✓ Assigned

✓ In Progress

✓ Resolved

The citizen can then provide feedback.

9. Complaint Data Structure

A complaint follows a common structure across the application.

Example:

{
  id: "CP20260001",

  citizenId: "C001",

  category: "Water Supply",

  title: "Water leakage near road",

  description:
    "Continuous water leakage near the road.",

  location: "Kukatpally",

  landmark: "Near KPHB Metro",

  image: "",

  priority: "High",

  status: "Submitted",

  assignedStaffId: null,

  assignedStaffName: null,

  remarks: "",

  submittedDate: "2026-09-17",

  resolvedDate: null
}

When the Admin assigns a Field Staff member:

assignedStaffId: "FS001"

When the Field Staff starts work:

status: "In Progress"

When the Field Staff resolves the complaint:

status: "Resolved"
10. Technology Stack

CivicPulse is implemented using technologies covered in the project syllabus.

Frontend
HTML5
CSS3
JavaScript
React
React Router
Data Handling
JavaScript objects
JSON-style data
LocalStorage
Development Tools
Visual Studio Code
Git
GitHub
Vite
npm