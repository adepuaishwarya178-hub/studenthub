import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FacultyAssignments.css";

function FacultyAssignments() {

  const [formData, setFormData] = useState({
    subject: "Computer Networks",
    title: "",
    description: "",
    dueDate: "",
  });

  const [status, setStatus] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);


  // ================= FETCH ASSIGNMENTS =================

  const fetchAssignments = async () => {

    try {

      const response = await fetch(
        "http://https://studenthub-backend-ubpy.onrender.com/api/assignments"
      );

      const data = await response.json();

      if (response.ok) {
        setAssignments(data);
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


  // ================= FORM CHANGE =================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  // ================= ADD ASSIGNMENT =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setStatus("Adding assignment...");

    try {

      const response = await fetch(
        "http://https://studenthub-backend-ubpy.onrender.com/api/assignments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();


      if (response.ok) {

        setStatus(
          "Assignment added successfully! ✅"
        );

        setFormData({
          subject: "Computer Networks",
          title: "",
          description: "",
          dueDate: "",
        });

        // Refresh assignment list
        fetchAssignments();

      } else {

        setStatus(
          data.message ||
          "Failed to add assignment ❌"
        );

      }

    } catch (error) {

      console.log(error);

      setStatus(
        "Backend connection failed ❌"
      );

    }

  };


  // ================= DELETE ASSIGNMENT =================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this assignment?"
    );

    if (!confirmDelete) {
      return;
    }


    try {

      const response = await fetch(
        `http://https://studenthub-backend-ubpy.onrender.com/api/assignments/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();


      if (response.ok) {

        setStatus(
          "Assignment deleted successfully! ✅"
        );

        setAssignments(
          assignments.filter(
            (assignment) =>
              assignment._id !== id
          )
        );

      } else {

        setStatus(
          data.message ||
          "Failed to delete assignment ❌"
        );

      }

    } catch (error) {

      console.log(error);

      setStatus(
        "Backend connection failed ❌"
      );

    }

  };


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


  return (
    <div className="faculty-assignments-page">


      {/* ================= NAVBAR ================= */}

      <nav className="faculty-assignments-nav">

        <div className="logo">
          🎓 StudentHub
        </div>

        <Link to="/faculty/dashboard">
          ← Faculty Dashboard
        </Link>

      </nav>


      <main className="faculty-assignments-container">


        {/* ================= HEADING ================= */}

        <div className="faculty-assignments-heading">

          <h1>
            📝 Manage Assignments
          </h1>

          <p>
            Create and manage assignments
            for students.
          </p>

        </div>


        {/* ================= ADD FORM ================= */}

        <div className="assignment-form-card">

          <h2>
            ➕ Add New Assignment
          </h2>


          <form onSubmit={handleSubmit}>


            {/* SUBJECT */}

            <div className="form-group">

              <label>
                Subject
              </label>

              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              >

                <option>
                  Computer Networks
                </option>

                <option>
                  Artificial Intelligence
                </option>

                <option>
                  Web Technologies
                </option>

                <option>
                  Cyber Security
                </option>

                <option>
                  Computer Science
                </option>

              </select>

            </div>


            {/* TITLE */}

            <div className="form-group">

              <label>
                Assignment Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="Example: CN Unit 1 Assignment"
                value={formData.title}
                onChange={handleChange}
                required
              />

            </div>


            {/* DESCRIPTION */}

            <div className="form-group">

              <label>
                Description
              </label>

              <textarea
                name="description"
                placeholder="Enter assignment details..."
                value={formData.description}
                onChange={handleChange}
                rows="5"
                required
              />

            </div>


            {/* DUE DATE */}

            <div className="form-group">

              <label>
                Due Date
              </label>

              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />

            </div>


            <button
              type="submit"
              className="add-assignment-btn"
            >
              Add Assignment →
            </button>

          </form>


          {status && (

            <p className="assignment-status">
              {status}
            </p>

          )}

        </div>


        {/* ================= ASSIGNMENT LIST ================= */}

        <div className="faculty-assignment-list">

          <h2>
            📋 Created Assignments
          </h2>


          {loading ? (

            <p>
              Loading assignments... ⏳
            </p>

          ) : assignments.length === 0 ? (

            <p>
              No assignments created yet.
            </p>

          ) : (

            <div className="assignment-list">

              {assignments.map((assignment) => (

                <div
                  className="faculty-assignment-item"
                  key={assignment._id}
                >

                  <div className="faculty-assignment-info">

                    <span className="assignment-subject">
                      {assignment.subject}
                    </span>

                    <h3>
                      {assignment.title}
                    </h3>

                    <p>
                      {assignment.description}
                    </p>

                    <strong>
                      📅 Due:{" "}
                      {formatDate(
                        assignment.dueDate
                      )}
                    </strong>

                  </div>


                  <div className="faculty-assignment-actions">

                    {/* VIEW */}

                    <button
                      className="view-assignment-btn"
                      onClick={() =>
                        alert(
                          `Subject: ${assignment.subject}\n\nTitle: ${assignment.title}\n\nDescription: ${assignment.description}\n\nDue Date: ${formatDate(assignment.dueDate)}`
                        )
                      }
                    >
                      👁️ View
                    </button>


                    {/* DELETE */}

                    <button
                      className="delete-assignment-btn"
                      onClick={() =>
                        handleDelete(
                          assignment._id
                        )
                      }
                    >
                      🗑️ Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>


      </main>

    </div>
  );
}

export default FacultyAssignments;