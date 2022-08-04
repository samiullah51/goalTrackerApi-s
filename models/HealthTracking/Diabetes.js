const mongoose = require("mongoose");

const DiabetesTrackingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  dataAndTime: {
    type: Date,
    required: true,
  },
  systol: {
    type: Number,
    required: true,
  },
  dystol: {
    type: Number,
    required: true,
  },
  detail: {
    type: String,
  },
});

module.exports = mongoose.model("diabetesTrack", DiabetesTrackingSchema);
