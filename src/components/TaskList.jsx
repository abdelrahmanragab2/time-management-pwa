export function TaskList({ tasks, deleteTask }) {
  return (
    <ul className="p-4">
      {tasks.map((task, index) => (
        <li
          key={index}
          className="flex justify-between items-center border-b py-2"
        >
          <span>
            {task.task} - {task.time}
          </span>
          <button onClick={() => deleteTask(index)} className="text-red-600">
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
