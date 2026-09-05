import { Link } from "react-router-dom";

function CNMaterials() {
  const units = [
    {
      title: "Unit 1 – Introduction to Networks",
      pdf: "/pdfs/CN-Unit-1.pdf",
    },
    {
      title: "Unit 2 – Data Link Layer",
      pdf: "/pdfs/CN-Unit-2.pdf",
    },
    {
      title: "Unit 3 – Network Layer",
      pdf: "/pdfs/CN-Unit-3.pdf",
    },
  ];

  return (
    <div className="materials-page">

      <nav className="materials-nav">
        <div className="logo">🎓 StudentHub</div>

        <Link to="/materials">
          ← Study Materials
        </Link>
      </nav>

      <main className="materials-container">

        <div className="materials-heading">
          <h1>💻 Computer Networks</h1>
          <p>Select a unit to view the PDF.</p>
        </div>

        <div className="subject-grid">

          {units.map((unit, index) => (
            <div className="subject-card" key={index}>

              <div className="subject-icon">📄</div>

              <h3>{unit.title}</h3>

              <a
                href={unit.pdf}
                target="_blank"
                rel="noopener noreferrer"
              >
                📄 Open PDF →
              </a>

            </div>
          ))}

        </div>

      </main>

    </div>
  );
}

export default CNMaterials;