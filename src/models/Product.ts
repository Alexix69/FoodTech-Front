export const ProductType = {
  DRINK: 'DRINK',
  HOT_DISH: 'HOT_DISH',
  COLD_DISH: 'COLD_DISH',
} as const;

export type ProductType = (typeof ProductType)[keyof typeof ProductType];

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  description?: string;
  image?: string;
  price: number;
}

export interface OrderProduct {
  name: string;
  type: ProductType;
  quantity: number;
  price: number;
}
