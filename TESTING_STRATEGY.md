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
> Pruebas unitarias que verifican que la sintaxis y lógica técnica funciona correctamente.

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
| `16-useAuth-inicial.test.ts` | Hook sin auth | Que inicializa correcto |
| `17-useAuth-inicial-token.test.ts` | Hook con token | Que detecta sesión |
| `18-useAuth-login.test.ts` | Login en hook | Que actualiza estado |
| `25-LoginView-formulario.test.tsx` | Render formulario | Que renderiza UI |
| `31-LoginView-email.test.ts` | Input email | Que acepta texto |
| `32-LoginView-password.test.ts` | Input password | Que acepta texto |

### Tests de VALIDACIÓN (¿Negocio protegido?)
> Pruebas que validan las reglas críticas de negocio y protección del sistema.

| Archivo | Test | Qué valida (Regla de Negocio) |
|---------|------|------------|
| `44-validacion-negocio.test.ts` | Token expirado no permite acceso | **Seguridad: Sesión válida** |
| `44-validacion-negocio.test.ts` | Logout limpia token | **Seguridad: Cerrar sesión** |
| `44-validacion-negocio.test.ts` | getToken retorna null sin token | **Seguridad: Sin acceso** |
| `44-validacion-negocio.test.ts` | isAuthenticated sin token | **Seguridad: Estado protegido** |
| `44-validacion-negocio.test.ts` | Login exitoso guarda token | **Regla: Persistencia de sesión** |
| `44-validacion-negocio.test.ts` | Login con error NO guarda token | **Seguridad: Acceso denegado** |
| `44-validacion-negocio.test.ts` | RememberMe guarda expiry | **Regla: Sesión recordada** |
| `44-validacion-negocio.test.ts` | Sin rememberMe NO guarda expiry | **Regla: Sesión temporal** |
| `44-validacion-negocio.test.ts` | isAuthenticated con token válido | **Seguridad: Acceso permitido** |
| `44-validacion-negocio.test.ts` | getToken retorna token guardado | **Regla: Recuperar sesión** |
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
| `src/tests/auth/43-*.test.ts` | 3 | Unit | 3 Verificar |
| `src/tests/auth/44-*.test.ts` | 10 | Unit | 10 Validar |
| `orderCalculator.test.ts` | 6 | Unit | 6 Verificar |
| `useOrder.test.ts` | 1 | Unit/Hook | 1 Verificar |

**Total: 115 tests (100% verdes)**

### Coverage Actual
- **authService**: 97.36% statements, 88.88% branches
- **Statements**: 97.36%
- **Branches**: 88.88%
- **Functions**: 100%

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

## 6. Human Check - Defensa de Tests

El instructor puede elegir cualquier test y pedir explicaciones. Esta sección documenta los mocks y su propósito.

### Ejemplo 1: Test de Validación de Negocio

**Archivo:** `src/tests/auth/44-validacion-negocio.test.ts`
**Test:** "VALIDAR: Login con error NO guarda token"

```typescript
it('VALIDAR: Login con error NO guarda token', async () => {
  // 1. MOCK: Simulo API que retorna error 401
  global.fetch = vi.fn().mockResolvedValue({
    ok: false,
    status: 401
  })

  // 2. ACT: Llamo al servicio de login
  const { authService } = await import('../../services/authService')
  await expect(
    authService.login('wrong@email.com', 'wrongpass')
  ).rejects.toThrow()

  // 3. ASSERTIONS de VALIDACIÓN:
  expect(localStorage.getItem('auth_token')).toBeNull()
  expect(authService.isAuthenticated()).toBe(false)
})
```

**¿Qué se mockea?**
- `global.fetch` - Simula la respuesta del servidor
- **¿Por qué?** Para no depender de un servidor real

**¿Qué valida?**
- Regla de negocio: "Si login falla, NO se crea sesión"

---

### Ejemplo 2: Test de Componente

**Archivo:** `src/tests/auth/34-LoginView-submit-login.test.tsx`

```typescript
// MOCK: Simulo el hook useAuth
vi.mocked(useAuth).mockImplementation(() => ({
  login: mockLogin,
  register: vi.fn(),
  logout: vi.fn(),
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
}))
```

**¿Qué se mockea?**
- `useAuth` - Hook de React para autenticación
- **¿Por qué?** Aislar el componente del estado real

---

### Ejemplo 3: Test de Hook useAuth

**Archivo:** `src/tests/auth/18-useAuth-login.test.ts`

```typescript
// MOCK: Simulo respuesta exitosa de API
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve({ token: mockToken })
})

// MOCK: Navegación
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}))
```

**Mocks utilizados:**
| Mock | Propósito |
|------|-----------|
| `global.fetch` | Simular llamadas HTTP |
| `react-router-dom` | Aislar navegación |

---

## 7. Guía Rápida para el Human Check

### Si te preguntan "¿Qué se mockea?"

**Responde con:**
1. **Qué es** - El nombre del mock (ej: `global.fetch`, `useAuth`)
2. **Para qué sirve** - Qué funcionalidad simula
3. **Por qué es necesario** - Para no depender de externo

### Si te preguntan "¿Qué valida este test?"

**Responde con:**
1. **Qué verifica** - El comportamiento esperado
2. **Regla de negocio** - La protección que garantiza
3. **Qué pasaría sin el test** - El bug que evitaría

### Ejemplo de respuesta:

**Pregunta:** "En el test 44, ¿qué significa que se mockea `global.fetch`?"

**Respuesta:**
- "Mockeamos `global.fetch` para simular las respuestas del servidor"
- "Sin el mock, los tests dependerían de un servidor API real"
- "El mock nos permite controlar si la API retorna éxito o error"
- "Esto nos permite probar casos como credenciales inválidas (401) sin necesidad de un backend"

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
