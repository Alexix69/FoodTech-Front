import { describe, it, expect } from 'vitest'
import { groupProductsByName } from './groupProducts'

describe('groupProductsByName', () => {
  it('devuelve un único producto con cantidad 1', () => {
    const result = groupProductsByName([{ name: 'Agua', type: 'DRINK' }])
    expect(result).toEqual([{ name: 'Agua', quantity: 1 }])
  })

  it('agrupa entradas duplicadas del mismo producto', () => {
    const result = groupProductsByName([
      { name: 'Gin Tonic Premium', type: 'DRINK' },
      { name: 'Gin Tonic Premium', type: 'DRINK' },
    ])
    expect(result).toEqual([{ name: 'Gin Tonic Premium', quantity: 2 }])
  })

  it('agrupa tres entradas del mismo producto', () => {
    const result = groupProductsByName([
      { name: 'Coca Cola', type: 'DRINK' },
      { name: 'Coca Cola', type: 'DRINK' },
      { name: 'Coca Cola', type: 'DRINK' },
    ])
    expect(result).toEqual([{ name: 'Coca Cola', quantity: 3 }])
  })

  it('maneja una mezcla de productos únicos y duplicados', () => {
    const result = groupProductsByName([
      { name: 'Gin Tonic Premium', type: 'DRINK' },
      { name: 'Agua', type: 'DRINK' },
      { name: 'Gin Tonic Premium', type: 'DRINK' },
    ])
    expect(result).toEqual([
      { name: 'Gin Tonic Premium', quantity: 2 },
      { name: 'Agua', quantity: 1 },
    ])
  })

  it('respeta quantity explícita si la entrada la incluye', () => {
    const result = groupProductsByName([
      { name: 'Martini', type: 'DRINK', quantity: 3 },
    ])
    expect(result).toEqual([{ name: 'Martini', quantity: 3 }])
  })
})
