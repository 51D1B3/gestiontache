import React, { memo } from 'react';
import { useTask } from '../contexts/TaskContext';

const TaskFilter = memo(() => {
  const { filter, setFilter, taskStats } = useTask();

  const filters = [
    { key: 'all', label: 'Toutes les Tâches', count: taskStats.total },
    { key: 'active', label: 'Actives', count: taskStats.active },
    { key: 'completed', label: 'Terminées', count: taskStats.completed }
  ];

  return (
    <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
      {filters.map((filterOption) => (
        <button
          key={filterOption.key}
          onClick={() => setFilter(filterOption.key)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            filter === filterOption.key
              ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          <span>{filterOption.label}</span>
          <span className={`px-2 py-0.5 rounded-full text-xs ${
            filter === filterOption.key
              ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
              : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
          }`}>
            {filterOption.count}
          </span>
        </button>
      ))}
    </div>
  );
});

TaskFilter.displayName = 'TaskFilter';

export default TaskFilter;
