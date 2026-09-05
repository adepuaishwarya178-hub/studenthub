import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FacultyMaterials.css";

function FacultyMaterials() {

  const [formData, setFormData] = useState({
    subject: "Computer Networks",
    unit: "Unit 1",
    title: "",
  });

  const [pdf, setPdf] = useState(null);
  const [message, setMessage] = useState("");
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  const subjects = [
    "Computer Networks",
    "Artificial Intelligence",
    "Web Technologies",
    "Cyber Security",
    "Computer Science",
  ];

  const units = ["Unit 1", "Unit 2", "Unit 3"];


  // ================= FETCH MATERIALS =================

  const fetchMaterials = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/materials"
      );

      const data = await response.json();

      if (response.ok) {
        setMaterials(data);
      }

    } catch (error) {

      console.log(
        "Error fetching materials:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    fetchMaterials();
  }, []);


  // ================= FORM CHANGE =================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  // ================= FILE CHANGE =================

  const handleFileChange = (e) => {

    const file = e.target.files[0];

    if (file && file.type !== "application/pdf") {

      setMessage(
        "Please select only a PDF file ❌"
      );

      setPdf(null);

      return;
    }

    setPdf(file);
    setMessage("");

  };


  // ================= UPLOAD =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!pdf) {

      setMessage(
        "Please select a PDF file ❌"
      );

      return;
    }

    const data = new FormData();

    data.append(
      "subject",
      formData.subject
    );

    data.append(
      "unit",
      formData.unit
    );

    data.append(
      "title",
      formData.title
    );

    data.append(
      "pdf",
      pdf
    );


    try {

      const response = await fetch(
        "http://localhost:5000/api/materials",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();


      if (response.ok) {

        setMessage(
          "Material uploaded successfully! ✅"
        );

        setFormData({
          subject: "Computer Networks",
          unit: "Unit 1",
          title: "",
        });

        setPdf(null);

        const fileInput =
          document.getElementById("pdfInput");

        if (fileInput) {
          fileInput.value = "";
        }

        // Refresh materials list
        fetchMaterials();

      } else {

        setMessage(
          result.message ||
          "Upload failed ❌"
        );

      }

    } catch (error) {

      console.log(error);

      setMessage(
        "Backend connection failed ❌"
      );

    }

  };


  // ================= DELETE MATERIAL =================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this material?"
    );

    if (!confirmDelete) {
      return;
    }


    try {

      const response = await fetch(
        `http://localhost:5000/api/materials/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();


      if (response.ok) {

        setMessage(
          "Material deleted successfully! ✅"
        );

        // Remove deleted material from screen
        setMaterials(
          materials.filter(
            (material) =>
              material._id !== id
          )
        );

      } else {

        setMessage(
          result.message ||
          "Failed to delete material ❌"
        );

      }

    } catch (error) {

      console.log(error);

      setMessage(
        "Backend connection failed ❌"
      );

    }

  };


  return (
    <div className="faculty-materials-page">


      {/* ================= NAVBAR ================= */}

      <nav className="faculty-materials-nav">

        <div className="logo">
          🎓 StudentHub
        </div>

        <Link to="/faculty/dashboard">
          ← Faculty Dashboard
        </Link>

      </nav>


      {/* ================= MAIN ================= */}

      <main className="faculty-materials-container">


        {/* ================= HEADING ================= */}

        <div className="faculty-materials-heading">

          <h1>
            📚 Manage Study Materials
          </h1>

          <p>
            Upload and manage PDF study
            materials for students.
          </p>

        </div>


        {/* ================= UPLOAD CARD ================= */}

        <div className="upload-material-card">

          <h2>
            📤 Upload Study Material
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


            {/* UNIT */}

            <div className="form-group">

              <label>
                Unit
              </label>

              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
              >

                {units.map((unit) => (

                  <option
                    key={unit}
                    value={unit}
                  >
                    {unit}
                  </option>

                ))}

              </select>

            </div>


            {/* TITLE */}

            <div className="form-group">

              <label>
                Material Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="Example: Unit 1 Notes"
                value={formData.title}
                onChange={handleChange}
                required
              />

            </div>


            {/* PDF */}

            <div className="form-group">

              <label>
                Select PDF
              </label>

              <input
                id="pdfInput"
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                required
              />

            </div>


            {pdf && (

              <p className="selected-file">
                📄 Selected: {pdf.name}
              </p>

            )}


            <button
              type="submit"
              className="upload-material-btn"
            >
              Upload PDF →
            </button>


          </form>


          {message && (

            <p className="upload-message">
              {message}
            </p>

          )}

        </div>


        {/* ================= MATERIAL LIST ================= */}

        <div className="materials-list-section">

          <h2>
            📚 Uploaded Materials
          </h2>


          {loading ? (

            <p>
              Loading materials... ⏳
            </p>

          ) : materials.length === 0 ? (

            <p>
              No materials uploaded yet.
            </p>

          ) : (

            <div className="materials-list">

              {materials.map((material) => (

                <div
                  className="material-item"
                  key={material._id}
                >

                  <div className="material-info">

                    <h3>
                      {material.title}
                    </h3>

                    <p>
                      📘 {material.subject}
                    </p>

                    <p>
                      📖 {material.unit}
                    </p>

                    <p>
                      📄 {material.fileName}
                    </p>

                  </div>


                  <div className="material-actions">

                    {/* VIEW */}

                    <a
                      href={`http://localhost:5000/${material.filePath.replace(
                        /\\/g,
                        "/"
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-material-btn"
                    >
                      👁️ View PDF
                    </a>


                    {/* DELETE */}

                    <button
                      onClick={() =>
                        handleDelete(
                          material._id
                        )
                      }
                      className="delete-material-btn"
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

export default FacultyMaterials;