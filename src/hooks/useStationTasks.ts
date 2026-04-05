import { useState, useEffect, useCallback } from 'react';
import type { Task } from '../models/Task';
import { TaskStatus } from '../models/Task';
import type { Station } from '../models/Task';
import { taskService } from '../services/taskService';

export function useStationTasks(station: Station, pollingInterval = 5000) {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startingTaskId, setStartingTaskId] = useState<number | null>(null);
  const [completingTaskId, setCompletingTaskId] = useState<number | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setError(null);
      const data = await taskService.getTasksByStation(station);
      setAllTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar tareas');
    } finally {
      setLoading(false);
    }
  }, [station]);

  useEffect(() => {
    fetchTasks();
    if (pollingInterval > 0) {
      const intervalId = setInterval(fetchTasks, pollingInterval);
      return () => clearInterval(intervalId);
    }
  }, [fetchTasks, pollingInterval]);

  const pendingTasks = allTasks
    .filter(t => t.status === TaskStatus.PENDING)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  const inPrepTasks = allTasks.filter(t => t.status === TaskStatus.IN_PREPARATION);

  const completedTasks = allTasks.filter(t => t.status === TaskStatus.COMPLETED);

  const startTaskPreparation = async (taskId: number) => {
    try {
      setStartingTaskId(taskId);
      setError(null);
      await taskService.startTask(taskId);
      await fetchTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar preparación');
    } finally {
      setStartingTaskId(null);
    }
  };

  const completeTask = async (taskId: number) => {
    try {
      setCompletingTaskId(taskId);
      setError(null);
      await taskService.completeTask(taskId);
      await fetchTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al completar tarea');
    } finally {
      setCompletingTaskId(null);
    }
  };

  return {
    allTasks,
    pendingTasks,
    inPrepTasks,
    completedTasks,
    loading,
    error,
    startingTaskId,
    completingTaskId,
    startTaskPreparation,
    completeTask,
    refreshTasks: fetchTasks,
  };
}

