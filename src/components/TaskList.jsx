import taskData from "../data/tasks";
import TaskCard from "./TaskCard";

export default function TaskList() {
  return (
    <div className="py-12">
      {/*pending | in_progress | completed: kanban board type column styling*/}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-2 border-gray-300 rounded-lg">
        <div className="p-4 border-r-2 border-gray-300">
          <h3 className="text-xl font-bold">Pending</h3>
          {taskData.map((task) => task.status === "pending" && <TaskCard key={task.id} task={task} />)}
        </div>
        <div className="p-4 border-r-2 border-gray-300">
          <h3 className="text-xl font-bold">In Progress</h3>
          {taskData.map((task) => task.status === "in_progress" && <TaskCard key={task.id} task={task} />)}
        </div>
        <div className="p-4 border-r-2 border-gray-300">
          <h3 className="text-xl font-bold">Completed</h3>
          {taskData.map((task) => task.status === "completed" && <TaskCard key={task.id} task={task} />)}
        </div>
      </div>
    </div>
  );
}
