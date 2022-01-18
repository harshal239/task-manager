const Task = require("../models/taskModel");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(201).json(tasks);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ Message: "Task Not found" });
    }
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({ Message: "Task Not found" });
    }
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ Message: "Task Not found" });
    }
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
