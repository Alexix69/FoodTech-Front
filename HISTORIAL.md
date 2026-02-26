# Historial de Features - FoodTech

## Features Completadas

### 🔐 Login (HU-FRONT-XXX)
- **Estado:** ✅ Completado
- **Componente:** `src/views/LoginView.tsx`
- **Service:** `src/services/authService.ts`
- **Hook:** `src/hooks/useAuth.ts`
- **Tests:** 12 tests en `authService.test.ts`, 6 tests en `useAuth.test.ts`

---

## Feature Completada: Registro de Usuario ✅

### Commits TDD Realizados

| # | Commit | Descripción |
|---|--------|-------------|
| 1 | `test: add register tests (TDD RED)` | Tests de authService.register |
| 2 | `feat: implement register (TDD GREEN)` | Implementación de authService.register |
| 3 | `test: add register tests to useAuth hook (TDD RED)` | Tests de useAuth.register |
| 4 | `feat: add register method to useAuth hook (TDD GREEN)` | Implementación de useAuth.register |
| 5 | `feat: add register toggle to LoginView` | Toggle login/register en UI |

### Tests Implementados
- ✅ Registro exitoso → guarda token
- ✅ Username duplicado → error
- ✅ Error de red → error de conexión
- ✅ Request con datos correctos
- ✅ Registro desde hook con loading state

### Componentes Modificados
- ✅ `src/services/authService.ts` - Método register
- ✅ `src/services/authService.test.ts` - Tests
- ✅ `src/hooks/useAuth.ts` - Método register
- ✅ `src/hooks/useAuth.test.ts` - Tests
- ✅ `src/views/LoginView.tsx` - Toggle UI

---

## Pendiente (sin iniciar)

- [ ] Login con remember me
- [ ] Reset password
- [ ] Logout automático por inactividad

---

## Historias de Usuario (HU-FRONT)

| HU | Título | Estado |
|----|--------|--------|
| HU-FRONT-001 | Visualizar disponibilidad de mesas | ⏳ Pendiente |
| HU-FRONT-002 | Construir pedido por categorías | ⏳ Pendiente |
| HU-FRONT-003 | Construir pedido con múltiples productos | ⏳ Pendiente |
| HU-FRONT-004 | Modificar pedido antes de enviarlo | ⏳ Pendiente |
| HU-FRONT-005 | Enviar pedido completo a cocina | ⏳ Pendiente |
| HU-FRONT-006 | Monitoreo de estado de órdenes | ⏳ Pendiente |
| HU-FRONT-007 | Visualizar tareas por estación | ⏳ Pendiente |
| HU-FRONT-008 | Filtrar tareas por estado | ⏳ Pendiente |
| HU-FRONT-009 | Actualización automática de estados | ⏳ Pendiente |
