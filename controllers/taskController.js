const Task = require("../models/Task");

// CREATE a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, category } = req.body;

    const newTask = await Task.create({
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : null,
      priority: priority || "Low",
      category: category || "General",
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
};

// GET all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

// UPDATE a task (mark complete or edit)
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        ...req.body,
        dueDate: req.body.dueDate ? new Date(req.body.dueDate) : null,
      },
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
};

// DELETE a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await Task.findByIdAndDelete(id);

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
};
