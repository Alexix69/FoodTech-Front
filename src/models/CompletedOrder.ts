export interface CompletedOrder {
  id: string;
  tableNumber: string;
  totalItems: number;
  totalPreparationTime?: number;
  completedAt: Date;
}

export interface CompletedOrderResponse {
  orderId: number;
  tableNumber: string;
  completedAt: string;
  totalItems: number;
  totalPreparationTime?: number;
}
