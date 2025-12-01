const API_BASE = "/api/tasks";

const taskForm = document.getElementById("taskForm");
const tasksContainer = document.getElementById("tasksContainer");
const statusFilter = document.getElementById("statusFilter");
const formMessage = document.getElementById("formMessage");

async function fetchTasks() {
  try {
    const res = await fetch(API_BASE);
    const tasks = await res.json();
    renderTasks(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
  }
}

function renderTasks(tasks) {
  tasksContainer.innerHTML = "";

  const filter = statusFilter.value;
  const filtered = tasks.filter(task =>
    filter === "all" ? true : task.status === filter
  );

  if (filtered.length === 0) {
    tasksContainer.innerHTML = "<li class='empty'>No tasks yet.</li>";
    return;
  }

  filtered.forEach(task => {
    const li = document.createElement("li");
    li.className = `task task--${task.status} task--priority-${task.priority}`;

    const topRow = document.createElement("div");
    topRow.className = "task-top";

    const title = document.createElement("h3");
    title.textContent = task.title;

    const meta = document.createElement("p");
    meta.className = "task-meta";
    meta.textContent = `Priority: ${task.priority.toUpperCase()}${
      task.due_date ? " • Due: " + task.due_date : ""
    }`;

    topRow.appendChild(title);
    topRow.appendChild(meta);

    const desc = document.createElement("p");
    desc.className = "task-desc";
    desc.textContent = task.description || "(No description)";

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const statusSelect = document.createElement("select");
    ["todo", "in-progress", "done"].forEach(s => {
      const opt = document.createElement("option");
      opt.value = s;
      opt.textContent =
        s === "todo"
          ? "To Do"
          : s === "in-progress"
          ? "In Progress"
          : "Done";
      if (task.status === s) opt.selected = true;
      statusSelect.appendChild(opt);
    });
    statusSelect.addEventListener("change", () =>
      updateTaskStatus(task.id, statusSelect.value)
    );

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "btn-delete";
    deleteBtn.addEventListener("click", () => {
      if (confirm("Delete this task?")) {
        deleteTask(task.id);
      }
    });

    actions.appendChild(statusSelect);
    actions.appendChild(deleteBtn);

    li.appendChild(topRow);
    li.appendChild(desc);
    li.appendChild(actions);

    tasksContainer.appendChild(li);
  });
}

taskForm.addEventListener("submit", async e => {
  e.preventDefault();
  formMessage.textContent = "";

  const newTask = {
    title: document.getElementById("title").value.trim(),
    description: document.getElementById("description").value.trim(),
    priority: document.getElementById("priority").value,
    due_date: document.getElementById("due_date").value || null
  };

  if (!newTask.title) {
    formMessage.textContent = "Title is required.";
    formMessage.classList.add("error");
    return;
  }

  try {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask)
    });

    if (!res.ok) {
      throw new Error("Failed to create task");
    }

    taskForm.reset();
    formMessage.textContent = "Task added!";
    formMessage.classList.remove("error");
    formMessage.classList.add("success");

    fetchTasks();
  } catch (err) {
    console.error(err);
    formMessage.textContent = "Error creating task.";
    formMessage.classList.add("error");
  }
});

async function updateTaskStatus(id, status) {
  try {
    const res = await fetch(`${API_BASE}/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });

    if (!res.ok) {
      throw new Error("Failed to update task status");
    }

    fetchTasks();
  } catch (err) {
    console.error(err);
    alert("Error updating status");
  }
}

async function deleteTask(id) {
  try {
    const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    if (res.status !== 204) {
      throw new Error("Failed to delete task");
    }
    fetchTasks();
  } catch (err) {
    console.error(err);
    alert("Error deleting task");
  }
}

statusFilter.addEventListener("change", fetchTasks);

// Initial load
fetchTasks();
