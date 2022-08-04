const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectToDatabase = require("./connection");

// Import all routers
const authRouter = require("./routes/UserRoute/user");
const goalRouter = require("./routes/GoalRoute/goal");
const habitRouter = require("./routes/Habit/habit");
const healthTrackRouter = require("./routes/HealthTracking/medicineTrack");
const appointmentTrackRouter = require("./routes/HealthTracking/appointmentTrack");
// dotEnv Configuration
dotenv.config();

// JSON Configuration
app.use(express.json());

// Cors Configuration
app.use(cors());

// Mongoose Connection
connectToDatabase();

// API's routes
app.use("/api/user", authRouter);
app.use("/api/goal", goalRouter);
app.use("/api/habit", habitRouter);
app.use("/api/health", healthTrackRouter);
app.use("/api/health", appointmentTrackRouter);
// Listening to a server
app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
