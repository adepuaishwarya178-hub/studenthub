import { Link } from "react-router-dom";

function AIMaterials() {
  const units = [
    {
      title: "Unit 1 – Introduction to Artificial Intelligence",
      pdf: "/pdfs/AI-Unit-1.pdf",
    },
    {
      title: "Unit 2 – Problem Solving & Search",
      pdf: "/pdfs/AI-Unit-2.pdf",
    },
  ];

  return (
    <div className="materials-page">
      <nav className="materials-nav">
        <div className="logo">🎓 StudentHub</div>
        <Link to="/materials">← Study Materials</Link>
      </nav>

      <main className="materials-container">
        <div className="materials-heading">
          <h1>🤖 Artificial Intelligence</h1>
          <p>Select a unit to open the PDF.</p>
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
                Open PDF →
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default AIMaterials;