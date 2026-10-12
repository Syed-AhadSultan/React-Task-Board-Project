import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Complete React Assignment", category: "Assignment", completed: false },
    { id: 2, title: "Prepare for Quiz", category: "Quiz", completed: true },
  ]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Assignment");
  const [filter, setFilter] = useState("All");

  function addTask(e) {
    e.preventDefault();

    if (!title.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: title.trim(),
        category,
        completed: false,
      },
    ]);

    setTitle("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Pending") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  const completed = tasks.filter((task) => task.completed).length;

  return (
    <div className="app">
      <header>
        <h1>🎓 Campus Task Board</h1>
        <p>Manage your assignments, quizzes, and campus tasks.</p>
      </header>

      <div className="stats">
        <div>Total Tasks: <strong>{tasks.length}</strong></div>
        <div>Pending: <strong>{tasks.length - completed}</strong></div>
        <div>Completed: <strong>{completed}</strong></div>
      </div>

      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          placeholder="Enter your task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Assignment</option>
          <option>Quiz</option>
          <option>Exam</option>
          <option>Personal</option>
        </select>

        <button type="submit">Add Task</button>
      </form>

      <div className="task-heading">
        <h2>My Tasks</h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>Completed</option>
        </select>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="empty">No tasks found!</p>
      ) : (
        filteredTasks.map((task) => (
          <div className="task" key={task.id}>
            <div>
              <h3 className={task.completed ? "done" : ""}>
                {task.title}
              </h3>
              <span>{task.category}</span>
              <p>{task.completed ? "Completed" : "Pending"}</p>
            </div>

            <div className="actions">
              <button onClick={() => toggleTask(task.id)}>
                {task.completed ? "Undo" : "Complete"}
              </button>

              <button
                className="delete"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;