const express = require("express");
const Assignment = require("../models/Assignment");

const router = express.Router();

// CREATE ASSIGNMENT
router.post("/", async (req, res) => {
  try {
    const {
      title,
      subject,
      description,
      dueDate,
    } = req.body;

    if (!title || !subject || !dueDate) {
      return res.status(400).json({
        message: "Title, subject and due date are required",
      });
    }

    const assignment = new Assignment({
      title,
      subject,
      description,
      dueDate,
      status: "Pending",
    });

    const savedAssignment = await assignment.save();

    res.status(201).json({
      message: "Assignment created successfully!",
      assignment: savedAssignment,
    });
  } catch (error) {
    console.log("CREATE ASSIGNMENT ERROR:", error);

    res.status(500).json({
      message: "Failed to create assignment",
    });
  }
});

// GET ALL ASSIGNMENTS
router.get("/", async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({
      createdAt: -1,
    });

    res.json(assignments);
  } catch (error) {
    console.log("GET ASSIGNMENTS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch assignments",
    });
  }
});

// DELETE ASSIGNMENT
router.delete("/:id", async (req, res) => {
  try {
    const deletedAssignment =
      await Assignment.findByIdAndDelete(req.params.id);

    if (!deletedAssignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    res.json({
      message: "Assignment deleted successfully!",
    });
  } catch (error) {
    console.log("DELETE ASSIGNMENT ERROR:", error);

    res.status(500).json({
      message: "Failed to delete assignment",
    });
  }
});

module.exports = router;
// Delete assignment
router.delete("/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(
      req.params.id
    );

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    res.json({
      message: "Assignment deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to delete assignment",
    });
  }
});