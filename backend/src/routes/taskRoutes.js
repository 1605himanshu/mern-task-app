import express from "express";
import { auth } from "../middleware/auth.js";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from "../controllers/taskController.js";

const router = express.Router();

// CREATE task
router.post("/", auth, createTask);

// READ all tasks (with optional search)
router.get("/", auth, getTasks);

// UPDATE task
router.put("/:id", auth, updateTask);

// DELETE task
router.delete("/:id", auth, deleteTask);

export default router;
