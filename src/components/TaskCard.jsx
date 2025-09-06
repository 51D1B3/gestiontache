import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useTask } from '../contexts/TaskContext';

const TaskCard = memo(({ task }) => {
  const { toggleTask, deleteTask } = useTask();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`card transition-all duration-200 hover:shadow-lg ${
      task.completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <button
            onClick={() => toggleTask(task.id)}
            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200 ${
              task.completed
                ? 'bg-primary-600 border-primary-600 text-white'
                : 'border-gray-300 dark:border-gray-600 hover:border-primary-500'
            }`}
          >
            {task.completed && (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          <div className="flex-1 min-w-0">
            <Link to={`/task/${task.id}`} className="block group">
              <h3 className={`font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 ${
                task.completed ? 'line-through' : ''
              }`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2 ${
                  task.completed ? 'line-through' : ''
                }`}>
                  {task.description}
                </p>
              )}
            </Link>

            <div className="flex items-center space-x-3 mt-3">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                {task.priority === 'high' ? 'Élevée' : task.priority === 'medium' ? 'Moyenne' : 'Faible'}
              </span>
              
              {task.dueDate && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Échéance : {formatDate(task.dueDate)}
                </span>
              )}
              
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Créée : {formatDate(task.createdAt)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          <Link
            to={`/task/${task.id}`}
            className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            title="Voir les détails"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Link>
          
          <button
            onClick={() => deleteTask(task.id)}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
            title="Supprimer la tâche"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
});

TaskCard.displayName = 'TaskCard';

export default TaskCard;
