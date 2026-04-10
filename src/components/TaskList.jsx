import React from "react";
import TaskCard from "./TaskCard";

function TaskList({ groupedTasks, statuses }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-2 border-gray-300 rounded-lg">
      {statuses.map((status) => {
        const tasksForStatus = groupedTasks[status.id];

        return (
          <div
            key={status.id}
            className="p-4 border-b-2 md:border-r-2 border-gray-300 last:border-r-0 max-h-175 overflow-y-auto"
          >
            <h3 className="text-xl font-bold mb-4">{status.label}</h3>

            {tasksForStatus.length > 0 ? (
              tasksForStatus.map((task) => <TaskCard key={task.id} task={task} />)
            ) : (
              <p className="text-sm text-inherit">No tasks</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default React.memo(TaskList);
