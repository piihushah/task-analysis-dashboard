function TaskModal({ task, onClose }) {
  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center text-gray-700 capitalize">
      <div className="bg-white p-6 rounded-lg w-100 relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-2 right-2 text-black">
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 ">{task.title}</h2>

        <p>
          <strong>Status:</strong> {task.status}
        </p>
        <p>
          <strong>Priority:</strong> {task.priority}
        </p>
      </div>
    </div>
  );
}

export default TaskModal;
