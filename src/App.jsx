import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './contexts/TaskContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import TaskDetail from './pages/TaskDetail';

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/tasks" element={<Layout><TaskList /></Layout>} />
            <Route path="/add-task" element={<Layout><AddTask /></Layout>} />
            <Route path="/task/:id" element={<Layout><TaskDetail /></Layout>} />
          </Routes>
        </Router>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;
