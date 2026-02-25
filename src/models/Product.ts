/**
 * Tipos de productos según las estaciones de cocina
 */
export const ProductType = {
  DRINK: 'DRINK',
  HOT_DISH: 'HOT_DISH',
  COLD_DISH: 'COLD_DISH',
} as const;

export type ProductType = (typeof ProductType)[keyof typeof ProductType];

/**
 * Modelo de producto del menú
 */
export interface Product {
  id: string;
  name: string;
  type: ProductType;
  description?: string;
  image?: string;
  price: number;
}

/**
 * Producto en el pedido con cantidad
 */
export interface OrderProduct {
  name: string;
  type: ProductType;
  quantity: number;
  price: number;
}
