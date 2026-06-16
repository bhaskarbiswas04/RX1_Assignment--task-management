import { createStore } from "redux";

const ADD_TASK = "tasks/added";
const REMOVE_TASK = "tasks/removed";
const MARK_AS_COMPLETED = "tasks/markCompleted";

export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});

export const removeTask = (taskId) => ({
  type: REMOVE_TASK,
  payload: Number(taskId),
});

export const markAsCompleted = (taskId) => ({
  type: MARK_AS_COMPLETED,
  payload: Number(taskId),
});


const initialState = {
  tasks: [
    { id: 1, title: "Task A", status: "Pending" },
    { id: 2, title: "Task B", status: "Pending" },
    { id: 3, title: "Task C", status: "Completed" },
  ],
  totalTasksCount: 3,
  pendingTasksCount: 2,
};

const computeTaskCounts = (tasksArray) => {
  const totalTasksCount = tasksArray.length;
  const pendingTasksCount = tasksArray.filter(
    (t) => t.status === "Pending",
  ).length;
  return { totalTasksCount, pendingTasksCount };
};

function taskReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK: {
      const exists = state.tasks.some((t) => t.id === action.payload.id);
      if (exists) return state; 

      const updatedTasks = [
        ...state.tasks,
        { ...action.payload, status: "Pending" },
      ];
      return {
        ...state,
        tasks: updatedTasks,
        ...computeTaskCounts(updatedTasks),
      };
    }

    
    case REMOVE_TASK: {
      const updatedTasks = state.tasks.filter((t) => t.id !== action.payload);
      return {
        ...state,
        tasks: updatedTasks,
        ...computeTaskCounts(updatedTasks),
      };
    }

    case MARK_AS_COMPLETED: {
      const updatedTasks = state.tasks.map((t) =>
        t.id === action.payload ? { ...t, status: "Completed" } : t,
      );
      return {
        ...state,
        tasks: updatedTasks,
        ...computeTaskCounts(updatedTasks),
      };
    }

    default:
      return state;
  }
}

export const store = createStore(taskReducer);
