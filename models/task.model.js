const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    // maxLength: [20, "max is 20!"],
  },
  completed: { type: Boolean, default: false },
});

const taskModel = mongoose.model("Task", taskSchema);

module.exports = taskModel;
