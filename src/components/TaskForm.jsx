import React, { useState } from "react";

function TaskForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("API Task");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("pending");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, category, priority, status });
    setTitle("");
    setCategory("API Task");
    setPriority("medium");
    setStatus("pending");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg my-8">
      <div className="mb-4">
        <label className="block text-white font-semibold mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded bg-white text-gray-800 border border-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Task title"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-white font-semibold mb-2">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 rounded bg-white text-gray-800 border border-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-white font-semibold mb-2">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 rounded bg-white text-gray-800 border border-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="API Task">API Task</option>
          <option value="Manual Task">Manual Task</option>
          <option value="Review Task">Review Task</option>
          <option value="Bug Fix">Bug Fix</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-white font-semibold mb-2">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 rounded bg-white text-gray-800 border border-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Task
        </button>

        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
