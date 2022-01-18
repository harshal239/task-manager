const express = require("express");
const taskRouter = express.Router();

const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

taskRouter.route("/").get(getAllTasks).post(createTask);
taskRouter.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

module.exports = taskRouter;
