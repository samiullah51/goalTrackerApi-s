const DiabetesTracking = require("../../models/HealthTracking/DiabetesTrack");
const router = require("express").Router();
const { verifyToken } = require("../UserRoute/verifyToken");

// Add new Diabetes to a Current User
router.post("/add", verifyToken, async (req, res) => {
  const newDiabetes = new DiabetesTracking(req.body);
  try {
    const savedDiabetes = await newDiabetes.save();
    res.status(200).json(savedDiabetes);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get all the Diabetes of the current user
router.get("/all", verifyToken, async (req, res) => {
  const currentUser = req.user.id;
  try {
    const allDiabetesTracks = await DiabetesTracking.find({
      userId: currentUser,
    });
    res.status(200).json(allDiabetesTracks);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get a specific Diabetes of the current user
router.get("/findtrack/:id", verifyToken, async (req, res) => {
  try {
    const foundDiabetesTrack = await DiabetesTracking.findById(req.params.id);
    res.status(200).json(foundDiabetesTrack);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Edit a Diabetes of the current user
router.put("/edit/:id", verifyToken, async (req, res) => {
  const updatedOne = await DiabetesTracking.findById(req.params.id);
  try {
    const editedDiabetesTrack = await updatedOne.updateOne({
      $set: {
        dataAndTime: req.body.dataAndTime,
        systol: req.body.systol,
        dystol: req.body.dystol,
        detail: req.body.detail,
      },
    });
    res
      .status(201)
      .json({ message: "Updated Successfully", editedDiabetesTrack });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Delete a specific Diabetes of the current user
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const deletedDiabetesTrack = await DiabetesTracking.findByIdAndDelete(
      req.params.id
    );
    res.status(201).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
