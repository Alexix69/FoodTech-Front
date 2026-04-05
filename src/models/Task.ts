/**
 * Estaciones de cocina
 */
export const Station = {
  BAR: 'BAR',
  HOT_KITCHEN: 'HOT_KITCHEN',
  COLD_KITCHEN: 'COLD_KITCHEN',
} as const;

export type Station = (typeof Station)[keyof typeof Station];

/**
 * Estados de una tarea
 */
export const TaskStatus = {
  PENDING: 'PENDING',
  IN_PREPARATION: 'IN_PREPARATION',
  COMPLETED: 'COMPLETED',
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

/**
 * Producto en una tarea
 */
export interface TaskProduct {
  name: string;
  type: string;
  quantity?: number;
}

/**
 * Modelo de tarea
 */
export interface Task {
  id: number;
  orderId: number;
  tableNumber: string;
  station: Station;
  status: TaskStatus;
  products: TaskProduct[];
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
}
