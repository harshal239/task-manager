const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
  },
  startTime: {
    type: Date,
    required: [true, "Start Date is required"],
    default: Date.now,
  },
  endTime: {
    type: Date,
    required: [true, "End Date is required"],
    default: Date.now,
  },
  priority: {
    type: Number,
    required: [true, "Prority is required"],
    unique: true,
  },
  status: {
    type: Boolean,
    required: [true, "Status is required"],
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
