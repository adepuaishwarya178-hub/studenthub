import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./FacultyProfile.css";

function FacultyProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    facultyId: "",
    department: "",
    subject: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/faculty")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setFormData({
            name: data.name || "",
            email: data.email || "",
            facultyId: data.facultyId || "",
            department: data.department || "",
            subject: data.subject || "",
          });
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/faculty",
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
        setMessage("Faculty profile saved successfully! ✅");
      } else {
        setMessage(
          data.message || "Failed to save profile ❌"
        );
      }
    } catch (error) {
      console.log(error);
      setMessage("Backend connection failed ❌");
    }
  };

  return (
    <div className="faculty-profile-page">

      <nav className="faculty-profile-nav">

        <div className="logo">
          🎓 StudentHub
        </div>

        <Link to="/faculty/dashboard">
          ← Faculty Dashboard
        </Link>

      </nav>


      <main className="faculty-profile-container">

        <div className="faculty-profile-header">

          <div className="faculty-profile-avatar">
            👨‍🏫
          </div>

          <div>
            <h1>Faculty Profile</h1>

            <p>
              Manage your faculty information
            </p>
          </div>

        </div>


        <div className="faculty-profile-card">

          <form onSubmit={handleSubmit}>

            <div className="faculty-form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter faculty name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>


            <div className="faculty-form-group">

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter faculty email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>


            <div className="faculty-form-group">

              <label>
                Faculty ID
              </label>

              <input
                type="text"
                name="facultyId"
                placeholder="Example: FAC001"
                value={formData.facultyId}
                onChange={handleChange}
                required
              />

            </div>


            <div className="faculty-form-group">

              <label>
                Department
              </label>

              <input
                type="text"
                name="department"
                placeholder="Example: CSE"
                value={formData.department}
                onChange={handleChange}
                required
              />

            </div>


            <div className="faculty-form-group">

              <label>
                Subject
              </label>

              <input
                type="text"
                name="subject"
                placeholder="Example: Computer Networks"
                value={formData.subject}
                onChange={handleChange}
                required
              />

            </div>


            <button
              type="submit"
              className="save-faculty-profile"
            >
              Save Profile →
            </button>

          </form>


          {message && (
            <p className="faculty-profile-message">
              {message}
            </p>
          )}

        </div>

      </main>

    </div>
  );
}

export default FacultyProfile;