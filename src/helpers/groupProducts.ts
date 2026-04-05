import type { TaskProduct } from '../models/Task'

export function groupProductsByName(products: TaskProduct[]): Array<{ name: string; quantity: number }> {
  const grouped = new Map<string, number>()
  for (const product of products) {
    grouped.set(product.name, (grouped.get(product.name) ?? 0) + (product.quantity ?? 1))
  }
  return Array.from(grouped.entries()).map(([name, quantity]) => ({ name, quantity }))
}
