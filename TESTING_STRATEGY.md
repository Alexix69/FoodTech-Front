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
| `01-auth-login-exitoso.test.ts` | Login exitoso retorna true | Que la función retorna valor esperado |
| `02-auth-login-invalidas.test.ts` | Login con credenciales inválidas | Que lanza error correcto |
| `03-auth-login-error-red.test.ts` | Login con error de red | Que maneja errores de red |
| `04-auth-login-remember-false.test.ts` | Login sin rememberMe | Que no guarda expiry |
| `05-auth-login-remember-true.test.ts` | Login con rememberMe | Que guarda expiry |
| `06-auth-logout-token.test.ts` | Logout remueve token | Que limpia localStorage |
| `07-auth-getToken.test.ts` | getToken retorna token | Que retorna valor almacenado |
| `08-auth-getToken-null.test.ts` | getToken sin token | Que retorna null |
| `09-auth-isAuthenticated-true.test.ts` | Con token retorna true | Que verifica correctamente |
| `10-auth-isAuthenticated-false.test.ts` | Sin token retorna false | Que maneja ausencia |
| `11-auth-isAuthenticated-expirado.test.ts` | Token expirado | Que valida expiración |
| `12-auth-register-exitoso.test.ts` | Register exitoso | Que crea usuario |
| `16-useAuth-inicial.test.ts` | Hook sin auth | Que inicializa correcto |
| `17-useAuth-inicial-token.test.ts` | Hook con token | Que detecta sesión |
| `18-useAuth-login.test.ts` | Login en hook | Que actualiza estado |
| `25-LoginView-formulario.test.tsx` | Render formulario | Que renderiza UI |
| `31-LoginView-email.test.ts` | Input email | Que acepta texto |
| `32-LoginView-password.test.ts` | Input password | Que acepta texto |

### Tests de VALIDACIÓN (¿Negocio protegido?)

| Archivo | Test | Qué valida |
|---------|------|------------|
| `01-auth-login-exitoso.test.ts` | Token se guarda en localStorage | **Seguridad: Sesión persistida** |
| `02-auth-login-invalidas.test.ts` | Error con credenciales inválidas | **Seguridad: Acceso denegado** |
| `06-auth-logout-token.test.ts` | Logout limpia sesión | **Seguridad: Cerrar sesión** |
| `11-auth-isAuthenticated-expirado.test.ts` | Token expirado no permite acceso | **Seguridad: Sesión válida** |
| `18-useAuth-login.test.ts` | Login actualiza estado | **Regla: Estado consistente** |
| `19-useAuth-login-error.test.ts` | Error no crea sesión | **Seguridad: Estado limpio** |
| `21-useAuth-logout.test.ts` | Hook logout | **Regla: Limpiar estado** |
| `34-LoginView-submit-login.test.tsx` | Submit llama login | **Regla: Flujo correcto** |
| `37-LoginView-demo.test.tsx` | Demo mode funciona | **Regla: Acceso demo** |
| `40-LoginView-error.test.tsx` | Muestra errores | **UX: Feedback usuario** |

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
| `src/tests/auth/01-15-*.test.ts` | 15 | Unit | 10 Verificar, 5 Validar |
| `src/tests/auth/16-24-*.test.ts` | 9 | Unit/Hook | 5 Verificar, 4 Validar |
| `src/tests/auth/25-41-*.test.tsx` | 17 | Component | 12 Verificar, 5 Validar |
| `orderCalculator.test.ts` | 6 | Unit | 6 Verificar |
| `useOrder.test.ts` | 1 | Unit/Hook | 1 Verificar |

**Total: 100 tests (100% verdes)**

### Coverage Actual
- **Statements**: 96.44%
- **Branches**: 80%
- **Functions**: 100%
- **Lines**: 96.31%

---

## 5. Estrategia TDD Aplicada

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
