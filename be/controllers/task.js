const Task = require("../models/task");

// Create a Task
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const newTask = new Task({ title, description, dueDate, status:"pending" });
    await newTask.save();
    res.status(201).json({ message: "Task created", task: newTask });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Tasks with Pagination
const getTasks = async (req, res) => {
  try {
    const { search = "", status = "", page = 1, limit = 10 } = req.query;

    const query = {};
    
    if (search) {
      query.title = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    if (status) {
      query.status = status; // Filter by status (status/pending)
    }

    const tasks = await Task.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 }); // Sort by newe
const totalTasks = await Task.countDocuments(query);

    res.json({
      tasks,
      totalPages: Math.ceil(totalTasks / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};


// Get Task by ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from params
    const task = await Task.findById(id);
    
    if (!task) return res.status(404).json({ error: "Task not found" });

    res.status(200).json({ message: "Task found", task });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Update Task
const updateTask = async (req, res) => {
  try {
    const { title, description, dueDate, status
    } = req.body;
    const { id } = req.params; // Extracting ID from params

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, dueDate, status },
      { new: true } // Return the updated document
    );

    if (!updatedTask) return res.status(404).json({ error: "Task not found" });

    res.status(200).json({ message: "Task updated", task: updatedTask });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Delete Task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params; // Get id from params
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) return res.status(404).json({ error: "Task not found" });

    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
