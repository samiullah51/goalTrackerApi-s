const mongoose = require("mongoose");

const AppointmentTrack = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  hospitalName: {
    type: String,
    required: true,
  },
  contact: {
    type: String, // we can also add contact as a string e.g: 032341232321
    required: true,
  },
  lastAppointDate: {
    type: Date,
    required: true,
  },
  nextAppointDate: {
    type: Date,
    required: true,
  },
  doctorRemarks: {
    type: String,
    required: true,
  },
  testDiagnosis: {
    type: String,
    required: true,
  },
  files: {
    type: Array,
  },
});

module.exports = mongoose.model("appointmentTrack", AppointmentTrack);
