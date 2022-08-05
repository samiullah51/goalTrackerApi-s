const AppointmentTracking = require("../../models/HealthTracking/AppointmentTrack");
const router = require("express").Router();
const { verifyToken } = require("../UserRoute/verifyToken");

// Add new Appointment to a Current User
router.post("/add", verifyToken, async (req, res) => {
  const newAppointment = new AppointmentTracking(req.body);
  try {
    const savedAppointment = await newAppointment.save();
    res.status(200).json(savedAppointment);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get all the Appointment of the current user
router.get("/all", verifyToken, async (req, res) => {
  const currentUser = req.user.id;
  try {
    const allAppointmentTracks = await AppointmentTracking.find({
      userId: currentUser,
    });
    res.status(200).json(allAppointmentTracks);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get a specific Appointment of the current user
router.get("/findtrack/:id", verifyToken, async (req, res) => {
  try {
    const foundAppointmentTrack = await AppointmentTracking.findById(
      req.params.id
    );
    res.status(200).json(foundAppointmentTrack);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Edit a Appointment of the current user
router.put("/edit/:id", verifyToken, async (req, res) => {
  const updatedOne = await AppointmentTracking.findById(req.params.id);
  try {
    const editedAppointmentTrack = await updatedOne.updateOne({
      $set: {
        doctorName: req.body.doctorName,
        hospitalName: req.body.hospitalName,
        contact: req.body.contact,
        lastAppointDate: req.body.lastAppointDate,
        nextAppointDate: req.body.nextAppointDate,
        doctorRemarks: req.body.doctorRemarks,
        testDiagnosis: req.body.testDiagnosis,
        files: req.body.files,
      },
    });
    res
      .status(201)
      .json({ message: "Updated Successfully", editedAppointmentTrack });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Delete a specific Appointment of the current user
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const deletedAppointmentTrack = await AppointmentTracking.findByIdAndDelete(
      req.params.id
    );
    res.status(201).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
