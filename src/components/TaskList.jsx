import { useState, useEffect, useMemo } from "react";
import TaskCard from "./TaskCard";

const STATUSES = [
  { id: "pending", label: "Pending" },
  { id: "in_progress", label: "In Progress" },
  { id: "completed", label: "Completed" },
];

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=60")
      .then((response) => response.json())
      .then((data) => {
        const transformedTasks = data.map((item) => {
          let calculatedStatus = item.completed ? "completed" : "pending";

          if (!item.completed && item.id % 3 === 0) {
            calculatedStatus = "in_progress";
          }

          let calculatedPriority = "low";

          if (item.id % 10 === 0) {
            calculatedPriority = "high";
          } else if (item.id % 2 === 0) {
            calculatedPriority = "medium";
          }

          return {
            id: item.id.toString(),
            title: item.title,
            status: calculatedStatus,
            category: "API Task",
            priority: calculatedPriority,
            createdAt: new Date().toISOString(),
            completedAt: item.completed ? new Date().toISOString() : null,
          };
        });

        setTasks(transformedTasks);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch tasks");
        setLoading(false);
      });
  }, []);

  const groupedTasks = useMemo(() => {
    return {
      pending: tasks.filter((task) => task.status === "pending"),
      in_progress: tasks.filter((task) => task.status === "in_progress"),
      completed: tasks.filter((task) => task.status === "completed"),
    };
  }, [tasks]);

  if (loading) {
    return <div className="text-white p-10 text-center">Loading Dashboard...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-10 text-center">{error}</div>;
  }

  return (
    <div className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-2 border-gray-300 rounded-lg">
        {STATUSES.map((status) => (
          <div key={status.id} className="p-4 border-b-2 md:border-r-2 border-gray-300 last:border-r-0">
            <h3 className="text-xl font-bold mb-4">{status.label}</h3>

            {groupedTasks[status.id].length > 0 ? (
              groupedTasks[status.id].map((task) => <TaskCard key={task.id} task={task} />)
            ) : (
              <p className="text-sm text-gray-500">No tasks</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
