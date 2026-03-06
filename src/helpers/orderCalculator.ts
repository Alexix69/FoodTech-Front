import type { OrderProduct } from '../models/Product';

export function calculateTotalItems(products: OrderProduct[]): number {
  return products.reduce((sum, product) => sum + product.quantity, 0);
}

export function calculateTotalPrice(products: OrderProduct[]): number {
  return products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
}
