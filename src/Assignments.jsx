import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Assignments.css";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH ASSIGNMENTS =================

  const fetchAssignments = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/assignments"
      );

      const data = await response.json();

      if (response.ok) {
        setAssignments(data);
      } else {
        console.log(
          "Failed to fetch assignments:",
          data
        );
      }
    } catch (error) {
      console.log(
        "Error fetching assignments:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  // ================= FORMAT DATE =================

  const formatDate = (date) => {
    if (!date) {
      return "No date";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ================= VIEW ASSIGNMENT =================

  const handleViewAssignment = (assignment) => {
    alert(
      `Assignment: ${assignment.title}\n\n${assignment.description}`
    );
  };

  // ================= UI =================

  return (
    <div className="assignments-page">

      {/* ================= NAVBAR ================= */}

      <nav className="assignments-nav">

        <div className="logo">
          🎓 StudentHub
        </div>

        <Link to="/dashboard">
          ← Dashboard
        </Link>

      </nav>

      {/* ================= MAIN ================= */}

      <main className="assignments-container">

        {/* ================= HEADING ================= */}

        <div className="assignments-heading">

          <h1>
            📝 My Assignments
          </h1>

          <p>
            Check your assignments and upcoming deadlines.
          </p>

        </div>

        {/* ================= LOADING ================= */}

        {loading ? (

          <div className="assignments-loading">
            Loading assignments... ⏳
          </div>

        ) : assignments.length === 0 ? (

          /* ================= EMPTY ================= */

          <div className="no-assignments">

            <div className="empty-icon">
              📭
            </div>

            <h2>
              No Assignments Yet
            </h2>

            <p>
              Your faculty hasn't added any assignments yet.
            </p>

          </div>

        ) : (

          /* ================= ASSIGNMENT LIST ================= */

          <div className="assignment-grid">

            {assignments.map((assignment) => (

              <div
                className="assignment-card"
                key={assignment._id}
              >

                {/* TOP SECTION */}

                <div className="assignment-top">

                  <span className="subject-badge">
                    {assignment.subject}
                  </span>

                  <span className="pending-badge">
                    Pending
                  </span>

                </div>

                {/* TITLE */}

                <h2>
                  {assignment.title}
                </h2>

                {/* DESCRIPTION */}

                <p className="assignment-description">
                  {assignment.description}
                </p>

                {/* DUE DATE */}

                <div className="assignment-date">

                  <span>
                    📅 Due Date
                  </span>

                  <strong>
                    {formatDate(
                      assignment.dueDate
                    )}
                  </strong>

                </div>

                {/* VIEW BUTTON */}

                <button
                  className="assignment-view-btn"
                  onClick={() =>
                    handleViewAssignment(
                      assignment
                    )
                  }
                >
                  View Assignment →
                </button>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
}

export default Assignments;