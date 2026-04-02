export default function TaskCard({ task }) {
  const formatDate = (date) => new Date(date).toLocaleDateString();
  return (
    <div
      className={`text-black bg-white p-4 rounded shadow-md mb-4 border-l-4 ${task.priority === "high" ? " border-red-500" : task.priority === "medium" ? " border-yellow-500" : " border-green-500"}`}
    >
      <h4>{task.title}</h4>
      <p>Category: {task.category}</p>
      {task.createdAt && <p>Created At: {formatDate(task.createdAt)}</p>}
    </div>
  );
}
