import React from "react";

const TaskSearch = React.memo(({ value, onChange }) => {
  console.log("Search Component Rendered");
  return (
    <div className="flex flex-col items-start gap-2 md:max-w-2xl mb-4 md:mb-8">
      <p className="text-white font-semibold">Search For your tasks:</p>
      <input
        type="text"
        placeholder="Search tasks..."
        className="w-full p-2 rounded bg-white text-gray-800 border border-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
});

export default TaskSearch;
