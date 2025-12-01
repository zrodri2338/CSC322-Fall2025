const express = require("express");
const path = require("path");
const cors = require("cors");
const tasksRouter = require("./routes/tasks");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api/tasks", tasksRouter);

// Fallback for SPA-style direct URL hits (optional)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Productivity Hub server running on http://localhost:${PORT}`);
});
