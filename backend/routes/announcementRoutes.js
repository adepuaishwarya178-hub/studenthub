const express = require("express");
const router = express.Router();

const Announcement = require("../models/Announcement");

// Get announcements
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({
      createdAt: -1,
    });

    res.json(announcements);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch announcements",
    });
  }
});

// Add announcement
router.post("/", async (req, res) => {
  try {
    const announcement = new Announcement(req.body);

    const savedAnnouncement = await announcement.save();

    res.status(201).json(savedAnnouncement);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add announcement",
    });
  }
});

module.exports = router;
// Delete announcement
router.delete("/:id", async (req, res) => {
  try {
    const announcement =
      await Announcement.findByIdAndDelete(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        message: "Announcement not found",
      });
    }

    res.json({
      message: "Announcement deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to delete announcement",
    });
  }
});