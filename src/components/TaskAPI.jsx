import { useState, useEffect, useMemo } from "react";
import TaskList from "./TaskList";
import Dashboard from "./Dashboard";

const STATUSES = [
  { id: "pending", label: "Pending" },
  { id: "in_progress", label: "In Progress" },
  { id: "completed", label: "Completed" },
];

const CATEGORIES = ["API Task", "Manual Task", "Review Task", "Bug Fix"];

export default function TaskAPI() {
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
            category: CATEGORIES[item.id % CATEGORIES.length],
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

  const summary = useMemo(() => {
    const lowPriority = tasks.filter((task) => task.priority === "low").length;
    const mediumPriority = tasks.filter((task) => task.priority === "medium").length;
    const highPriority = tasks.filter((task) => task.priority === "high").length;
    const categories = tasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {});

    return {
      total: tasks.length,
      pending: groupedTasks.pending.length,
      in_progress: groupedTasks.in_progress.length,
      completed: groupedTasks.completed.length,
      low: lowPriority,
      medium: mediumPriority,
      high: highPriority,
      categories: categories,
    };
  }, [groupedTasks, tasks]);

  if (loading) {
    return <div className="text-white p-10 text-center">Loading Dashboard...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-10 text-center">{error}</div>;
  }

  return (
    <>
      <Dashboard {...summary} />
      <TaskList groupedTasks={groupedTasks} statuses={STATUSES} />
    </>
  );
}
