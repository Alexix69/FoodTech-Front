# Arquitectura Hexagonal - FoodTech

## Resumen

Este documento describe cómo el proyecto FoodTech implementa la **Arquitectura Hexagonal** (Ports and Adapters).

---

## Capas de la Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│  (Componentes React, Vistas, UI)                            │
│  src/components/*, src/views/*                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                         │
│  (Casos de uso, Hooks, Servicios de negocio)               │
│  src/hooks/*, src/helpers/*, src/services/*                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      DOMAIN LAYER                            │
│  (Entidades, Modelos del negocio)                           │
│  src/models/*                                               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   INFRASTRUCTURE LAYER                       │
│  (Adaptadores externos, API, Storage)                       │
│  src/services/apiClient.ts, localStorage                    │
└─────────────────────────────────────────────────────────────┘
```

---

## Estructura de Archivos

```
src/
├── domain/              ← DOMINIO (Core del negocio)
│   └── models/
│       ├── Product.ts
│       ├── Order.ts
│       ├── Table.ts
│       ├── Task.ts
│       └── CompletedOrder.ts
│
├── application/         ← APLICACIÓN (Casos de uso)
│   ├── hooks/           ← Orquestación de lógica
│   │   ├── useAuth.ts
│   │   ├── useOrder.ts
│   │   ├── useTables.ts
│   │   ├── useKitchenTasks.ts
│   │   └── useStationTasks.ts
│   │
│   └── helpers/         ← Lógica de negocio
│       ├── orderCalculator.ts
│       └── menuData.ts
│
├── infrastructure/      ← INFRAESTRUCTURA (Adaptadores)
│   ├── services/
│   │   ├── apiClient.ts      ← Adaptador HTTP
│   │   ├── authService.ts    ← Adaptador Auth
│   │   ├── orderService.ts
│   │   └── taskService.ts
│   │
│   └── storage/         ← (localStorage, etc.)
│
├── presentation/        ← PRESENTACIÓN (UI)
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── kitchen/
│   │   ├── waiter/
│   │   └── completed-orders/
│   │
│   └── views/
│       ├── LoginView.tsx
│       ├── WaiterView.tsx
│       ├── BarView.tsx
│       ├── HotKitchenView.tsx
│       └── ColdKitchenView.tsx
│
└── test/                ← PRUEBAS
    └── setup.ts
```

---

## Principios Aplicados

### 1. Separación de Responsabilidades
- **Domain**: Solo define entidades y tipos
- **Application**: Lógica de negocio sin conocer la UI
- **Infrastructure**: Detalles técnicos (HTTP, localStorage)
- **Presentation**: Solo rendering

### 2. Dependencias hacia el Centro
```
Presentation → Application → Domain ← Infrastructure
                 ↑              ↑
                 └──────────────┘
                   (inversión)
```

### 3. Puertos (Ports)
Los hooks actúan como puertos entre la aplicación y la UI:
- `useAuth` → Puerto de autenticación
- `useOrder` → Puerto de pedidos
- `useTables` → Puerto de mesas

### 4. Adaptadores (Adapters)
- `apiClient.ts` → Adaptador HTTP
- `authService.ts` → Adaptador de autenticación
- `localStorage` → Adaptador de persistencia

---

## Beneficios

| Beneficio | Descripción |
|-----------|-------------|
| Testabilidad | Cada capa puede probarse independientemente |
| Mantenibilidad | Cambios en infraestructura no afectan dominio |
| Reusabilidad |hooks y servicios son reutilizables |
| Claridad | Estructura clara y predecible |

---

## Flujo de Datos (Ejemplo: Login)

```
1. User → LoginView (Presentation)
             │
             ▼
2. useAuth.login() (Application/Hook)
             │
             ▼
3. authService.login() (Infrastructure)
             │
             ▼
4. API → /auth/login (External)
             │
             ▼
5. localStorage.setItem() (Infrastructure)
             │
             ▼
6. useAuth actualiza estado (Application)
             │
             ▼
7. LoginView muestra resultado (Presentation)
```

---

## Tests por Capa

| Capa | Tipo de Test | Archivo |
|------|--------------|---------|
| Domain | Unit Tests | (solo tipos, sin lógica) |
| Application | Unit Tests | useAuth.test.ts, orderCalculator.test.ts |
| Infrastructure | Unit Tests | authService.test.ts |
| Presentation | Integration | App.test.tsx |

---

## Referencias

- **Ports and Adapters** (Arquitectura Hexagonal) - Alistair Cockburn
- **Clean Architecture** - Robert C. Martin
- **React Architecture** - Best Practices
