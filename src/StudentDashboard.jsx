import "./StudentDashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function StudentDashboard() {
  const navigate = useNavigate();

  const [studentName, setStudentName] = useState("Student");
  const [pendingTasks, setPendingTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [studyProgress, setStudyProgress] = useState(0);

  useEffect(() => {
    // ================= STUDENT NAME =================

    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);

        if (user.role === "student") {
          setStudentName(user.name || "Student");
        }
      } catch (error) {
        console.log("Error reading user:", error);
      }
    }

    // ================= FETCH STUDENT =================

    fetch("https://studenthub-dvdp.onrender.com/api/students")
      .then((response) => response.json())
      .then((students) => {
        if (students.length > 0) {
          const student = students[students.length - 1];

          setStudentName(student.name || "Student");
        }
      })
      .catch((error) => {
        console.log("Error fetching student:", error);
      });

    // ================= FETCH ASSIGNMENTS =================

    fetch("https://studenthub-dvdp.onrender.com/api/assignments")
      .then((response) => response.json())
      .then((assignments) => {
        const pending = assignments.filter(
          (assignment) => assignment.status !== "Completed"
        ).length;

        const completed = assignments.filter(
          (assignment) => assignment.status === "Completed"
        ).length;

        const total = assignments.length;

        const progress =
          total === 0
            ? 0
            : Math.round((completed / total) * 100);

        setStudyProgress(progress);
        setPendingTasks(pending);
        setCompletedTasks(completed);
      })
      .catch((error) => {
        console.log("Error fetching assignments:", error);
      });
  }, []);

  // ================= LOGOUT =================

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <div className="dashboard">

      {/* ================= NAVBAR ================= */}

      <nav className="dashboard-nav">

        <div className="logo">
          🎓 StudentHub
        </div>

        <div className="student-info">
          👨‍🎓 {studentName}
        </div>

      </nav>

      {/* ================= MAIN ================= */}

      <main className="dashboard-content">

        {/* ================= WELCOME ================= */}

        <div className="welcome-section">

          <h1>
            Welcome back, {studentName}! 👋
          </h1>

          <p>
            Here's what's happening with your
            studies today.
          </p>

        </div>

        {/* ================= CARDS ================= */}

        <div className="dashboard-cards">

          {/* PROFILE */}

          <div className="dashboard-card">

            <div className="dashboard-icon">
              👤
            </div>

            <h3>
              My Profile
            </h3>

            <p>
              View and manage your student
              information.
            </p>

            <Link
              to="/profile"
              className="dashboard-link"
            >
              View Profile →
            </Link>

          </div>

          {/* MATERIALS */}

          <div className="dashboard-card">

            <div className="dashboard-icon">
              📚
            </div>

            <h3>
              Study Materials
            </h3>

            <p>
              Access your notes and learning
              resources.
            </p>

            <Link
              to="/materials"
              className="dashboard-link"
            >
              View Materials →
            </Link>

          </div>

          {/* ASSIGNMENTS */}

          <div className="dashboard-card">

            <div className="dashboard-icon">
              📝
            </div>

            <h3>
              Assignments
            </h3>

            <p>
              Check your pending assignments
              and deadlines.
            </p>

            <Link
              to="/assignments"
              className="dashboard-link"
            >
              View Assignments →
            </Link>

          </div>

          {/* TIMETABLE */}

          <div className="dashboard-card">

            <div className="dashboard-icon">
              📅
            </div>

            <h3>
              Timetable
            </h3>

            <p>
              Check your daily class schedule.
            </p>

            <Link
              to="/timetable"
              className="dashboard-link"
            >
              View Timetable →
            </Link>

          </div>

          {/* ANNOUNCEMENTS */}

          <div className="dashboard-card">

            <div className="dashboard-icon">
              📢
            </div>

            <h3>
              Announcements
            </h3>

            <p>
              Stay updated with college
              announcements.
            </p>

            <Link
              to="/announcements"
              className="dashboard-link"
            >
              View Announcements →
            </Link>

          </div>

        </div>

        {/* ================= QUICK OVERVIEW ================= */}

        <div className="quick-section">

          <h2>
            Quick Overview
          </h2>

          <div className="stats">

            {/* PENDING */}

            <div className="stat-box">

              <h2>
                {pendingTasks}
              </h2>

              <p>
                Pending Tasks
              </p>

            </div>

            {/* COMPLETED */}

            <div className="stat-box">

              <h2>
                {completedTasks}
              </h2>

              <p>
                Completed Tasks
              </p>

            </div>

            {/* STUDY PROGRESS */}

            <div className="stat-box">

              <h2>
                {studyProgress}%
              </h2>

              <p>
                Study Progress
              </p>

            </div>

          </div>

        </div>

        {/* ================= LOGOUT ================= */}

        <div className="dashboard-bottom">

          <button
            onClick={handleLogout}
            className="logout-btn"
          >
            🚪 Logout
          </button>

        </div>

      </main>

    </div>
  );
}

export default StudentDashboard;