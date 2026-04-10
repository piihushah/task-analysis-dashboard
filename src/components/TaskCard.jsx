import React from "react";

const formatDate = (date) => new Date(date).toLocaleDateString();

function TaskCard({ task }) {
  return (
    <div
      className={`text-black bg-white p-4 rounded shadow-md mb-4 border-l-8 ${
        task.priority === "high"
          ? "border-red-500"
          : task.priority === "medium"
            ? "border-yellow-500"
            : "border-green-500"
      }`}
    >
      <h4 className="capitalize font-semibold mb-2">{task.title}</h4>
      <p className="capitalize text-sm mb-1">Category: {task.category}</p>
      <p className="capitalize text-sm mb-1">Priority: {task.priority}</p>
      {task.createdAt && <p className="text-sm mb-1">Created At: {formatDate(task.createdAt)}</p>}
      {task.status === "completed" && task.completedAt && (
        <p className="text-sm">Completed At: {formatDate(task.completedAt)}</p>
      )}
    </div>
  );
}

export default React.memo(TaskCard);
