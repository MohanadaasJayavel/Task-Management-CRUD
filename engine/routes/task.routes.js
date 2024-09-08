const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/task.controllers");
const { protect } = require("../middlewares/auth.middlewares");

const router = express.Router();

router.route("/").post(protect, createTask).get(protect, getTasks);
router.route("/:id").put(protect, updateTask).delete(protect, deleteTask);

module.exports = router;
