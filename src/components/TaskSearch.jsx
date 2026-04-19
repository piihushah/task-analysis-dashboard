import React from "react";

const TaskSearch = React.memo(({ value, onChange, onOpenForm }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-2 mb-4 md:mb-8">
      <div className="flex-1 flex flex-col items-start gap-2">
        <p className="text-white font-semibold">Search For your tasks:</p>
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full p-2 rounded bg-white text-gray-800 border border-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      <div className="flex-1 flex justify-end items-center">
        <button
          onClick={onOpenForm}
          className="mt-2 md:mt-0 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add New Task
        </button>
      </div>
    </div>
  );
});

export default TaskSearch;
