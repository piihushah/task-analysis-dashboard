import taskData from "../data/tasks";
import TaskCard from "./TaskCard";

export default function TaskList() {
  return (
    <div>
      {taskData.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
