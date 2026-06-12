import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { store, addTask, removeTask, markAsCompleted } from "./taskStore";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks);
  const totalTasksCount = useSelector((state) => state.totalTasksCount);
  const pendingTasksCount = useSelector((state) => state.pendingTasksCount);

  const [newId, setNewId] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [removeIdInput, setRemoveIdInput] = useState("");

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      console.log("Store Change Detected:", store.getState());
    });

    store.dispatch(addTask({ id: 4, title: "Task D" }));
    store.dispatch(markAsCompleted(1));
    // store.dispatch(removeTask(2));

    unsubscribe();
    console.log("--- End of Test Sequence ---");
  }, []);

  const handleAddTaskSubmit = (e) => {
    e.preventDefault();
    if (!newId || !newTitle) return;
    dispatch(addTask({ id: Number(newId), title: newTitle }));
    setNewId("");
    setNewTitle("");
  };

  const handleRemoveTaskSubmit = (e) => {
    e.preventDefault();
    if (!removeIdInput) return;
    dispatch(removeTask(removeIdInput));
    setRemoveIdInput("");
  };

  return (
    /* ADDED: Main layout container to handle page centering */
    <div className="page-center-wrapper">
      <div className="task-content">
        <h3>Add Task</h3>
        <form onSubmit={handleAddTaskSubmit}>
          <input
            type="number"
            placeholder="ID"
            value={newId}
            onChange={(e) => setNewId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button type="submit">Add Task</button>
        </form>

        <h3>Remove Task</h3>
        <form onSubmit={handleRemoveTaskSubmit}>
          <input
            type="number"
            placeholder="Task ID"
            value={removeIdInput}
            onChange={(e) => setRemoveIdInput(e.target.value)}
          />
          <button type="submit">Remove Task</button>
        </form>

        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.status === "Completed"}
                onChange={() => dispatch(markAsCompleted(task.id))}
              />
              {task.id}. {task.title} ({task.status})
            </li>
          ))}
        </ul>

        <div className="analytics-display">
          Total Tasks Count: {totalTasksCount}
          <br />
          Pending Tasks Count: {pendingTasksCount}
        </div>
      </div>
    </div>
  );
}

export default App;
