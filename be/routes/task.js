const express = require("express");
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require("../controllers/task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/list", authMiddleware, getTasks);
router.get("/id/:id", authMiddleware, getTaskById);
router.put("/:id", authMiddleware, updateTask);

router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;
