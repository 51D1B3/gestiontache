import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        )
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        )
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};

const initialState = {
  tasks: [],
  filter: 'all' // all, active, completed
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      dispatch({ type: 'SET_TASKS', payload: JSON.parse(savedTasks) });
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  const addTask = useCallback((task) => {
    const newTask = {
      id: Date.now().toString(),
      title: task.title,
      description: task.description || '',
      completed: false,
      priority: task.priority || 'medium',
      createdAt: new Date().toISOString(),
      dueDate: task.dueDate || null
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
  }, []);

  const updateTask = useCallback((updatedTask) => {
    dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
  }, []);

  const deleteTask = useCallback((taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  }, []);

  const toggleTask = useCallback((taskId) => {
    dispatch({ type: 'TOGGLE_TASK', payload: taskId });
  }, []);

  const setFilter = useCallback((filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  }, []);

  const filteredTasks = React.useMemo(() => {
    switch (state.filter) {
      case 'active':
        return state.tasks.filter(task => !task.completed);
      case 'completed':
        return state.tasks.filter(task => task.completed);
      default:
        return state.tasks;
    }
  }, [state.tasks, state.filter]);

  const taskStats = React.useMemo(() => {
    const total = state.tasks.length;
    const completed = state.tasks.filter(task => task.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [state.tasks]);

  const value = {
    tasks: filteredTasks,
    allTasks: state.tasks,
    filter: state.filter,
    taskStats,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    setFilter
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};
