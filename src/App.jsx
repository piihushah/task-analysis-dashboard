import TaskList from "./components/TaskList";
function App() {
  return (
    <div className="container mx-auto md:max-w-7xl px-8 py-12 md:py-24">
      <h1>Task Analytics Dashboard</h1>
      <TaskList />
    </div>
  );
}

export default App;
