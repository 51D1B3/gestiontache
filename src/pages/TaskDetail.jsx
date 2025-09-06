import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTask } from '../contexts/TaskContext';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allTasks, updateTask, deleteTask, toggleTask } = useTask();
  
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });

  useEffect(() => {
    const foundTask = allTasks.find(t => t.id === id);
    if (foundTask) {
      setTask(foundTask);
      setEditForm({
        title: foundTask.title,
        description: foundTask.description || '',
        priority: foundTask.priority,
        dueDate: foundTask.dueDate || ''
      });
    }
  }, [id, allTasks]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      dueDate: task.dueDate || ''
    });
  };

  const handleSaveEdit = () => {
    const updatedTask = {
      ...task,
      title: editForm.title.trim(),
      description: editForm.description.trim(),
      priority: editForm.priority,
      dueDate: editForm.dueDate || null
    };
    updateTask(updatedTask);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      deleteTask(task.id);
      navigate('/tasks');
    }
  };

  const handleToggleComplete = () => {
    toggleTask(task.id);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Non définie';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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

  if (!task) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20a7.962 7.962 0 01-5.657-2.343m0-8.686A7.962 7.962 0 0112 4a7.962 7.962 0 015.657 2.343m0 8.686a4 4 0 010-5.656" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Tâche introuvable</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">La tâche que vous recherchez n'existe pas.</p>
          <Link to="/tasks" className="btn-primary">
            Retour aux Tâches
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link
            to="/tasks"
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Détails de la Tâche
          </h1>
        </div>
        
        <div className="flex items-center space-x-3">
          {!isEditing && (
            <>
              <button
                onClick={handleEdit}
                className="btn-secondary"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Modifier
              </button>
              <button
                onClick={handleDelete}
                className="btn-danger"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Supprimer
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Task Content */}
          <div className="card">
            <div className="flex items-start space-x-4">
              <button
                onClick={handleToggleComplete}
                className={`mt-1 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors duration-200 ${
                  task.completed
                    ? 'bg-primary-600 border-primary-600 text-white'
                    : 'border-gray-300 dark:border-gray-600 hover:border-primary-500'
                }`}
              >
                {task.completed && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>

              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                      className="input-field text-xl font-semibold"
                      placeholder="Titre de la tâche..."
                    />
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      className="input-field resize-none"
                      placeholder="Description de la tâche..."
                    />
                  </div>
                ) : (
                  <>
                    <h2 className={`text-2xl font-semibold text-gray-900 dark:text-gray-100 ${
                      task.completed ? 'line-through' : ''
                    }`}>
                      {task.title}
                    </h2>
                    {task.description && (
                      <p className={`mt-3 text-gray-600 dark:text-gray-400 whitespace-pre-wrap ${
                        task.completed ? 'line-through' : ''
                      }`}>
                        {task.description}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleCancelEdit}
                  className="btn-secondary"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="btn-primary"
                  disabled={!editForm.title.trim()}
                >
                  Enregistrer les Modifications
                </button>
              </div>
            )}
          </div>

          {/* Status */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Statut</h3>
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
              task.completed
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
            }`}>
              <div className={`w-2 h-2 rounded-full mr-2 ${
                task.completed ? 'bg-green-500' : 'bg-yellow-500'
              }`}></div>
              {task.completed ? 'Terminée' : 'En Cours'}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Task Properties */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Propriétés</h3>
            <div className="space-y-4">
              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Priorité
                </label>
                {isEditing ? (
                  <select
                    value={editForm.priority}
                    onChange={(e) => setEditForm(prev => ({ ...prev, priority: e.target.value }))}
                    className="input-field"
                  >
                    <option value="low">Faible</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Élevée</option>
                  </select>
                ) : (
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority === 'high' ? 'Élevée' : task.priority === 'medium' ? 'Moyenne' : 'Faible'}
                  </span>
                )}
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date d'Échéance
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    value={editForm.dueDate}
                    onChange={(e) => setEditForm(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="input-field"
                    min={new Date().toISOString().split('T')[0]}
                  />
                ) : (
                  <p className="text-gray-900 dark:text-gray-100">
                    {formatDate(task.dueDate)}
                  </p>
                )}
              </div>

              {/* Created Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Créée
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {formatDate(task.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Actions Rapides</h3>
            <div className="space-y-3">
              <button
                onClick={handleToggleComplete}
                className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  task.completed
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800'
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800'
                }`}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {task.completed ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                </svg>
                {task.completed ? 'Marquer comme Incomplète' : 'Marquer comme Terminée'}
              </button>
              
              <Link
                to="/add-task"
                className="w-full btn-secondary text-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Créer une Tâche Similaire
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
