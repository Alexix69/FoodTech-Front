import { TaskStatus } from '../../models/Task';

interface TaskStatusFilterProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  taskCounts: {
    all: number;
    pending: number;
    inPreparation: number;
    completed: number;
  };
}

export function TaskStatusFilter({ selectedStatus, onStatusChange, taskCounts }: TaskStatusFilterProps) {
  const filters = [
    { id: 'ALL', label: 'Todas las Tareas', count: taskCounts.all },
    { id: TaskStatus.PENDING, label: 'Pendientes', count: taskCounts.pending },
    { id: TaskStatus.IN_PREPARATION, label: 'En Preparación', count: taskCounts.inPreparation },
    { id: TaskStatus.COMPLETED, label: 'Completadas', count: taskCounts.completed }
  ];

  return (
    <div className="flex gap-3 px-10 py-6 overflow-x-auto border-b border-white/5 bg-charcoal/50">
      {filters.map((filter) => (
        <button
          key={filter.id}
          data-testid={`task-status-filter-${filter.id.toLowerCase().replace(/_/g, '-')}`}
          onClick={() => onStatusChange(filter.id)}
          className={`px-8 py-3 rounded-xl text-sm font-bold transition-colors shrink-0 ${
            selectedStatus === filter.id
              ? 'gold-gradient text-midnight shadow-lg shadow-primary/20'
              : 'bg-white/5 text-silver-text hover:bg-white/10 hover:text-white-text border border-white/5'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
