export default function TaskCard({ task }) {
  const formatDate = (date) => new Date(date).toLocaleDateString();
  return (
    <div className="flex flex-col gap-2 border-b-2 border-gray-200 py-4">
      <h4>{task.title}</h4>
      <p>Status: {task.status}</p>
      <p>Category: {task.category}</p>
      <p>Priority: {task.priority}</p>
      {task.createdAt && <p>Created At: {formatDate(task.createdAt)}</p>}
      {task.completedAt && <p>Completed At: {formatDate(task.completedAt)}</p>}
    </div>
  );
}
