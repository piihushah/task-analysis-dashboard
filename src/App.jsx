import TaskAPI from "./components/TaskAPI";

function App() {
  return (
    <div className="container mx-auto md:max-w-7xl px-8 py-12 md:py-24">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">Task Analytics Dashboard</h1>
      <h2 className="text-2xl font-bold mb-4">Welcome to tasks kanban board</h2>
      <TaskAPI />
    </div>
  );
}

export default App;
