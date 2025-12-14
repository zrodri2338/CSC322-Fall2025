const express = require("express");
const router = express.Router();
const pool = require("../db");


router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM tasks ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("GET /tasks error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


router.post("/", async (req, res) => {
  try {
    const { title, description, status, priority, due_date } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    const [result] = await pool.query(
      `INSERT INTO tasks (title, description, status, priority, due_date)
       VALUES (?, ?, ?, ?, ?)`,
      [
        title.trim(),
        description || "",
        status || "todo",
        priority || "medium",
        due_date || null
      ]
    );

    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [
      result.insertId
    ]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("POST /tasks error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const taskId = parseInt(req.params.id, 10);
    if (Number.isNaN(taskId)) {
      return res.status(400).json({ error: "Invalid task id" });
    }

    const { title, description, status, priority, due_date } = req.body;

    const [result] = await pool.query(
      `UPDATE tasks
       SET title = ?, description = ?, status = ?, priority = ?, due_date = ?
       WHERE id = ?`,
      [
        title,
        description,
        status,
        priority,
        due_date || null,
        taskId
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [
      taskId
    ]);
    res.json(rows[0]);
  } catch (err) {
    console.error("PUT /tasks/:id error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


router.patch("/:id/status", async (req, res) => {
  try {
    const taskId = parseInt(req.params.id, 10);
    if (Number.isNaN(taskId)) {
      return res.status(400).json({ error: "Invalid task id" });
    }

    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const [result] = await pool.query(
      "UPDATE tasks SET status = ? WHERE id = ?",
      [status, taskId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [
      taskId
    ]);
    res.json(rows[0]);
  } catch (err) {
    console.error("PATCH /tasks/:id/status error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const taskId = parseInt(req.params.id, 10);
    if (Number.isNaN(taskId)) {
      return res.status(400).json({ error: "Invalid task id" });
    }

    const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [
      taskId
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(204).send();
  } catch (err) {
    console.error("DELETE /tasks/:id error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
