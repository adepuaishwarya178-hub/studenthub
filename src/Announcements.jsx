import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Announcements.css";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://https://studenthub-backend-ubpy.onrender.com/api/announcements")
      .then((response) => response.json())
      .then((data) => {
        setAnnouncements(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching announcements:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="announcements-page">

      <nav className="announcements-nav">

        <div className="logo">
          🎓 StudentHub
        </div>

        <Link to="/dashboard">
          ← Dashboard
        </Link>

      </nav>

      <main className="announcements-container">

        <div className="announcements-heading">
          <h1>📢 Announcements</h1>
          <p>Stay updated with important college announcements.</p>
        </div>

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

            {announcements.map((announcement) => (
              <div
                className="announcement-card"
                key={announcement._id}
              >

                <div className="announcement-icon">
                  📢
                </div>

                <div className="announcement-content">

                  <h3>
                    {announcement.title}
                  </h3>

                  <p>
                    {announcement.message}
                  </p>

                  <span>
                    📅 {announcement.date}
                  </span>

                </div>

              </div>
            ))}

          </div>
        )}

      </main>

    </div>
  );
}

export default Announcements;