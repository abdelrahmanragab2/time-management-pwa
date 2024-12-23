import { useState } from "react";

export function TaskForm({ addTask }) {
  const [task, setTask] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task || !time) return;
    addTask({ task, time, completed: false });
    setTask("");
    setTime("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
      <input
        type="text"
        placeholder="Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="border rounded p-2"
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="border rounded p-2"
      />
      <button type="submit" className="bg-blue-600 text-white py-2 rounded">
        Add Task
      </button>
    </form>
  );
}
