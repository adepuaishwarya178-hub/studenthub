import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Announcements.css";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH ANNOUNCEMENTS =================

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch(
        "https://studenthub-dvdp.onrender.com/api/announcements"
      );

      const data = await response.json();

      if (response.ok) {
        setAnnouncements(data);
      } else {
        console.log(
          "Failed to fetch announcements:",
          data
        );
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

  // ================= UI =================

  return (
    <div className="announcements-page">

      {/* ================= NAVBAR ================= */}

      <nav className="announcements-nav">

        <div className="logo">
          🎓 StudentHub
        </div>

        <Link to="/dashboard">
          ← Dashboard
        </Link>

      </nav>

      {/* ================= MAIN ================= */}

      <main className="announcements-container">

        {/* ================= HEADING ================= */}

        <div className="announcements-heading">

          <h1>
            📢 Announcements
          </h1>

          <p>
            Stay updated with important college announcements.
          </p>

        </div>

        {/* ================= CONTENT ================= */}

        {loading ? (

          <div className="announcement-message">
            Loading announcements... ⏳
          </div>

        ) : announcements.length === 0 ? (

          <div className="announcement-message">
            No announcements available 📢
          </div>

        ) : (

          <div className="announcements-list">

            {announcements.map(
              (announcement) => (

                <div
                  className="announcement-card"
                  key={announcement._id}
                >

                  {/* ICON */}

                  <div className="announcement-icon">
                    📢
                  </div>

                  {/* CONTENT */}

                  <div className="announcement-content">

                    <h3>
                      {announcement.title}
                    </h3>

                    <p>
                      {announcement.message}
                    </p>

                    <span>
                      📅{" "}
                      {formatDate(
                        announcement.date
                      )}
                    </span>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </main>

    </div>
  );
}

export default Announcements;