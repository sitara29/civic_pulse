import React from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

function CitizenHome() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem(
      "civicpulse_current_user"
    )
  );


  const handleLogout = () => {

    localStorage.removeItem(
      "civicpulse_current_user"
    );

    navigate("/login");
  };


  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#f7faf9",
      }}
    >

      {/* HEADER */}

      <header
        style={{
          height: "75px",
          background: "white",
          borderBottom: "1px solid #e2e9e6",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
        }}
      >

        <Link
          to="/citizen"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#102a43",
          }}
        >

          <span
            style={{
              fontSize: "34px",
              color: "#087f5b",
            }}
          >
            ✦
          </span>

          <strong
            style={{
              fontSize: "24px",
            }}
          >
            Civic
            <span
              style={{
                color: "#087f5b",
              }}
            >
              Pulse
            </span>
          </strong>

        </Link>


        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >

          <span>
            Welcome,{" "}
            <strong>
              {user?.name || "Citizen"}
            </strong>
          </span>

          <Link to="/profile">
            <button>
              Profile
            </button>
          </Link>

          <button onClick={handleLogout}>
            Logout
          </button>

        </div>

      </header>


      {/* MAIN */}

      <main
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "50px 25px",
        }}
      >

        <p
          style={{
            color: "#087f5b",
            fontWeight: "700",
            fontSize: "13px",
          }}
        >
          CITIZEN DASHBOARD
        </p>

        <h1
          style={{
            fontSize: "38px",
            color: "#102a43",
            marginBottom: "10px",
          }}
        >
          Welcome back,{" "}
          {user?.name || "Citizen"}!
        </h1>

        <p
          style={{
            color: "#657782",
            marginBottom: "40px",
          }}
        >
          Report civic issues and keep track of
          your complaints.
        </p>


        {/* ACTION CARDS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >


          {/* REPORT */}

          <Link
            to="/citizen/report"
            style={{
              background: "#087f5b",
              color: "white",
              padding: "30px",
              borderRadius: "15px",
              minHeight: "170px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >

            <div
              style={{
                fontSize: "32px",
              }}
            >
              📢
            </div>

            <div>

              <h2
                style={{
                  margin: "0 0 8px",
                }}
              >
                Report a Complaint
              </h2>

              <p
                style={{
                  margin: 0,
                  opacity: 0.9,
                }}
              >
                Report a civic issue in your area.
              </p>

            </div>

          </Link>


          {/* MY COMPLAINTS */}

          <Link
            to="/citizen/complaints"
            style={{
              background: "white",
              color: "#102a43",
              padding: "30px",
              borderRadius: "15px",
              minHeight: "170px",
              border:
                "1px solid #e2e9e6",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >

            <div
              style={{
                fontSize: "32px",
              }}
            >
              📋
            </div>

            <div>

              <h2
                style={{
                  margin: "0 0 8px",
                }}
              >
                My Complaints
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#657782",
                }}
              >
                View your complaint history.
              </p>

            </div>

          </Link>


          {/* TRACK */}

          <Link
            to="/citizen/track"
            style={{
              background: "white",
              color: "#102a43",
              padding: "30px",
              borderRadius: "15px",
              minHeight: "170px",
              border:
                "1px solid #e2e9e6",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >

            <div
              style={{
                fontSize: "32px",
              }}
            >
              🔍
            </div>

            <div>

              <h2
                style={{
                  margin: "0 0 8px",
                }}
              >
                Track Complaint
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#657782",
                }}
              >
                Track the status of your complaint.
              </p>

            </div>

          </Link>

        </div>


        {/* MODULE 2 INDICATOR */}

        <div
          style={{
            marginTop: "45px",
            padding: "25px",
            background: "white",
            borderRadius: "12px",
            border:
              "1px solid #e2e9e6",
          }}
        >

          <h3>
            Complaint Registration
          </h3>

          <p
            style={{
              color: "#657782",
              fontSize: "14px",
            }}
          >
            You can now report a civic issue
            by clicking the Report a Complaint
            button above.
          </p>

          <Link
            to="/citizen/report"
            style={{
              color: "#087f5b",
              fontWeight: "700",
            }}
          >
            Report an Issue →
          </Link>

        </div>

      </main>

    </div>

  );
}

export default CitizenHome;