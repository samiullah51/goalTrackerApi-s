const Goal = require("../../models/Goal");
const router = require("express").Router();
const { verifyToken } = require("../UserRoute/verifyToken");
// Add a new Goal
router.post("/addgoal", async (req, res) => {
  try {
    const newGoal = new Goal({
      category: req.body.category,
      title: req.body.title,
      description: req.body.description,
      target: req.body.target,
      from: req.body.from,
      to: req.body.to,
      reminder: req.body.reminder,
      mileStones: [
        {
          mileStoneTitle: req.body.mileStoneTitle,
          mileStoneValue: req.body.mileStoneValue,
        },
      ],
    });
    // Now save this new goal to database
    const savedGoal = await newGoal.save();
    res.status(200).json(savedGoal);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get all Goals
router.get("/allgoals", verifyToken, async (req, res) => {
  try {
    const allGoals = await Goal.find();
    res.status(200).json(allGoals);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Edit a goal
router.put("/editgoal/:goalId", verifyToken, async (req, res) => {
  const goalId = req.params.goalId;
  try {
    const editedGoal = await Goal.findByIdAndUpdate(goalId, {
      $set: {
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        target: req.body.target,
        from: req.body.from,
        to: req.body.to,
        reminder: req.body.reminder,
        mileStones: [
          {
            mileStoneTitle: req.body.mileStoneTitle,
            mileStoneValue: req.body.mileStoneValue,
          },
        ],
      },
    });
    res.status(200).json(editedGoal);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
module.exports = router;
