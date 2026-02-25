# Testing Strategy - FoodTech

## Resumen Ejecutivo

Este documento define la estrategia de QA para el proyecto FoodTech, diferenciando entre pruebas de **verificación** y **validación**.

---

## 1. Tipos de Pruebas

### 🧪 Verificar vs Validar

| Concepto | Descripción | Ejemplo |
|----------|-------------|---------|
| **Verificar** | "¿Estamos construyendo el producto correctamente?" | ¿La función suma correctamente? |
| **Validar** | "¿Estamos construyendo el producto correcto?" | ¿El saldo negativo es imposible? |

### 🧪 Pruebas de Verificación (Testing)
> "¿Estamos construyendo el producto correctamente?"
> Verifican que el código funciona como se diseñó.

| Tipo | Descripción | Herramienta |
|------|-------------|--------------|
| Unit Tests | Pruebas de funciones y hooks individuales | Vitest |
| Integration Tests | Pruebas de integración entre servicios | Vitest + Testing Library |
| Component Tests | Pruebas de componentes React | Testing Library |

### ✅ Pruebas de Validación (QA)
> "¿Estamos construyendo el producto correcto?"
> Verifican que el sistema cumple con los requisitos del usuario.

| Tipo | Descripción | Método |
|------|-------------|--------|
| E2E | Flujos completos de usuario | Manual |
| UAT | Pruebas con usuarios reales | Manual |
| Performance | Tiempos de carga y respuesta | Lighthouse |

---

## 2. Pruebas Implementadas en FoodTech

### Tests de VERIFICACIÓN (¿Código funciona?)

| Archivo | Test | Qué verifica |
|---------|------|--------------|
| `authService.test.ts` | login exitoso | Que el login retorna true y guarda token |
| `authService.test.ts` | credenciales inválidas | Que lanza error 401 |
| `authService.test.ts` | error de red | Que maneja TypeError |
| `authService.test.ts` | logout | Que limpia localStorage |
| `authService.test.ts` | getToken | Que retorna token o null |
| `useAuth.test.ts` | estado inicial sin auth | Que isAuthenticated es false |
| `useAuth.test.ts` | estado con auth | Que isAuthenticated es true |
| `orderCalculator.test.ts` | pedido vacío | Retorna 0 |
| `orderCalculator.test.ts` | precio total | Multiplica quantity × price |

### Tests de VALIDACIÓN (¿Negocio protegido?)

| Archivo | Test | Qué valida |
|---------|------|------------|
| `authService.test.ts` | Token se guarda correctamente | **Seguridad: Sesión persistida** |
| `authService.test.ts` | No hay sesión con credenciales inválidas | **Seguridad: Acceso denegado** |
| `useAuth.test.ts` | Login con error no crea sesión | **Seguridad: Estado consistente** |
| `App.test.tsx` | Login页 muestra cuando no autenticado | **Regla: Acceso protegido** |
| `App.test.tsx` | Navigation muestra cuando autenticado | **Regla: Vistas seguras** |

---

## 3. Human Check - Defensa de Tests

El estudiante debe poder explicar cada test generado por IA:

### Ejemplo de Explicación (authService.test.ts)

```typescript
// TEST: "debe hacer login exitoso y guardar token en localStorage"
describe('login', () => {
  it('debe hacer login exitoso y guardar token en localStorage', async () => {
    // 1. MOCK: Simulo API que retorna token
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ token: mockToken })
    })

    // 2. ACT: Llamo al servicio real
    const result = await authService.login('test@restaurant.com', 'password123')

    // 3. ASSERTIONS:
    // Verifica: El login retorna true (verificación técnica)
    expect(result).toBe(true)
    
    // Valida: El token se guardó en localStorage (regla de negocio: persistencia de sesión)
    expect(localStorage.getItem('auth_token')).toBe(mockToken)
  })
})
```

### ¿Por qué se mockea `fetch`?
- **Qué es**: Función nativa del navegador para HTTP requests
- **Por qué**: Para no depender de un servidor real en tests
- **Qué pasa si no se mockea**: Los tests fallarían si no hay API corriendo

---

## 4. Cobertura de Pruebas Actual

| Archivo | Tests | Tipo | Clasificación |
|---------|-------|------|---------------|
| `authService.test.ts` | 8 | Unit | 5 Verificar, 3 Validar |
| `useAuth.test.ts` | 6 | Unit/Hook | 3 Verificar, 3 Validar |
| `orderCalculator.test.ts` | 3 | Unit | 3 Verificar |
| `useOrder.test.ts` | 1 | Unit/Hook | 1 Verificar |
| `App.test.tsx` | 2 | Integration | 2 Validar |

**Total: 20 tests (100% verdes)**

---

## 3. Estrategia TDD Aplicada

```
1. RED    → Escribir test que falla
2. GREEN  → Implementar código mínimo para pasar
3. REFACTOR → Melhorar código manteniendo tests
```

### Flujo de Trabajo

1. **Analizar Requisitos** → Entender qué necesita el usuario
2. **Escribir Test Primero** → Crear test en archivo `.test.ts`
3. **Verificar que Falla** → Ejecutar `npm test` → debe fallar
4. **Implementar** → Escribir código mínimo
5. **Verificar que Pasa** → Ejecutar `npm test` → debe pasar
6. **Refactorizar** → Melhorar si es necesario
7. **Verificación Final** → Lint + Typecheck + Tests

---

## 4. Reglas de Testing

### Unit Tests (Servicios)
- ✅ Probar casos happy path
- ✅ Probar casos de error
- ✅ Probar edge cases
- ❌ No probar implementación interna (caja negra)

### Hook Tests
- ✅ Probar estados iniciales
- ✅ Probar transiciones de estado
- ✅ Probar efectos secundarios

### Component Tests
- ✅ Probar renderizado
- ✅ Probar interacciones del usuario
- ✅ Probar casos de error

---

## 5. Commands de Ejecución

```bash
# Ejecutar todos los tests
npm test

# Tests en modo watch
npm test

# Tests con coverage
npm test -- --coverage

# Solo archivos específicos
npm test -- --run src/services/authService.test.ts

# Lint
npm run lint

# Typecheck
npm run build

# Verificación completa
npm run lint && npm test -- --run && npm run build
```

---

## 6. Criterios de Aceptación

| Métrica | Objetivo | Actual |
|---------|----------|--------|
| Tests Passing | ≥ 90% | 100% |
| Coverage | ≥ 70% | - |
| Lint Errors | 0 | 0 |
| Typecheck Errors | 0 | 0 |

---

## 7. Próximos Pasos

- [ ] Agregar más tests de componentes
- [ ] Configurar coverage report
- [ ] Agregar tests E2E con Playwright
- [ ] Integrar en CI/CD pipeline

---

## 8. Glosario

| Término | Definición |
|---------|------------|
| TDD | Test-Driven Development |
| Unit Test | Prueba de una unidad pequeña de código |
| Integration Test | Prueba de múltiples unidades juntas |
| E2E | End-to-End (extremo a extremo) |
| Happy Path | Flujo principal sin errores |
| Edge Case | Caso límite o poco común |
