import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FacultyAnnouncements.css";

function FacultyAnnouncements() {

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    date: "",
  });

  const [status, setStatus] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);


  // ================= FETCH ANNOUNCEMENTS =================

  const fetchAnnouncements = async () => {

    try {

      const response = await fetch(
        "http://https://studenthub-backend-ubpy.onrender.com/api/announcements"
      );

      const data = await response.json();

      if (response.ok) {
        setAnnouncements(data);
      }

    } catch (error) {

      console.log(
        "Error fetching announcements:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    fetchAnnouncements();
  }, []);


  // ================= FORM CHANGE =================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  // ================= ADD ANNOUNCEMENT =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setStatus("Adding announcement...");

    try {

      const response = await fetch(
        "http://https://studenthub-backend-ubpy.onrender.com/api/announcements",
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
          "Announcement added successfully! ✅"
        );

        setFormData({
          title: "",
          message: "",
          date: "",
        });

        // Refresh list
        fetchAnnouncements();

      } else {

        setStatus(
          data.message ||
          "Failed to add announcement ❌"
        );

      }

    } catch (error) {

      console.log(error);

      setStatus(
        "Backend connection failed ❌"
      );

    }

  };


  // ================= DELETE ANNOUNCEMENT =================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this announcement?"
    );

    if (!confirmDelete) {
      return;
    }


    try {

      const response = await fetch(
        `http://https://studenthub-backend-ubpy.onrender.com/api/announcements/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();


      if (response.ok) {

        setStatus(
          "Announcement deleted successfully! ✅"
        );

        setAnnouncements(
          announcements.filter(
            (announcement) =>
              announcement._id !== id
          )
        );

      } else {

        setStatus(
          data.message ||
          "Failed to delete announcement ❌"
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
    <div className="faculty-announcements-page">


      {/* ================= NAVBAR ================= */}

      <nav className="faculty-announcements-nav">

        <div className="logo">
          🎓 StudentHub
        </div>

        <Link to="/faculty/dashboard">
          ← Faculty Dashboard
        </Link>

      </nav>


      <main className="faculty-announcements-container">


        {/* ================= HEADING ================= */}

        <div className="faculty-announcements-heading">

          <h1>
            📢 Manage Announcements
          </h1>

          <p>
            Create important announcements
            for students.
          </p>

        </div>


        {/* ================= ADD FORM ================= */}

        <div className="announcement-form-card">

          <h2>
            ➕ Add New Announcement
          </h2>


          <form onSubmit={handleSubmit}>


            {/* TITLE */}

            <div className="form-group">

              <label>
                Announcement Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="Example: Internal Exams"
                value={formData.title}
                onChange={handleChange}
                required
              />

            </div>


            {/* MESSAGE */}

            <div className="form-group">

              <label>
                Message
              </label>

              <textarea
                name="message"
                placeholder="Enter announcement details..."
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              />

            </div>


            {/* DATE */}

            <div className="form-group">

              <label>
                Date
              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />

            </div>


            <button
              type="submit"
              className="add-announcement-btn"
            >
              Add Announcement →
            </button>

          </form>


          {status && (

            <p className="announcement-status">
              {status}
            </p>

          )}

        </div>


        {/* ================= ANNOUNCEMENT LIST ================= */}

        <div className="faculty-announcement-list">

          <h2>
            📋 Created Announcements
          </h2>


          {loading ? (

            <p>
              Loading announcements... ⏳
            </p>

          ) : announcements.length === 0 ? (

            <p>
              No announcements created yet.
            </p>

          ) : (

            <div className="announcement-list">

              {announcements.map(
                (announcement) => (

                  <div
                    className="faculty-announcement-item"
                    key={announcement._id}
                  >

                    <div className="faculty-announcement-info">

                      <span className="announcement-date">
                        📅{" "}
                        {formatDate(
                          announcement.date
                        )}
                      </span>

                      <h3>
                        {announcement.title}
                      </h3>

                      <p>
                        {announcement.message}
                      </p>

                    </div>


                    <div className="faculty-announcement-actions">


                      {/* VIEW */}

                      <button
                        className="view-announcement-btn"
                        onClick={() =>
                          alert(
                            `Title: ${announcement.title}\n\nMessage: ${announcement.message}\n\nDate: ${formatDate(announcement.date)}`
                          )
                        }
                      >
                        👁️ View
                      </button>


                      {/* DELETE */}

                      <button
                        className="delete-announcement-btn"
                        onClick={() =>
                          handleDelete(
                            announcement._id
                          )
                        }
                      >
                        🗑️ Delete
                      </button>


                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>


      </main>

    </div>
  );
}

export default FacultyAnnouncements;