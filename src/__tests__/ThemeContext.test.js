import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Test component to interact with ThemeContext
const TestComponent = () => {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <div>
      <div data-testid="theme-status">{isDark ? 'dark' : 'light'}</div>
      <button onClick={toggleTheme} data-testid="toggle-theme">
        Toggle Theme
      </button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
    localStorageMock.clear.mockClear();
    
    // Reset document classes
    document.documentElement.classList.remove('dark');
  });

  test('should initialize with light theme by default', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
  });

  test('should initialize with saved theme from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('dark');
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
  });

  test('should toggle theme when button is clicked', async () => {
    const user = userEvent.setup();
    localStorageMock.getItem.mockReturnValue(null);
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
    
    await user.click(screen.getByTestId('toggle-theme'));
    
    expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  test('should add dark class to document when dark theme is active', async () => {
    const user = userEvent.setup();
    localStorageMock.getItem.mockReturnValue(null);
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await user.click(screen.getByTestId('toggle-theme'));
    
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  test('should remove dark class from document when light theme is active', async () => {
    const user = userEvent.setup();
    localStorageMock.getItem.mockReturnValue('dark');
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Should start with dark theme
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    
    await user.click(screen.getByTestId('toggle-theme'));
    
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
  });
});
