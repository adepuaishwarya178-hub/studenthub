const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    dueDate: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Assignment", assignmentSchema);