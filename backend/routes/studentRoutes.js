const express = require("express");
const Student = require("../models/Student");

const router = express.Router();


// ================= SAVE / UPDATE STUDENT =================

router.post("/", async (req, res) => {
  try {

    const {
      name,
      email,
      rollNumber,
      branch,
      year
    } = req.body;

    if (!name || !email || !rollNumber || !branch || !year) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }


    // Check if student already exists

    const existingStudent = await Student.findOne({
      email: email,
    });


    // Update existing student

    if (existingStudent) {

      existingStudent.name = name;
      existingStudent.rollNumber = rollNumber;
      existingStudent.branch = branch;
      existingStudent.year = year;

      await existingStudent.save();

      return res.status(200).json({
        message: "Student profile updated successfully",
        student: existingStudent,
      });
    }


    // Create new student

    const student = new Student({
      name,
      email,
      rollNumber,
      branch,
      year,
    });

    await student.save();

    res.status(201).json({
      message: "Student created successfully",
      student,
    });

  } catch (error) {

    console.log("STUDENT ERROR:", error);

    res.status(500).json({
      message: "Failed to create student",
      error: error.message,
    });
  }
});


// ================= GET ALL STUDENTS =================

router.get("/", async (req, res) => {

  try {

    const students = await Student.find();

    res.json(students);

  } catch (error) {

    console.log("GET STUDENTS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch students",
      error: error.message,
    });
  }

});


module.exports = router;