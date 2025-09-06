import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskProvider, useTask } from '../contexts/TaskContext';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Test component to interact with TaskContext
const TestComponent = () => {
  const { tasks, addTask, updateTask, deleteTask, toggleTask, taskStats } = useTask();
  
  return (
    <div>
      <div data-testid="task-count">{tasks.length}</div>
      <div data-testid="total-tasks">{taskStats.total}</div>
      <div data-testid="completed-tasks">{taskStats.completed}</div>
      <div data-testid="active-tasks">{taskStats.active}</div>
      
      <button 
        onClick={() => addTask({ title: 'Test Task', description: 'Test Description' })}
        data-testid="add-task"
      >
        Add Task
      </button>
      
      {tasks.map(task => (
        <div key={task.id} data-testid={`task-${task.id}`}>
          <span>{task.title}</span>
          <button 
            onClick={() => toggleTask(task.id)}
            data-testid={`toggle-${task.id}`}
          >
            Toggle
          </button>
          <button 
            onClick={() => deleteTask(task.id)}
            data-testid={`delete-${task.id}`}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

describe('TaskContext', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
    localStorageMock.clear.mockClear();
  });

  test('should add a new task', async () => {
    const user = userEvent.setup();
    
    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );

    expect(screen.getByTestId('task-count')).toHaveTextContent('0');
    
    await user.click(screen.getByTestId('add-task'));
    
    expect(screen.getByTestId('task-count')).toHaveTextContent('1');
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  test('should toggle task completion status', async () => {
    const user = userEvent.setup();
    
    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );

    // Add a task first
    await user.click(screen.getByTestId('add-task'));
    
    expect(screen.getByTestId('completed-tasks')).toHaveTextContent('0');
    expect(screen.getByTestId('active-tasks')).toHaveTextContent('1');
    
    // Toggle the task
    const toggleButton = screen.getByTestId(/toggle-/);
    await user.click(toggleButton);
    
    expect(screen.getByTestId('completed-tasks')).toHaveTextContent('1');
    expect(screen.getByTestId('active-tasks')).toHaveTextContent('0');
  });

  test('should delete a task', async () => {
    const user = userEvent.setup();
    
    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );

    // Add a task first
    await user.click(screen.getByTestId('add-task'));
    expect(screen.getByTestId('task-count')).toHaveTextContent('1');
    
    // Delete the task
    const deleteButton = screen.getByTestId(/delete-/);
    await user.click(deleteButton);
    
    expect(screen.getByTestId('task-count')).toHaveTextContent('0');
  });

  test('should calculate task statistics correctly', async () => {
    const user = userEvent.setup();
    
    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );

    // Add multiple tasks
    await user.click(screen.getByTestId('add-task'));
    await user.click(screen.getByTestId('add-task'));
    await user.click(screen.getByTestId('add-task'));
    
    expect(screen.getByTestId('total-tasks')).toHaveTextContent('3');
    expect(screen.getByTestId('active-tasks')).toHaveTextContent('3');
    expect(screen.getByTestId('completed-tasks')).toHaveTextContent('0');
    
    // Complete one task
    const toggleButtons = screen.getAllByTestId(/toggle-/);
    await user.click(toggleButtons[0]);
    
    expect(screen.getByTestId('total-tasks')).toHaveTextContent('3');
    expect(screen.getByTestId('active-tasks')).toHaveTextContent('2');
    expect(screen.getByTestId('completed-tasks')).toHaveTextContent('1');
  });
});
