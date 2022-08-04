const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
    requied: true,
  },
  repitition: {
    type: String,
    default: "daily",
  },
  reminder: {
    type: Number,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("habit", HabitSchema);
