const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },

    unit: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    filePath: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Material", materialSchema);