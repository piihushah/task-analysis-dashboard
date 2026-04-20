import { useState, useEffect, useMemo, useCallback } from "react";
import TaskList from "./TaskList";
import Dashboard from "./Dashboard";
import TaskSearch from "./TaskSearch";
import TaskForm from "./TaskForm";

const STATUSES = [
  { id: "pending", label: "Pending" },
  { id: "in_progress", label: "In Progress" },
  { id: "completed", label: "Completed" },
];

export default function TaskAPI() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
      setLoading(false);
      return;
    }
    async function fetchTasks() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=60");

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();
        const currentDate = new Date().toISOString();

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

          let calculatedCategory = "Manual Task";
          const categoryId = item.id % 12;

          if (categoryId >= 0 && categoryId <= 4) {
            calculatedCategory = "API Task";
          } else if (categoryId >= 5 && categoryId <= 7) {
            calculatedCategory = "Manual Task";
          } else if (categoryId >= 8 && categoryId <= 10) {
            calculatedCategory = "Review Task";
          } else {
            calculatedCategory = "Bug Fix";
          }

          return {
            id: item.id.toString(),
            title: item.title,
            status: calculatedStatus,
            category: calculatedCategory,
            priority: calculatedPriority,
            createdAt: currentDate,
            completedAt: item.completed ? currentDate : null,
          };
        });

        setTasks(transformedTasks);
      } catch (err) {
        setError(err.message || "Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  const handleSearch = useCallback((value) => {
    setSearchQuery(value);
  }, []);

  const handleOpenForm = useCallback(() => {
    setShowForm(true);
  }, []);

  const handleAddTask = useCallback((newTask) => {
    const createdDate = new Date().toISOString();

    const taskToAdd = {
      id: Date.now().toString(),
      title: newTask.title,
      category: newTask.category,
      priority: newTask.priority,
      status: newTask.status,
      createdAt: createdDate,
      completedAt: newTask.status === "completed" ? createdDate : null,
    };

    setTasks((prevTasks) => {
      const updatedTasks = [taskToAdd, ...prevTasks];

      // save to localStorage
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return updatedTasks;
    });

    setShowForm(false);
  }, []);

  const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return tasks;

    return tasks.filter((task) => {
      return (
        task.title.toLowerCase().includes(query) ||
        task.category.toLowerCase().includes(query) ||
        task.status.toLowerCase().includes(query) ||
        task.priority.toLowerCase().includes(query)
      );
    });
  }, [tasks, searchQuery]);

  const groupedTasks = useMemo(() => {
    return filteredTasks.reduce(
      (acc, task) => {
        acc[task.status].push(task);
        return acc;
      },
      {
        pending: [],
        in_progress: [],
        completed: [],
      },
    );
  }, [filteredTasks]);

  const summary = useMemo(() => {
    return filteredTasks.reduce(
      (acc, task) => {
        acc.total += 1;
        acc[task.status] += 1;
        acc[task.priority] += 1;
        acc.categories[task.category] = (acc.categories[task.category] || 0) + 1;
        return acc;
      },
      {
        total: 0,
        pending: 0,
        in_progress: 0,
        completed: 0,
        low: 0,
        medium: 0,
        high: 0,
        categories: {},
      },
    );
  }, [filteredTasks]);

  if (loading) {
    return <div className="text-white p-10 text-center">Loading Dashboard...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-10 text-center">{error}</div>;
  }

  return (
    <>
      <Dashboard {...summary} />
      <TaskSearch value={searchQuery} onChange={handleSearch} onOpenForm={handleOpenForm} />
      {showForm && <TaskForm onSubmit={handleAddTask} onCancel={() => setShowForm(false)} />}
      <TaskList groupedTasks={groupedTasks} statuses={STATUSES} />
    </>
  );
}
