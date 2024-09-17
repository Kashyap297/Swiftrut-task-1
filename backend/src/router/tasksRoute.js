const express = require("express");
const Task = require("../models/tasksModel");
const User = require("../models/usersModel");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Create Task
router.post("/", authMiddleware(), async (req, res) => {
  const { title, description, category } = req.body;
  const task = new Task({ title, description, category, user: req.user._id });

  try {
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: "Error creating task", error });
  }
});

// User: Get their own tasks by category
router.get("/", authMiddleware(["user", "admin"]), async (req, res) => {
  const { category } = req.query;
  try {
    const query = { user: req.user._id };
    if (category) query.category = category;
    const tasks = await Task.find(query);
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: "Error fetching tasks", error });
  }
});

// User: Mark task as completed
router.put(
  "/:id/complete",
  authMiddleware(["user", "admin"]),
  async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ message: "Task not found" });

      if (task.user.toString() !== req.user._id && req.user.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized" });
      }

      task.completed = true;
      await task.save();
      res.json(task);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Error marking task as completed", error });
    }
  }
);
// User/Admin: Delete task
router.delete("/:id", authMiddleware(["user", "admin"]), async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.user.toString() !== req.user._id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await task.remove();
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting task", error });
  }
});

// Admin: Get all tasks by category
router.get("/all", authMiddleware(["admin"]), async (req, res) => {
  const { category } = req.query;
  try {
    const query = {};
    if (category) query.category = category;
    const tasks = await Task.find(query).populate("user", "username");
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: "Error fetching tasks", error });
  }
});

// Admin: View all users and assign roles
router.get("/users", authMiddleware(["admin"]), async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: "Error fetching users", error });
  }
});

router.put("/users/:id/role", authMiddleware(["admin"]), async (req, res) => {
  const { role } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: "Error assigning role", error });
  }
});

module.exports = router;
