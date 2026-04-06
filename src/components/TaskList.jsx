import TaskCard from "./TaskCard";

export default function TaskList({ groupedTasks, statuses }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-2 border-gray-300 rounded-lg">
      {statuses.map((status) => (
        <div
          key={status.id}
          className="p-4 border-b-2 md:border-r-2 border-gray-300 last:border-r-0 max-h-175 overflow-y-auto"
        >
          <h3 className="text-xl font-bold mb-4">{status.label}</h3>
          {groupedTasks[status.id].length > 0 ? (
            groupedTasks[status.id].map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <p className="text-sm text-inherit">No tasks</p>
          )}
        </div>
      ))}
    </div>
  );
}
