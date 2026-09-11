import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNumber: "",
    branch: "",
    year: "1st Year",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // ================= LOAD PROFILE =================

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      navigate("/login");
      return;
    }

    try {
      const user = JSON.parse(savedUser);

      if (user.role !== "student") {
        navigate("/login");
        return;
      }

      setFormData({
        name: user.name || "",
        email: user.email || "",
        rollNumber: user.rollNumber || "",
        branch: user.branch || "",
        year: user.year || "1st Year",
      });

      setLoading(false);
    } catch (error) {
      console.log("Error reading user:", error);
      navigate("/login");
    }
  }, [navigate]);

  // ================= INPUT CHANGE =================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= SAVE PROFILE =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("Saving profile...");

    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      setMessage("Please login again ❌");
      return;
    }

    try {
      const user = JSON.parse(savedUser);

      // If your backend has student ID
      const studentId = user._id;

      let url = "http://https://studenthub-backend-ubpy.onrender.com/api/students";

      let method = "POST";

      if (studentId) {
        url = `http://https://studenthub-backend-ubpy.onrender.com/api/students/${studentId}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Profile saved successfully! ✅");

        // Update localStorage also
        const updatedUser = {
          ...user,
          ...formData,
        };

        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );
      } else {
        setMessage(
          data.message || "Failed to save profile ❌"
        );
      }
    } catch (error) {
      console.log("Profile error:", error);
      setMessage("Backend connection failed ❌");
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-loading">
          Loading profile... ⏳
        </div>
      </div>
    );
  }

  // ================= UI =================

  return (
    <div className="profile-page">

      {/* NAVBAR */}

      <nav className="profile-nav">

        <div className="logo">
          🎓 StudentHub
        </div>

        <Link to="/dashboard">
          ← Dashboard
        </Link>

      </nav>


      {/* MAIN */}

      <main className="profile-container">

        {/* HEADER */}

        <div className="profile-header">

          <div className="profile-avatar">
            👨‍🎓
          </div>

          <div>
            <h1>My Profile</h1>

            <p>
              Manage your student information
            </p>
          </div>

        </div>


        {/* PROFILE CARD */}

        <form
          className="profile-card"
          onSubmit={handleSubmit}
        >

          {/* NAME */}

          <div className="form-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>


          {/* EMAIL */}

          <div className="form-group">

            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>


          {/* ROLL NUMBER */}

          <div className="form-group">

            <label>
              Roll Number
            </label>

            <input
              type="text"
              name="rollNumber"
              placeholder="Enter your roll number"
              value={formData.rollNumber}
              onChange={handleChange}
            />

          </div>


          {/* BRANCH */}

          <div className="form-group">

            <label>
              Branch
            </label>

            <input
              type="text"
              name="branch"
              placeholder="Example: CSE"
              value={formData.branch}
              onChange={handleChange}
            />

          </div>


          {/* YEAR */}

          <div className="form-group">

            <label>
              Year
            </label>

            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
            >

              <option>
                1st Year
              </option>

              <option>
                2nd Year
              </option>

              <option>
                3rd Year
              </option>

              <option>
                4th Year
              </option>

            </select>

          </div>


          {/* SAVE */}

          <button
            type="submit"
            className="save-profile"
          >
            Save Profile
          </button>


          {/* MESSAGE */}

          {message && (
            <p className="profile-message">
              {message}
            </p>
          )}

        </form>

      </main>

    </div>
  );
}

export default Profile;