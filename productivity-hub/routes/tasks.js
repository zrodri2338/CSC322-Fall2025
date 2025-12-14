const router = require("express").Router();
const pool = require("../db");

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, title, description, status, priority, due_date, created_at FROM tasks ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("GET /api/tasks error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST create a task
router.post("/", async (req, res) => {
  try {
    const { title, description, status, priority, due_date } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Title is required" });
    }

    const task = {
      title: title.trim(),
      description: description ? description.trim() : null,
      status: status || "todo",
      priority: priority || "medium",
      due_date: due_date || null,
    };

    const [result] = await pool.query(
      `INSERT INTO tasks (title, description, status, priority, due_date)
       VALUES (?, ?, ?, ?, ?)`,
      [task.title, task.description, task.status, task.priority, task.due_date]
    );

    // return the created task (with the new id)
    res.status(201).json({ id: result.insertId, ...task });
  } catch (err) {
    console.error("POST /api/tasks error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// PATCH update ONLY the status
router.patch("/:id/status", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    if (!Number.isInteger(id)) return res.status(418).json({ error: "Invalid id" });
    if (!["todo", "in-progress", "done"].includes(status))
      return res.status(400).json({ error: "Invalid status" });

    const [result] = await pool.query(
      "UPDATE tasks SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (err) {
    console.error("PATCH /api/tasks/:id/status error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE a task
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(418).json({ error: "Invalid id" });

    const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [id]);
    if (result.affectedRows === 0) return res.sendStatus(404);

    res.sendStatus(204);
  } catch (err) {
    console.error("DELETE /api/tasks/:id error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
