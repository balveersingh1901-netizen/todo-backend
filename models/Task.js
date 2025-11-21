const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date, default: null },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low",
  },
  category: {
    type: String,
    default: "General",
  }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
