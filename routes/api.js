const router = require("express").Router();
const Workout = require("../models/workout.js");
const path = require("path");

// static (html) routes
router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

// dynamic (js) routes

// this gets all workout data for the stats page
router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => res.status(400).json(err));
});

// this gets all workouts sorted by data (asc) to display the latest workout
router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .sort({ date: -1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts", (req, res) => {
  console.log(req.body);
  Workout.create({ exercises: req.body })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// this endpoint adds an exercise to a workout based on that workout's id
router.put("/api/workouts/:id", (req, res) => {
  const { id } = req.params;

  Workout.updateOne({ _id: id }, { $push: { exercises: req.body } })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;
