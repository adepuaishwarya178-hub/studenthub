const express = require("express");
const router = express.Router();

const Faculty = require("../models/Faculty");


// GET FACULTY PROFILE

router.get("/", async (req, res) => {
  try {
    const faculty = await Faculty.findOne().sort({
      createdAt: -1,
    });

    res.json(faculty || {});
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch faculty profile",
    });
  }
});


// SAVE FACULTY PROFILE

router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      facultyId,
      department,
      subject,
    } = req.body;

    const faculty = new Faculty({
      name,
      email,
      facultyId,
      department,
      subject,
    });

    await faculty.save();

    res.status(201).json({
      message: "Faculty profile saved successfully",
      faculty,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to save faculty profile",
    });
  }
});


module.exports = router;