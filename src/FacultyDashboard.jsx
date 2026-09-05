import "./FacultyDashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function FacultyDashboard() {
  const navigate = useNavigate();

  const [facultyName, setFacultyName] = useState("Faculty");

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      try {
        const userData = JSON.parse(user);

        if (userData.role === "faculty") {
          setFacultyName(userData.name || "Faculty");
        }
      } catch (error) {
        console.log("Error reading faculty data:", error);
      }
    }
  }, []);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <div className="faculty-dashboard">

      {/* NAVBAR */}

      <nav className="faculty-nav">

        <div className="faculty-logo">
          🎓 StudentHub
        </div>

        <div className="faculty-user">
          👨‍🏫 {facultyName}
        </div>

      </nav>


      {/* CONTENT */}

      <main className="faculty-content">

        {/* WELCOME */}

        <div className="faculty-welcome">

          <h1>
            Welcome, {facultyName}! 👋
          </h1>

          <p>
            Manage your classes, assignments,
            materials and announcements.
          </p>

        </div>


        {/* CARDS */}

        <div className="faculty-cards">

          {/* PROFILE */}

          <div className="faculty-card">

            <div className="faculty-icon">
              👤
            </div>

            <h3>
              My Profile
            </h3>

            <p>
              View and manage your faculty
              profile.
            </p>

            <Link
              to="/faculty/profile"
              className="faculty-link"
            >
              View Profile →
            </Link>

          </div>


          {/* MATERIALS */}

          <div className="faculty-card">

            <div className="faculty-icon">
              📚
            </div>

            <h3>
              Study Materials
            </h3>

            <p>
              Upload and manage study materials
              for students.
            </p>

            <Link
              to="/faculty/materials"
              className="faculty-link"
            >
              Manage Materials →
            </Link>

          </div>


          {/* ASSIGNMENTS */}

          <div className="faculty-card">

            <div className="faculty-icon">
              📝
            </div>

            <h3>
              Assignments
            </h3>

            <p>
              Create and manage student
              assignments.
            </p>

            <Link
              to="/faculty/assignments"
              className="faculty-link"
            >
              Manage Assignments →
            </Link>

          </div>
         

  


          {/* ANNOUNCEMENTS */}

          <div className="faculty-card">

            <div className="faculty-icon">
              📢
            </div>

            <h3>
              Announcements
            </h3>

            <p>
              Create announcements for students.
            </p>

            <Link
              to="/faculty/announcements"
              className="faculty-link"
            >
              Manage Announcements →
            </Link>

          </div>

        </div>


        {/* QUICK ACTIONS */}

        <div className="faculty-actions">

          <h2>
            Quick Actions
          </h2>

          <div className="action-buttons">

            <Link
              to="/faculty/materials"
              className="action-btn"
            >
              ➕ Add Material
            </Link>

            <Link
              to="/faculty/assignments"
              className="action-btn"
            >
              ➕ Add Assignment
            </Link>

            <Link
              to="/faculty/announcements"
              className="action-btn"
            >
              📢 Announcement
            </Link>

          </div>

        </div>


        {/* LOGOUT */}

        <div className="faculty-bottom">

          <button
            onClick={handleLogout}
            className="faculty-logout"
          >
            🚪 Logout
          </button>

        </div>

      </main>

    </div>
  );
}

export default FacultyDashboard;