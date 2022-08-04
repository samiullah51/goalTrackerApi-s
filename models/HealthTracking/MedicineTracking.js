const mongoose = require("mongoose");

const MedicineTrackingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  medicineName: {
    type: String,
    required: true,
  },
  totalDose: {
    type: Number,
    required: true,
  },
  dosePerDay: {
    type: Number,
    required: true,
  },
  morning: {
    beforeMeal: {
      type: Boolean,
      default: false,
    },
    afterMeal: {
      type: Boolean,
      default: true,
    },
    reminder: {
      type: String,
      required: true,
    },
  },
  afternoon: {
    beforeMeal: {
      type: Boolean,
      default: false,
    },
    afterMeal: {
      type: Boolean,
      default: true,
    },
    reminder: {
      type: String,
      required: true,
    },
  },
  evening: {
    beforeMeal: {
      type: Boolean,
      default: false,
    },
    afterMeal: {
      type: Boolean,
      default: true,
    },
    reminder: {
      type: String,
      required: true,
    },
  },
  setReminder: {
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
  },
});

module.exports = mongoose.model("medicineTrack", MedicineTrackingSchema);
