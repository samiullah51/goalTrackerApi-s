const MedicineTracking = require("../../models/HealthTracking/MedicineTracking");
const router = require("express").Router();
const { verifyToken } = require("../UserRoute/verifyToken");

// Add new Habit to a Current User
router.post("/medicinetrack/add", verifyToken, async (req, res) => {
  const newMedicineTrack = new MedicineTracking(req.body);
  try {
    const savedMedicineTrack = await newMedicineTrack.save();
    res.status(200).json(savedMedicineTrack);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get all the medicineTracks of the current user
router.get("/medicinetrack/all", verifyToken, async (req, res) => {
  const currentUser = req.user.id;
  try {
    const allMedicineTracks = await MedicineTracking.find({
      userId: currentUser,
    });
    res.status(200).json(allMedicineTracks);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get a specific MedicineTrack of the current user
router.get("/medicinetrack/findtrack/:id", verifyToken, async (req, res) => {
  const currentUser = req.user.id;
  try {
    const foundMedicineTrack = await MedicineTracking.findOne({
      userId: currentUser,
    });
    res.status(200).json(foundMedicineTrack);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Edit a habit of the current user
router.put("/medicinetrack/edit/:id", verifyToken, async (req, res) => {
  const updatedOne = await MedicineTracking.findById(req.params.id);
  try {
    const editedMedicineTrack = await updatedOne.updateOne({
      $set: {
        medicineName: req.body.medicineName,
        totalDose: req.body.totalDose,
        dosePerDay: req.body.dosePerDay,
        morning: {
          beforeMeal: req.body.beforeMeal,
          afterMeal: req.body.afterMeal,
          reminder: req.body.reminder,
        },
        afternoon: {
          beforeMeal: req.body.beforeMeal,
          afterMeal: req.body.afterMeal,
          reminder: req.body.reminder,
        },
        evening: {
          beforeMeal: req.body.beforeMeal,
          afterMeal: req.body.afterMeal,
          reminder: req.body.reminder,
        },
        setReminder: {
          from: req.body.from,
          to: req.body.to,
        },
      },
    });
    res
      .status(201)
      .json({ message: "Updated Successfully", editedMedicineTrack });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Delete a specific medicineTrack of the current user
router.delete("/medicinetrack/delete/:id", verifyToken, async (req, res) => {
  try {
    const deletedMedicineTrack = await MedicineTracking.findByIdAndDelete(
      req.params.id
    );
    res.status(201).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
