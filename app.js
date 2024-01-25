const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

// Task model with mongoose
const Task = mongoose.model("Task", {
  title: String,
  description: String,
  completed: Boolean,
  dueDate: Date,
  category: String,
});

// Middleware for  JSON requests
app.use(bodyParser.json());

// GET All Tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//GET tasks by category
app.get("/tasks/category/:category", async (req, res) => {
  const category = req.params.category;

  try {
    const tasksByCategory = await Task.find({ category });
    res.json(tasksByCategory);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST a new task
app.post("/tasks", async (req, res) => {
  const { title, description, dueDate, category } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title cannot be empty" });
  }

  try {
    const task = new Task({
      title,
      description,
      completed: false,
      dueDate,
      category,
    });
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT an existing task
app.put("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;
  const { title, description, completed, dueDate, category } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { title, description, completed, dueDate, category },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT an existing task (tO Mark it complete)
app.put("/tasks/:id/complete", async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Check if the task is already completed
    if (task.completed) {
      return res.status(400).json({ error: "Task is already completed" });
    }

    // Mark the task as completed
    task.completed = true;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE endpoint to delete any task
app.delete("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
