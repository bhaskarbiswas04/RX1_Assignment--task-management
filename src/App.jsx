import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { store, addTask, removeTask, markAsCompleted } from './taskStore';
import './App.css';

function App() {
  const dispatch = useDispatch();

  // Extract application state parameters using selectors
  const tasks = useSelector((state) => state.tasks);
  const totalTasksCount = useSelector((state) => state.totalTasksCount);
  const pendingTasksCount = useSelector((state) => state.pendingTasksCount);

  // Local Form input controller hooks
  const [newId, setNewId] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [removeIdInput, setRemoveIdInput] = useState('');
  const [completeIdInput, setCompleteIdInput] = useState('');

  // Runs timeline sequence logging on mount
  useEffect(() => {
    console.log('--- Starting Exercise 6 Action Sequence ---');
    const unsubscribe = store.subscribe(() => {
      console.log('Store Change Detected:', store.getState());
    });

    store.dispatch(addTask({ id: 4, title: 'Task D' }));
    store.dispatch(markAsCompleted(1));
    // store.dispatch(removeTask(2));

    unsubscribe();
    console.log('--- End of Test Sequence ---');
  }, []);

  // Form Submission Interceptors
  const handleAddTaskSubmit = (e) => {
    e.preventDefault();
    if (!newId || !newTitle) return;
    dispatch(addTask({ id: Number(newId), title: newTitle }));
    setNewId('');
    setNewTitle('');
  };

  const handleRemoveTaskSubmit = (e) => {
    e.preventDefault();
    if (!removeIdInput) return;
    dispatch(removeTask(removeIdInput));
    setRemoveIdInput('');
  };

  const handleMarkCompletedSubmit = (e) => {
    e.preventDefault();
    if (!completeIdInput) return;
    dispatch(markAsCompleted(completeIdInput));
    setCompleteIdInput('');
  };

  return (
    <div className="task-container">
      {/* 1. Add Task Form Block */}
      <div className="form-section">
        <h2>Add Task</h2>
        <form onSubmit={handleAddTaskSubmit} className="horizontal-form">
          <input 
            type="number" 
            placeholder="ID" 
            value={newId} 
            onChange={e => setNewId(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Title" 
            value={newTitle} 
            onChange={e => setNewTitle(e.target.value)} 
          />
          <button type="submit">Add Task</button>
        </form>
      </div>

      {/* 2. Remove Task Control Action Block */}
      <div className="form-section">
        <h2>Remove Task</h2>
        <form onSubmit={handleRemoveTaskSubmit} className="horizontal-form">
          <input 
            type="number" 
            placeholder="Task ID" 
            value={removeIdInput} 
            onChange={e => setRemoveIdInput(e.target.value)} 
          />
          <button type="submit">Remove Task</button>
        </form>
      </div>

      {/* 3. Mark Task State Completed */}
      <div className="form-section">
        <h2>Mark As Completed</h2>
        <form onSubmit={handleMarkCompletedSubmit} className="horizontal-form">
          <input 
            type="number" 
            placeholder="Task ID" 
            value={completeIdInput} 
            onChange={e => setCompleteIdInput(e.target.value)} 
          />
          <button type="submit">Mark As Completed</button>
        </form>
      </div>

      {/* 4. Task list presentation layout display */}
      <div className="list-section">
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id}>
              {task.id}. {task.title} ({task.status})
            </li>
          ))}
        </ul>
      </div>

      {/* 5. Counter Analytics Footer info block elements */}
      <div className="analytics-display">
        <p>Total Tasks Count: {totalTasksCount}</p>
        <p>Pending Tasks Count: {pendingTasksCount}</p>
      </div>
    </div>
  );
}

export default App;