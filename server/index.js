const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth");
const studentRoute = require("./routes/student.route");
const deanRouter = require("./routes/deans.route");
const PORT = process.env.APP_PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/student", studentRoute);
app.use("/dean", deanRouter);

app.get("/", (req, res, next) => {
  res.status(200).send("Welcome buddy , Its our home page"); //Delete after creeating specific routes
});
app.listen(PORT, () => {
  console.log(`Hi i am listening at port ${PORT}`);
});
