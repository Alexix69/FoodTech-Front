import type { Task } from '../../models/Task';
import { TaskCard } from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  onStartPreparation: (taskId: number) => void;
  onCompleteTask?: (taskId: number) => void;
  startingTaskId: number | null;
  completingTaskId?: number | null;
  emptyMessage?: string;
}

export function TaskList({
  tasks,
  onStartPreparation,
  onCompleteTask,
  startingTaskId,
  completingTaskId = null,
  emptyMessage = 'Sin Tareas Pendientes'
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div data-testid="empty-tasks-message" className="border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center text-silver-text/30 p-8 min-h-[400px]">
        <span className="material-symbols-outlined text-5xl mb-3">hourglass_empty</span>
        <p className="text-xs font-bold uppercase tracking-[0.2em]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onStartPreparation={onStartPreparation}
          onCompleteTask={onCompleteTask}
          isStarting={startingTaskId === task.id}
          isCompleting={completingTaskId === task.id}
        />
      ))}
    </div>
  );
}
