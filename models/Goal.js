const mongoose = require("mongoose");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isemail");

const GoalSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  target: {
    type: Number,
    requied: true,
  },
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  reminder: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  mileStones: {
    type: [
      {
        mileStoneTitle: {
          type: String,
          required: true,
        },
        mileStoneValue: {
          type: Number,
          required: true,
        },
      },
    ],
    required: true,
  },
});

module.exports = mongoose.model("goal", GoalSchema);
