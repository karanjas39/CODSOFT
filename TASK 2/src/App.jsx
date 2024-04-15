import { useEffect, useState } from "react";
import NamePopUp from "./components/NamePopUp/NamePopUp";
import Header from "./components/Header/Header";
import Task from "./components/Task/Task";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isPopUp, setIsPopUp] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const isName = localStorage.getItem("task-tarcker-name");
    if (!isName) {
      setIsPopUp(true);
      return;
    }
    const taskTrackerName = isName.split(" ")[0];
    const firstLetterUppercase =
      taskTrackerName.charAt(0).toUpperCase() + taskTrackerName.slice(1);
    setName(firstLetterUppercase);
  }, [name]);

  function handleAddTask(e) {
    e.preventDefault();
    if (!newTask) return;
    setTasks((tasks) => [...tasks, { task: newTask, id: Date.now() }]);
    setNewTask("");
  }

  return (
    <div>
      <Header setIsPopUp={setIsPopUp} />
      <p className="salute">Hey {name}, get back on track.</p>
      <div className="task-container">
        {tasks.length == 0
          ? "You have not added any task yet."
          : tasks.map((obj) => (
              <Task
                task={obj.task}
                id={obj.id}
                key={obj.id}
                setTasks={setTasks}
              />
            ))}
      </div>
      <form className="add-task" onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Add new task..."
          onChange={(e) => setNewTask(e.target.value)}
          value={newTask}
        />
        <button>Add task</button>
      </form>
      {isPopUp && <NamePopUp setIsPopUp={setIsPopUp} setName={setName} />}
    </div>
  );
}

export default App;
