import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import WTMaterials from "./WTMaterials";
import AIMaterials from "./AIMaterials";
import CNMaterials from "./CNMaterials";
import Announcements from "./Announcements";
import Timetable from "./Timetable";
import StudyMaterials from "./StudyMaterials";
import Assignments from "./Assignments";
import Profile from "./Profile";

import StudentDashboard from "./StudentDashboard";
import Login from "./Login";
import Signup from "./Signup";

import FacultyDashboard from "./FacultyDashboard";
import FacultyMaterials from "./FacultyMaterials";
import FacultyAnnouncements from "./FacultyAnnouncements";
import FacultyAssignments from "./FacultyAssignments";
import FacultyProfile from "./FacultyProfile";

import ProtectedRoute from "./ProtectedRoute";

import "./App.css";

// ================= HOME =================

function Home() {
  return (
    <div className="app">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <div className="logo">
          🎓 StudentHub
        </div>

        <div className="nav-links">

          <a href="#features">
            Features
          </a>

          <a href="#about">
            About
          </a>

          <Link to="/login">
            <button className="login-btn">
              Login
            </button>
          </Link>

        </div>

      </nav>

      {/* ================= HERO ================= */}

      <section className="hero">

        <div className="hero-content">

          <p className="welcome">
            WELCOME TO STUDENTHUB 👋
          </p>

          <h1>
            Everything Students Need,
            <span> In One Place.</span>
          </h1>

          <p className="description">
            Manage your studies, assignments, timetable
            and important college updates from one simple
            platform.
          </p>

          <Link to="/login">
            <button className="get-started">
              Get Started →
            </button>
          </Link>

        </div>

        <div className="hero-card">

          <div className="card-icon">
            📚
          </div>

          <h3>
            Study Smarter
          </h3>

          <p>
            Organize your academic life with StudentHub.
          </p>

        </div>

      </section>

      {/* ================= FEATURES ================= */}

      <section
        className="features"
        id="features"
      >

        <h2>
          Everything You Need
        </h2>

        <p className="section-text">
          Stay organized and make your student life easier.
        </p>

        <div className="feature-grid">

          {/* Study Materials */}

          <div className="feature-card">

            <div className="icon">
              📚
            </div>

            <h3>
              Study Materials
            </h3>

            <p>
              Access and organize notes and study resources.
            </p>

          </div>

          {/* Assignments */}

          <div className="feature-card">

            <div className="icon">
              📝
            </div>

            <h3>
              Assignments
            </h3>

            <p>
              Keep track of assignments and deadlines.
            </p>

          </div>

          {/* Timetable */}

          <div className="feature-card">

            <div className="icon">
              📅
            </div>

            <h3>
              Timetable
            </h3>

            <p>
              View your classes and manage your schedule.
            </p>

          </div>

          {/* Announcements */}

          <div className="feature-card">

            <div className="icon">
              📢
            </div>

            <h3>
              Announcements
            </h3>

            <p>
              Never miss important college announcements.
            </p>

          </div>

        </div>

      </section>

      {/* ================= ABOUT ================= */}

      <section
        id="about"
        className="features"
      >

        <h2>
          About StudentHub
        </h2>

        <p className="section-text">
          StudentHub is a centralized academic management
          platform designed to help students and faculty
          manage their academic activities efficiently.
        </p>

      </section>

    </div>
  );
}

// ================= APP =================

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ================= HOME ================= */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* ================= LOGIN ================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* ================= SIGNUP ================= */}

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* ================================================= */}
        {/*                  STUDENT ROUTES                   */}
        {/* ================================================= */}

        {/* Student Dashboard */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Student Profile */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute role="student">
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Assignments */}

        <Route
          path="/assignments"
          element={
            <ProtectedRoute role="student">
              <Assignments />
            </ProtectedRoute>
          }
        />

        {/* Study Materials */}

        <Route
          path="/materials"
          element={
            <ProtectedRoute role="student">
              <StudyMaterials />
            </ProtectedRoute>
          }
        />

        {/* CN Materials */}

        <Route
          path="/materials/cn"
          element={
            <ProtectedRoute role="student">
              <CNMaterials />
            </ProtectedRoute>
          }
        />

        {/* AI Materials */}

        <Route
          path="/materials/ai"
          element={
            <ProtectedRoute role="student">
              <AIMaterials />
            </ProtectedRoute>
          }
        />

        {/* WT Materials */}

        <Route
          path="/materials/wt"
          element={
            <ProtectedRoute role="student">
              <WTMaterials />
            </ProtectedRoute>
          }
        />

        {/* Timetable */}

        <Route
          path="/timetable"
          element={
            <ProtectedRoute role="student">
              <Timetable />
            </ProtectedRoute>
          }
        />

        {/* Announcements */}

        <Route
          path="/announcements"
          element={
            <ProtectedRoute role="student">
              <Announcements />
            </ProtectedRoute>
          }
        />

        {/* ================================================= */}
        {/*                  FACULTY ROUTES                   */}
        {/* ================================================= */}

        {/* Faculty Dashboard */}

        <Route
          path="/faculty/dashboard"
          element={
            <ProtectedRoute role="faculty">
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />

        {/* Faculty Materials */}

        <Route
          path="/faculty/materials"
          element={
            <ProtectedRoute role="faculty">
              <FacultyMaterials />
            </ProtectedRoute>
          }
        />

        {/* Faculty Announcements */}

        <Route
          path="/faculty/announcements"
          element={
            <ProtectedRoute role="faculty">
              <FacultyAnnouncements />
            </ProtectedRoute>
          }
        />

        {/* Faculty Assignments */}

        <Route
          path="/faculty/assignments"
          element={
            <ProtectedRoute role="faculty">
              <FacultyAssignments />
            </ProtectedRoute>
          }
        />

        {/* Faculty Profile */}

        <Route
          path="/faculty/profile"
          element={
            <ProtectedRoute role="faculty">
              <FacultyProfile />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;