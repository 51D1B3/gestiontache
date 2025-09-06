import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTask } from '../contexts/TaskContext';
import TaskCard from '../components/TaskCard';

const Dashboard = () => {
  const { allTasks, taskStats } = useTask();

  const recentTasks = useMemo(() => {
    return allTasks
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [allTasks]);

  const upcomingTasks = useMemo(() => {
    return allTasks
      .filter(task => !task.completed && task.dueDate)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 3);
  }, [allTasks]);

  const highPriorityTasks = useMemo(() => {
    return allTasks
      .filter(task => !task.completed && task.priority === 'high')
      .slice(0, 3);
  }, [allTasks]);

  const completionRate = useMemo(() => {
    if (taskStats.total === 0) return 0;
    return Math.round((taskStats.completed / taskStats.total) * 100);
  }, [taskStats]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Tableau de Bord
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Bon retour ! Voici un aperçu de vos tâches.
          </p>
        </div>
        <Link
          to="/add-task"
          className="btn-primary"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Ajouter une Tâche
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900">
              <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total des Tâches</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{taskStats.total}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Terminées</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{taskStats.completed}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
              <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Actives</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{taskStats.active}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-sky-100 dark:bg-sky-900">
              <svg className="w-6 h-6 text-sky-600 dark:text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Taux de Réalisation</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{completionRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {taskStats.total > 0 && (
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Progression Globale</h3>
            <span className="text-sm text-gray-600 dark:text-gray-400">{completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-primary-500 to-sky-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Tasks */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Tâches Récentes</h2>
            <Link to="/tasks" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium">
              Voir tout →
            </Link>
          </div>
          <div className="space-y-4">
            {recentTasks.length > 0 ? (
              recentTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))
            ) : (
              <div className="card text-center py-8">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-gray-600 dark:text-gray-400">Aucune tâche pour le moment. Créez votre première tâche !</p>
                <Link to="/add-task" className="btn-primary mt-4 inline-flex items-center">
                  Ajouter une Tâche
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* High Priority & Upcoming */}
        <div className="space-y-8">
          {/* High Priority Tasks */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Priorité Élevée</h2>
            <div className="space-y-4">
              {highPriorityTasks.length > 0 ? (
                highPriorityTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))
              ) : (
                <div className="card text-center py-6">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Aucune tâche prioritaire</p>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Échéances Prochaines</h2>
            <div className="space-y-4">
              {upcomingTasks.length > 0 ? (
                upcomingTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))
              ) : (
                <div className="card text-center py-6">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Aucune échéance prochaine</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer with Copyright */}
      <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Copyright © 06/09/2025 by 51D1B3
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
