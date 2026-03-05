# Historial de Features - FoodTech

## Features Completadas

### 🔐 HU-FRONT-010: Login ✅
- Tests: 48
- Componentes: LoginView.tsx, authService.ts, useAuth.ts

---

### 🔐 HU-FRONT-011: Logout ✅
- Tests: 5
- Componentes: authService.ts, useAuth.ts

---

### 🔐 HU-FRONT-012: Registro de Usuario ✅
- Tests: 15
- Componentes: authService.ts, useAuth.ts, LoginView.tsx

---

## Pendiente

- [ ] HU-FRONT-001: Mesas en tiempo real
- [ ] HU-FRONT-002: Pedido por categorías
- [ ] HU-FRONT-003: Múltiples productos
- [ ] HU-FRONT-004: Modificar pedido
- [ ] HU-FRONT-005: Enviar pedido a cocina
- [ ] HU-FRONT-006: Monitoreo de órdenes
- [ ] HU-FRONT-007: Tareas por estación
- [ ] HU-FRONT-008: Filtrar tareas
- [ ] HU-FRONT-009: Actualización automática

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
- ✅ `src/hocreateoks/useAuth.ts` - Método register
- ✅ `src/hooks/useAuth.test.ts` - Tests
- ✅ `src/views/LoginView.tsx` - Toggle UI

---

## Pendiente (sin iniciar)

- [ ] Login con remember me
- [ ] Reset password
- [ ] Logout automático por inactividad

---

