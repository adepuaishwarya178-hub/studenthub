import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Assignments.css";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://https://studenthub-backend-ubpy.onrender.com/api/assignments")
      .then((response) => response.json())
      .then((data) => {
        setAssignments(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching assignments:", error);
        setLoading(false);
      });
  }, []);

  const formatDate = (date) => {
    if (!date) return "No date";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="assignments-page">

      <nav className="assignments-nav">

        <div className="logo">
          🎓 StudentHub
        </div>

        <Link to="/dashboard">
          ← Dashboard
        </Link>

      </nav>


      <main className="assignments-container">

        <div className="assignments-heading">

          <h1>📝 My Assignments</h1>

          <p>
            Check your assignments and upcoming deadlines.
          </p>

        </div>


        {loading ? (

          <div className="assignments-loading">
            Loading assignments... ⏳
          </div>

        ) : assignments.length === 0 ? (

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

          <div className="assignment-grid">

            {assignments.map((assignment) => (

              <div
                className="assignment-card"
                key={assignment._id}
              >

                <div className="assignment-top">

                  <span className="subject-badge">
                    {assignment.subject}
                  </span>

                  <span className="pending-badge">
                    Pending
                  </span>

                </div>


                <h2>
                  {assignment.title}
                </h2>


                <p className="assignment-description">
                  {assignment.description}
                </p>


                <div className="assignment-date">

                  <span>
                    📅 Due Date
                  </span>

                  <strong>
                    {formatDate(assignment.dueDate)}
                  </strong>

                </div>


                <button
                  className="assignment-view-btn"
                  onClick={() =>
                    alert(
                      `Assignment: ${assignment.title}\n\n${assignment.description}`
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