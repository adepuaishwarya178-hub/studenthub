import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./StudyMaterials.css";

function AIMaterials() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/materials")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const aiMaterials = data.filter(
            (material) =>
              material.subject === "Artificial Intelligence"
          );

          setMaterials(aiMaterials);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching AI materials:", error);
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
    <div className="study-materials-page">

      {/* ================= NAVBAR ================= */}

      <nav className="study-materials-nav">

        <div className="logo">
          🎓 StudentHub
        </div>

        <Link to="/materials">
          ← Study Materials
        </Link>

      </nav>


      {/* ================= MAIN ================= */}

      <main className="study-materials-container">

        {/* ================= HEADING ================= */}

        <div className="study-materials-heading">

          <h1>
            🤖 Artificial Intelligence Materials
          </h1>

          <p>
            Access Artificial Intelligence study materials
            uploaded by your faculty.
          </p>

        </div>


        {/* ================= MATERIALS ================= */}

        {loading ? (

          <div className="materials-loading">
            Loading AI materials... ⏳
          </div>

        ) : materials.length === 0 ? (

          <div className="no-materials">

            <div className="empty-icon">
              📭
            </div>

            <h2>
              No AI Materials Available
            </h2>

            <p>
              Your faculty hasn't uploaded any
              Artificial Intelligence materials yet.
            </p>

          </div>

        ) : (

          <div className="materials-grid">

            {materials.map((material) => (

              <div
                className="material-card"
                key={material._id}
              >

                {/* SUBJECT */}

                <div className="material-card-top">

                  <span className="subject-badge">
                    🤖 Artificial Intelligence
                  </span>

                  <span className="unit-badge">
                    {material.unit}
                  </span>

                </div>


                {/* TITLE */}

                <h2>
                  {material.title}
                </h2>


                {/* FILE */}

                <p className="material-file-name">
                  📄 {material.fileName}
                </p>


                {/* DATE */}

                {material.createdAt && (

                  <p className="material-date">
                    📅{" "}
                    {formatDate(material.createdAt)}
                  </p>

                )}


                {/* ACTION */}

                <a
                  href={`http://localhost:5000/${String(
                    material.filePath || ""
                  ).replace(/\\/g, "/")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-material-btn"
                >
                  👁️ View PDF →
                </a>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
}

export default AIMaterials;