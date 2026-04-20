function TaskModal({ task, onClose, onDelete }) {
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
        <button
          onClick={() => {
            onDelete(task.id);
            onClose();
          }}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 mt-4"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskModal;
