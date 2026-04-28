import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";

function DraggableTask({ task, onClick }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className="w-full text-left"
    >
      <TaskCard task={task} />
    </button>
  );
}

function DroppableColumn({ status, children }) {
  const { setNodeRef } = useDroppable({
    id: status.id,
  });

  return (
    <div
      ref={setNodeRef}
      className="p-4 border-b-2 md:border-r-2 border-gray-300 last:border-r-0 max-h-175 overflow-y-auto"
    >
      <h3 className="text-xl font-bold mb-4">{status.label}</h3>
      {children}
    </div>
  );
}

function TaskList({ groupedTasks, statuses, onDeleteTask, onUpdateTaskStatus }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectedTask = (task) => {
    console.log("Selected Task:", task);
    setSelectedTask(task);
    setIsModalOpen(true);
  };
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    onUpdateTaskStatus(taskId, newStatus);
  };

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-2 border-gray-300 rounded-lg">
          {statuses.map((status) => {
            const tasksForStatus = groupedTasks[status.id];

            return (
              <DroppableColumn
                key={status.id}
                status={status}
                className="p-4 border-b-2 md:border-r-2 border-gray-300 last:border-r-0 max-h-175 overflow-y-auto"
              >
                {tasksForStatus.length > 0 ? (
                  tasksForStatus.map((task) => (
                    <DraggableTask key={task.id} task={task} onClick={() => handleSelectedTask(task)} />
                  ))
                ) : (
                  <p className="text-sm text-inherit">No tasks</p>
                )}
              </DroppableColumn>
            );
          })}
        </div>

        {isModalOpen && <TaskModal task={selectedTask} onClose={() => setIsModalOpen(false)} onDelete={onDeleteTask} />}
      </DndContext>
    </>
  );
}

export default React.memo(TaskList);
