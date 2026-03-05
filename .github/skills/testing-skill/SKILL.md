---
name: testing
description: 'Testing strategy: Component vs Integration, White/Black Box'
---

# Testing Skill - FoodTech

## Role
Eres experto en estrategia de testing multinivel para React/Vite.

## Los 7 Principios

1. **Pruebas demuestran presencia de defectos**
   - Tests = encontrar bugs, no probar que no hay
   
2. **Testing exhaustivo es imposible**
   - Priorizar riesgos críticos
   
3. **Testing temprano ahorra dinero**
   - TDD: Test primero
   
4. **Las pruebas dependen del contexto**
   - Elegir enfoque según proyecto
   
5. **Paradoja del pesticide**
   - Actualizar tests cuando código cambia
   
6. **Contexto - PRINCIPIO CLAVE**
   - Justificar decisiones de testing
   
7. **Ausencia de errores ≠ calidad**
   - Tests pasan = funcional, no = perfecto

## Estrategia Multinivel

### Nivel 1: Component Tests (Caja Blanca)
```typescript
// CONOCE implementación interna
// Usa MOCKS
// Rápido (< 1 min)

import { renderHook } from '@testing-library/react'
import { useAuth } from './useAuth'

// Mock de fetch
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: () => ({ token: 'test-token' })
})

it('debe hacer login', async () => {
  const { result } = renderHook(() => useAuth())
  await act(async () => {
    await result.current.login('test', 'pass')
  })
  expect(result.current.isAuthenticated).toBe(true)
})
```

### Nivel 2: Integration Tests (Caja Negra)
```typescript
// NO conoce implementación interna
// Se EJECUTA EN CONTENEDOR
// API real

it('debe crear usuario desde API real', async () => {
  // Solo sabe: input → output
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, username, password })
  })
  // NO sabe cómo se guarda internamente
  expect(response.ok).toBe(true)
})
```

## Diferencia Técnica

| Aspect | Component (Blanca) | Integration (Negra) |
|--------|-------------------|-------------------|
| Conoce código | ✅ Sí | ❌ No |
| Dependencias | Mockeadas | Reales |
| Ejecución | Local | En container |
| Velocidad | < 1 min | ~3 min |
| Ejemplo | authService.login() | POST /api/auth/register |

## Test Structure

```
src/
├── services/
│   └── authService.test.ts      # Component - Caja Blanca
├── hooks/
│   └── useAuth.test.ts          # Component - Caja Blanca
├── views/
│   └── LoginView.test.tsx       # Component - Caja Blanca
└── integration/
    └── api.flow.test.ts         # Integration - Caja Negra
```

## Comandos

```bash
# Tests con coverage
npm run test:coverage

# Tests CI (Junit)
npm run test:ci

# Tests UI visual
npm run test:ui

# Solo integration
npm run test:integration
```

## Context Rot Prevention
- Tests deben ser independientes
- Cada test = una verificación
- No depender de orden de ejecución
- Cleanup después de cada test
