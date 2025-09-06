import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import { TaskProvider } from '../contexts/TaskContext';

const mockTask = {
  id: '1',
  title: 'Test Task',
  description: 'Test Description',
  completed: false,
  priority: 'medium',
  createdAt: '2023-01-01T00:00:00.000Z',
  dueDate: '2023-12-31'
};

const renderTaskCard = (task = mockTask) => {
  return render(
    <BrowserRouter>
      <TaskProvider>
        <TaskCard task={task} />
      </TaskProvider>
    </BrowserRouter>
  );
};

describe('TaskCard', () => {
  test('renders task information correctly', () => {
    renderTaskCard();
    
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('medium')).toBeInTheDocument();
  });

  test('displays completed task with line-through style', () => {
    const completedTask = { ...mockTask, completed: true };
    renderTaskCard(completedTask);
    
    const title = screen.getByText('Test Task');
    expect(title).toHaveClass('line-through');
  });

  test('shows correct priority colors', () => {
    const highPriorityTask = { ...mockTask, priority: 'high' };
    renderTaskCard(highPriorityTask);
    
    const priorityBadge = screen.getByText('high');
    expect(priorityBadge).toHaveClass('bg-red-100', 'text-red-800');
  });

  test('displays due date when provided', () => {
    renderTaskCard();
    
    expect(screen.getByText(/Due:/)).toBeInTheDocument();
  });

  test('handles task without due date', () => {
    const taskWithoutDueDate = { ...mockTask, dueDate: null };
    renderTaskCard(taskWithoutDueDate);
    
    expect(screen.queryByText(/Due:/)).not.toBeInTheDocument();
  });

  test('renders view details link', () => {
    renderTaskCard();
    
    const viewLinks = screen.getAllByRole('link');
    const detailsLink = viewLinks.find(link => link.getAttribute('href') === '/task/1');
    expect(detailsLink).toBeInTheDocument();
  });
});
