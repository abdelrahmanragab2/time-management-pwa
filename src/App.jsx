import { useState, useEffect } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Header } from "./components/Header";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { Timer } from "./components/Timer";

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const checkTasks = setInterval(() => {
      const now = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      tasks.forEach((task) => {
        if (task.time === now && !task.completed) {
          alert(`Time's up for ${task.task}!`);
          task.completed = true;
        }
      });
    }, 60000);

    return () => clearInterval(checkTasks);
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Timer />
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
}

export default App;
