const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth");
const studentRoute = require("./routes/student.route");
const deanRouter = require("./routes/deans.route");
const PORT = process.env.APP_PORT;
const cron = require("node-cron");
const { bookingCompleteScheduler } = require("./helpers/scheduledTasks");
const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/student", studentRoute);
app.use("/dean", deanRouter);

//function to update booking completed after scheduled time
// cron.schedule("0 * * * *", async () => {
//   try {
//     await bookingCompleteScheduler();
//   } catch (error) {
//     console.error("Error in scheduled task:", error);
//   }
// });

app.get("/", (req, res, next) => {
  res.status(200).send("Welcome buddy , Its our API landing page"); //Delete after creeating specific routes
});

app.listen(PORT, () => {
  console.log(`Hi i am listening at port ${PORT}`);
});
