const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  getTask,
  deleteTask,
  updateTask,
  postTask,
} = require("../controllers/tasks.controller");

router.route("/").get(getAllTasks).post(postTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
