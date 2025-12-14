const express = require("express");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());

// Serve static files from the correct public folder
app.use(express.static(path.join(__dirname, "public")));

// API routes
const taskRoutes = require("./routes/tasks");
app.use("/api/tasks", taskRoutes);

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
