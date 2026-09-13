import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./StudyMaterials.css";

function StudyMaterials() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  const subjects = [
    {
      icon: "💻",
      name: "Computer Networks",
      description:
        "Network protocols, layers and communication concepts.",
      units: [
        "Unit 1 – Introduction to Networks",
        "Unit 2 – Data Link Layer",
        "Unit 3 – Network Layer",
      ],
    },
    {
      icon: "🤖",
      name: "Artificial Intelligence",
      description:
        "Search algorithms, agents and AI concepts.",
      units: [
        "Unit 1 – Introduction to AI",
        "Unit 2 – Problem Solving & Search",
        "Unit 3 – Knowledge Representation",
      ],
    },
    {
      icon: "🌐",
      name: "Web Technologies",
      description:
        "HTML, CSS, XML, Servlets and web development concepts.",
      units: [
        "Unit 1 – Web Technologies Introduction",
        "Unit 2 – HTML, CSS & XML",
        "Unit 3 – Servlets",
      ],
    },
    {
      icon: "🔐",
      name: "Cyber Security",
      description:
        "Cybercrime, security threats and protection techniques.",
      units: [
        "Unit 1 – Introduction to Cyber Security",
        "Unit 2 – Cybercrime & Cyber Attacks",
        "Unit 3 – Security Technologies",
      ],
    },
    {
      icon: "💻",
      name: "Computer Science",
      description:
        "Computer science concepts and learning resources.",
      units: [
        "Unit 1 – Introduction",
        "Unit 2 – Core Concepts",
        "Unit 3 – Advanced Concepts",
      ],
    },
  ];

  // ================= FETCH MATERIALS =================

  useEffect(() => {
    fetch("https://studenthub-dvdp.onrender.com/api/materials")
      .then((response) => response.json())
      .then((data) => {
        setMaterials(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching materials:", error);
        setLoading(false);
      });
  }, []);

  // ================= FILTER MATERIALS =================

  const getSubjectMaterials = (subjectName) => {
    return materials.filter(
      (material) => material.subject === subjectName
    );
  };

  // ================= PDF URL =================

  const getPdfUrl = (material) => {
    // If this is a static PDF from public/pdfs,
    // use the frontend URL.

    if (material.fileName) {
      const fileName = String(material.fileName)
        .replace(/\\/g, "/")
        .split("/")
        .pop();

      return `/pdfs/${fileName}`;
    }

    return "#";
  };

  // ================= UI =================

  return (
    <div className="materials-page">

      {/* ================= NAVBAR ================= */}

      <nav className="materials-nav">
        <div className="logo">
          🎓 StudentHub
        </div>

        <Link to="/dashboard">
          ← Dashboard
        </Link>
      </nav>

      {/* ================= MAIN ================= */}

      <main className="materials-container">

        {/* ================= HEADING ================= */}

        <div className="materials-heading">
          <h1>
            📚 Study Materials
          </h1>

          <p>
            Find your notes and learning resources easily.
          </p>
        </div>

        {/* ================= LOADING ================= */}

        {loading ? (
          <div className="materials-loading">
            Loading materials... ⏳
          </div>
        ) : (
          <div className="subject-grid">

            {subjects.map((subject, index) => {

              const subjectMaterials =
                getSubjectMaterials(subject.name);

              return (
                <div
                  className="subject-card"
                  key={index}
                >

                  {/* SUBJECT ICON */}

                  <div className="subject-icon">
                    {subject.icon}
                  </div>

                  {/* SUBJECT NAME */}

                  <h3>
                    {subject.name}
                  </h3>

                  {/* DESCRIPTION */}

                  <p>
                    {subject.description}
                  </p>

                  {/* UNITS */}

                  <div className="material-list">

                    {subject.units.map(
                      (unit, unitIndex) => (
                        <p key={unitIndex}>
                          📄 {unit}
                        </p>
                      )
                    )}

                  </div>

                  {/* UPLOADED MATERIALS */}

                  {subjectMaterials.length > 0 ? (

                    <div className="uploaded-materials">

                      <h4>
                        📚 Uploaded Materials
                      </h4>

                      {subjectMaterials.map(
                        (material) => (

                          <div
                            className="uploaded-material"
                            key={material._id}
                          >

                            <div>

                              <strong>
                                {material.title}
                              </strong>

                              <p>
                                {material.unit}
                              </p>

                              <small>
                                📄 {material.fileName}
                              </small>

                            </div>

                            {/* VIEW PDF */}

                            <a
                              href={getPdfUrl(material)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="view-pdf"
                            >
                              View PDF →
                            </a>

                          </div>

                        )
                      )}

                    </div>

                  ) : (

                    <p className="no-material">
                      No PDFs uploaded yet.
                    </p>

                  )}

                </div>
              );
            })}

          </div>
        )}

      </main>

    </div>
  );
}

export default StudyMaterials;