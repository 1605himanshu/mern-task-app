import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title)
      return res.status(400).json({ message: "Title is required" });

    const task = await Task.create({
      userId: req.user.id,
      title,
      description
    });

    return res.status(201).json(task);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const q = req.query.q;
    const filter = { userId: req.user.id };

    if (q) filter.title = { $regex: q, $options: "i" };

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    return res.json(tasks);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task)
      return res.status(404).json({ message: "Task not found" });

    if (task.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    Object.assign(task, req.body);
    await task.save();

    return res.json(task);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task)
      return res.status(404).json({ message: "Task not found" });

    if (task.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await task.deleteOne();

    return res.json({ message: "Task deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
