const Task = require("../models/task.models");

const createTask = async (req, res) => {
  try {
    const { title, description, column, status, startDate, endDate, assignee } =
      req.body;
    let userId = req.user._id;
    const task = new Task({
      title,
      description,
      column,
      status,
      startDate,
      endDate,
      assignee,
      userId,
    });
    await task.save();
    res.status(201).json({ task, message: "Task Created Successfully" });
  } catch (error) {
    res.status(400).json(error);
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    if (!tasks) {
      return res.status(404).json({ message: "No Tasks Found" });
    } else {
      res
        .json({ data: tasks, message: "Tasks fetched Successfully" })
        .status(200);
    }
  } catch (error) {
    console.log("error from getTasks", error);
    res.json({ error: error }).status(400);
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    } else {
      Object.assign(task, req.body);
      await task.save();
    }
    res.json({ task, message: "Task Updated Successfully" }).status(200);
  } catch (err) {
    console.log("error from updateTask", err);
    res.json({ error: err }).status(400);
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    } else {
      await task.deleteOne();
    }
    res.json({ message: "Task Deleted Successully" });
  } catch (err) {
    console.log("error from delete Task", err);
    res.json({ error: err }).status(400);
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
