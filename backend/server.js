const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const studentRoutes = require("./routes/studentRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const authRoutes = require("./routes/authRoutes");
const materialRoutes = require("./routes/materialRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/students", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/announcements", announcementRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "StudentHub Backend is running! 🚀"
  });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully! 🗄️✅");
  })
  .catch((error) => {
    console.log(
      "MongoDB connection failed:",
      error.message
    );
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `StudentHub server running on port ${PORT}`
  );
});