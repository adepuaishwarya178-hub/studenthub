import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FacultyExams.css";

function FacultyExams() {
  const [formData, setFormData] = useState({
    subject: "Computer Networks",
    examName: "",
    examDate: "",
  });

  const [exams, setExams] = useState([]);
  const [status, setStatus] = useState("");

  const subjects = [
    "Computer Networks",
    "Artificial Intelligence",
    "Web Technologies",
    "Cyber Security",
    "Computer Science",
  ];

  // Fetch exams
  const fetchExams = async () => {
    try {
      const response = await fetch(
        "http://https://studenthub-backend-ubpy.onrender.com/api/exams"
      );

      const data = await response.json();

      if (response.ok) {
        setExams(data);
      }
    } catch (error) {
      console.log("Error fetching exams:", error);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add exam
  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("Adding exam...");

    try {
      const response = await fetch(
        "http://https://studenthub-backend-ubpy.onrender.com/api/exams",
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
        setStatus("Exam added successfully! ✅");

        setFormData({
          subject: "Computer Networks",
          examName: "",
          examDate: "",
        });

        fetchExams();
      } else {
        setStatus(
          data.message || "Failed to add exam ❌"
        );
      }
    } catch (error) {
      console.log(error);
      setStatus("Backend connection failed ❌");
    }
  };

  // Delete exam
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this exam?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://https://studenthub-backend-ubpy.onrender.com/api/exams/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setStatus("Exam deleted successfully! ✅");
        fetchExams();
      }
    } catch (error) {
      console.log(error);
      setStatus("Failed to delete exam ❌");
    }
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return "No date";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="faculty-exams-page">

      {/* NAVBAR */}

      <nav className="faculty-exams-nav">

        <div className="logo">
          🎓 StudentHub
        </div>

        <Link to="/faculty/dashboard">
          ← Faculty Dashboard
        </Link>

      </nav>


      {/* CONTENT */}

      <main className="faculty-exams-container">

        <div className="faculty-exams-heading">

          <h1>📅 Manage Exams</h1>

          <p>
            Add and manage upcoming examinations.
          </p>

        </div>


        {/* ADD EXAM */}

        <div className="exam-form-card">

          <h2>
            ➕ Add Upcoming Exam
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label>
                Subject
              </label>

              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              >

                {subjects.map((subject) => (
                  <option
                    key={subject}
                    value={subject}
                  >
                    {subject}
                  </option>
                ))}

              </select>

            </div>


            <div className="form-group">

              <label>
                Exam Name
              </label>

              <input
                type="text"
                name="examName"
                placeholder="Example: Internal Examination"
                value={formData.examName}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>
                Exam Date
              </label>

              <input
                type="date"
                name="examDate"
                value={formData.examDate}
                onChange={handleChange}
                required
              />

            </div>


            <button
              type="submit"
              className="add-exam-btn"
            >
              Add Exam →
            </button>

          </form>


          {status && (
            <p className="exam-status">
              {status}
            </p>
          )}

        </div>


        {/* EXISTING EXAMS */}

        <div className="existing-exams">

          <h2>
            📋 Added Exams
          </h2>

          {exams.length === 0 ? (

            <div className="no-exams">
              No exams added yet.
            </div>

          ) : (

            <div className="exam-list">

              {exams.map((exam) => (

                <div
                  className="exam-item"
                  key={exam._id}
                >

                  <div>

                    <h3>
                      {exam.examName}
                    </h3>

                    <p>
                      📚 {exam.subject}
                    </p>

                    <p>
                      📅 {formatDate(exam.examDate)}
                    </p>

                  </div>


                  <button
                    className="delete-exam-btn"
                    onClick={() =>
                      handleDelete(exam._id)
                    }
                  >
                    🗑️ Delete
                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

      </main>

    </div>
  );
}

export default FacultyExams;