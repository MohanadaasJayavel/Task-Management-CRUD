const Task = require("../models/task.models");

// Create Task
const createTask = async (req, res) => {
  try {
    const { title, description, column } = req.body;
    let userId = req.user._id;
    const task = new Task({ title, description, column, userId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Get Tasks
const getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id });
  res.json(tasks);
};

// Update Task
const updateTask = async (req, res) => {
  console.log("request params --->", req.params);

  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  Object.assign(task, req.body);
  await task.save();
  res.json(task);
};

// Delete Task
const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  await task.remove();
  res.json({ message: "Task removed" });
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
