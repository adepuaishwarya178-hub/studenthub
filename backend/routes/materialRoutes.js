const express = require("express");
const multer = require("multer");
const path = require("path");

const Material = require("../models/Material");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + file.originalname;

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,

  fileFilter: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();

    if (extension === ".pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

// Upload PDF
router.post("/", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF file",
      });
    }

    const material = new Material({
      subject: req.body.subject,
      unit: req.body.unit,
      title: req.body.title,
      fileName: req.file.originalname,
      filePath: req.file.path,
    });

    const savedMaterial = await material.save();

    res.status(201).json({
      message: "Material uploaded successfully!",
      material: savedMaterial,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to upload material",
    });
  }
});

// Get all materials
router.get("/", async (req, res) => {
  try {
    const materials = await Material.find().sort({
      createdAt: -1,
    });

    res.json(materials);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch materials",
    });
  }
});
// Delete material
router.delete("/:id", async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);

    if (!material) {
      return res.status(404).json({
        message: "Material not found",
      });
    }

    res.json({
      message: "Material deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to delete material",
    });
  }
});

module.exports = router;
// Delete material
router.delete("/:id", async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);

    if (!material) {
      return res.status(404).json({
        message: "Material not found",
      });
    }

    res.json({
      message: "Material deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to delete material",
    });
  }
});