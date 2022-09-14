const express = require("express");
const cors = require("cors");
const tasksRouter = require("./routes/tasks.router");
const connectDB = require("./utils/connect");
const errorHandler = require("./middlewares/errorHandler.middleware");
const notFound = require("./middlewares/notFound.middleware");
require("dotenv").config();

//THIRD-PARTY MIDDLEWARE 🕹️
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//TASKS ROUTER 🛤️
app.use("/api/v1/tasks", tasksRouter);

//HANDLE ERRORS 😞
// app.get("*", (req, res, next) => {
//   res.status(404).send({ success: true, message: "Not Found 😥" });
// });
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1337;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log("👉", `Running On http://localhost:${PORT}/`)
    );
  } catch (err) {
    console.error("🟥", err);
  }
};
start();
