# 🎓 StudentHub

A full-stack student and faculty management portal designed to provide a centralized platform for managing student information, study materials, assignments, announcements, timetables, and academic activities.

## 📌 About the Project

StudentHub is a web-based academic management system built using React, Node.js, Express, and MongoDB.

The application provides separate experiences for **students and faculty members**, allowing students to access academic resources while faculty can manage announcements, assignments, materials, and other academic information.

## ✨ Features

### 👨‍🎓 Student Features

- Student registration and login
- Protected student dashboard
- Student profile management
- View and manage student information
- Access study materials
- Subject-wise study resources
- View assignments
- Track pending and completed assignments
- Study progress calculation
- View class timetable
- View college announcements

### 👩‍🏫 Faculty Features

- Faculty registration and login
- Protected faculty dashboard
- Faculty profile management
- Create and manage announcements
- Create and manage assignments
- Upload and manage study materials
- Manage academic resources
- Faculty academic management interface

### 🔐 Authentication & Security

- Role-based access for students and faculty
- Protected frontend routes
- Backend API endpoints
- Environment variables for sensitive configuration
- MongoDB database integration

## 🛠️ Technologies Used

### Frontend

- React.js
- Vite
- React Router
- JavaScript
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Development Tools

- Visual Studio Code
- Git
- GitHub
- GitHub Desktop
- npm

## 🏗️ Project Structure

```text
StudentHub/
│
├── backend/
│   ├── models/
│   │   ├── Announcement.js
│   │   ├── Assignment.js
│   │   ├── Faculty.js
│   │   ├── Material.js
│   │   ├── Student.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── announcementRoutes.js
│   │   ├── assignmentRoutes.js
│   │   ├── authRoutes.js
│   │   ├── facultyRoutes.js
│   │   ├── materialRoutes.js
│   │   └── studentRoutes.js
│   │
│   ├── uploads/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── public/
│   └── pdfs/
│
├── src/
│   ├── pages/
│   ├── assets/
│   ├── App.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── StudentDashboard.jsx
│   ├── FacultyDashboard.jsx
│   ├── Profile.jsx
│   ├── FacultyProfile.jsx
│   ├── Assignments.jsx
│   ├── FacultyAssignments.jsx
│   ├── Announcements.jsx
│   ├── FacultyAnnouncements.jsx
│   ├── StudyMaterials.jsx
│   ├── FacultyMaterials.jsx
│   ├── Timetable.jsx
│   └── ProtectedRoute.jsx
│
├── .gitignore
├── package.json
├── vite.config.js
└── README.mds