# PDR.md — Proceso de Automatización E2E (Login y Agregar Artículo a Mesa)

## 1. Contexto
- **Dominio:** Restaurant Management App (FoodTech)
- **Flujos críticos:** Login de usuario y agregar artículo a mesa
- **Objetivo:** Documentar el proceso para portarlo a otro proyecto (Cucumber)

## 2. Flujos Automatizados
### Login
- Navegar a /login
- Ingresar credenciales válidas (usuario demo, contraseña demo)
- Pulsar botón de login
- Validar acceso, persistencia de sesión y vista principal
- Manejar errores (credenciales inválidas, formato incorrecto)

### Agregar artículo a mesa
- Acceder a vista de mesas (Waiter)
- Seleccionar mesa demo
- Elegir producto demo
- Pulsar botón para agregar producto
- Validar actualización de resumen de mesa y confirmación visual

## 3. Escenarios de Prueba (Gherkin)

### Login exitoso
```
Feature: Login
  Scenario: Usuario inicia sesión correctamente
    Given el usuario navega a la página de login
    When ingresa credenciales válidas
    And pulsa el botón de login
    Then accede al sistema y la sesión persiste
    And se muestra la vista principal
```

### Login inválido
```
Feature: Login
  Scenario: Usuario ingresa credenciales inválidas
    Given el usuario navega a la página de login
    When ingresa credenciales inválidas
    And pulsa el botón de login
    Then se muestra un mensaje de error
    And no accede al sistema
```

### Agregar artículo a mesa
```
Feature: Mesa
  Scenario: Mesero agrega producto a mesa
    Given el usuario inicia sesión y accede a la vista de mesas
    When selecciona una mesa disponible
    And elige un producto del menú
    And pulsa el botón para agregar el producto
    Then el sistema actualiza el resumen de la mesa
    And muestra confirmación visual
```

## 4. Datos de Prueba
- Usuario demo: demo@foodtech.com / demopass
- Mesa demo: Mesa Demo
- Producto demo: Producto Demo

## 5. Endpoints y Componentes
- /api/auth/login — autenticación
- /api/orders/add — agregar artículo
- src/views/WaiterView.tsx — vista de mesas
- src/components/waiter/TableSelector.tsx — selección de mesa
- src/components/waiter/ProductGrid.tsx — selección de producto

## 6. Herramientas y Frameworks
- Cypress (actual)
- Cucumber (portabilidad)
- TypeScript / JavaScript
- Docker (ejecución en contenedor)
- CI/CD (GitHub Actions)

## 7. Reglas de Automatización
- Los scripts deben ser ejecutables en contenedor Docker
- Los datos de prueba deben ser seguros y aislados
- Los escenarios deben cubrir flujos exitosos y fallos
- Integrar pruebas en pipeline CI/CD
- Usar tags para filtrar escenarios en Cucumber

## 8. Ejemplo de Estructura de Archivos (Cucumber)
```
features/
  login.feature
  mesa.feature
step_definitions/
  loginSteps.js
  mesaSteps.js
support/
  hooks.js
```

## 9. Integración CI/CD
- Ejecutar pruebas E2E en cada push/pull request
- Reportar resultados y fallos
- Bloquear despliegue si hay fallos en flujos críticos

## 10. Referencias
- FoodTech SDD: plan/SDD-automatizacion-login-articulo-mesa.md
- HU: plan/HU-010-login.feature
- README: plan/README-plan.md

---
> Completar detalles técnicos y adaptar los pasos según el dominio y componentes del nuevo proyecto.
