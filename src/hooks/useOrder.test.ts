import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useOrder } from './useOrder'
import type { Product } from '../models/Product'
import { ProductType } from '../models/Product'

describe('useOrder', () => {
  it('agrega producto nuevo al pedido', () => {
    const { result } = renderHook(() => useOrder())
    
    const producto: Product = {
      id: '1',
      name: 'Gin Tonic',
      type: ProductType.DRINK,
      price : 1
    }
    
    act(() => {
      result.current.addProduct(producto)
    })
    
    expect(result.current.orderProducts).toHaveLength(1)
    expect(result.current.orderProducts[0].name).toBe('Gin Tonic')
    expect(result.current.orderProducts[0].quantity).toBe(1)
  })
})
