import { useMemo, useState } from 'react';
import type { CompletedOrder } from '../models/CompletedOrder';

const INITIAL_COMPLETED_ORDERS: CompletedOrder[] = [
  {
    id: 'ORD-1042',
    tableNumber: 'A3',
    total: 128.5,
    completedAt: new Date('2026-02-19T12:05:00'),
  },
  {
    id: 'ORD-1045',
    tableNumber: 'B1',
    total: 86.0,
    completedAt: new Date('2026-02-19T12:18:00'),
  },
  {
    id: 'ORD-1048',
    tableNumber: 'A1',
    total: 54.25,
    completedAt: new Date('2026-02-19T12:27:00'),
  },
];

export const useCompletedOrders = () => {
  const [completedOrders, setCompletedOrders] = useState<CompletedOrder[]>(
    INITIAL_COMPLETED_ORDERS
  );

  const markAsInvoiced = (orderId: string) => {
    setCompletedOrders((prev) => prev.filter((order) => order.id !== orderId));
  };

  const count = useMemo(() => completedOrders.length, [completedOrders]);

  return {
    completedOrders,
    count,
    markAsInvoiced,
  };
};
