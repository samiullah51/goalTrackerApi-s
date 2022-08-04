const Habit = require("../../models/Habit");
const router = require("express").Router();
const { verifyToken } = require("../UserRoute/verifyToken");

// Add new Habit to a Specific User
router.post("/addhabit", verifyToken, async (req, res) => {
  const newHabit = new Habit(req.body);
  try {
    const savedHabit = await newHabit.save();
    res.status(200).json(savedHabit);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get all the habits of a specific User
router.get("/allhabits", verifyToken, async (req, res) => {
  const currentUser = req.user.id;
  try {
    const allHabits = await Habit.find({ userId: currentUser });
    res.status(200).json(allHabits);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get a specific habit of the current user
router.get("/findhabit/:id", verifyToken, async (req, res) => {
  const currentUser = req.user.id;
  try {
    const foundHabit = await Habit.findOne({ userId: currentUser });
    res.status(200).json(foundHabit);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Edit a specific habit of the current user
router.put("/edithabit/:id", verifyToken, async (req, res) => {
  const updatedOne = await Habit.findById(req.params.id);
  try {
    const editedHabit = await updatedOne.updateOne({
      $set: {
        title: req.body.title,
        description: req.body.description,
        from: req.body.from,
        to: req.body.to,
        repitition: req.body.repitition,
        reminder: req.body.reminder,
        image: req.body.image,
      },
    });
    res.status(201).json({ message: "Updated Successfully", editedHabit });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Delete a specific habit of the current user
router.delete("/deletehabit/:id", verifyToken, async (req, res) => {
  try {
    const deletedHabit = await Habit.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
