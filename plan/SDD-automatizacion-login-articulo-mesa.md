# SDD: Automatización de Login y Agregar Artículo a Mesa

## 1. Contexto
- **Proyecto:** FoodTech - Restaurant Management Frontend
- **Área:** Automatización de flujos críticos (login y gestión de mesas)
- **Fecha:** 16 de marzo de 2026

## 2. Problema
La automatización de los procesos de login y agregar artículos a una mesa es esencial para garantizar la calidad, velocidad y confiabilidad en los flujos principales del sistema. Actualmente, estos procesos requieren intervención manual o scripts poco estructurados.

## 3. Objetivo
- Automatizar el proceso de login para usuarios (waiter, kitchen, admin).
- Automatizar el proceso de agregar un artículo a una mesa desde la vista de mesero.
- Integrar ambos flujos en pruebas E2E y/o integración.

## 4. Alcance
- Login: Validación de credenciales, manejo de errores, persistencia de sesión.
- Agregar artículo: Selección de mesa, selección de producto, confirmación de agregado.
- Automatización: Scripts o pruebas E2E (Cypress/Vitest), integración en pipeline CI/CD.

## 5. Stakeholders
- QA (automatización)
- Devs Frontend
- DevOps
- Product Owner

## 6. Requerimientos
- Scripts de automatización para login y agregar artículo.
- Pruebas E2E que cubran ambos flujos.
- Documentación de endpoints, datos de prueba y pasos.
- Integración en pipeline CI/CD.

## 7. Constraints
- Debe funcionar en contenedor Docker.
- Debe ser compatible con CI/CD (GitHub Actions).
- Debe usar datos de prueba seguros.

## 8. Proceso Automatizado
### Login
1. Navegar a /login
2. Ingresar credenciales válidas
3. Validar acceso y persistencia
4. Manejar errores (credenciales inválidas)

### Agregar Artículo a Mesa
1. Seleccionar mesa desde vista Waiter
2. Elegir producto
3. Confirmar agregado
4. Validar actualización de resumen de mesa

## 9. Documentación Técnica
- Ubicación de scripts: tests/e2e/
- Herramientas: Cypress, Vitest
- Endpoints: /api/auth/login, /api/orders/add
- Datos de prueba: usuario demo, mesa demo, producto demo

## 10. Integración CI/CD
- Ejecutar pruebas E2E en pipeline
- Reportar resultados y fallos

## 11. Referencias
- [tests/e2e/login.spec.ts](tests/e2e/login.spec.ts)
- [tests/e2e/register.spec.ts](tests/e2e/register.spec.ts)
- [src/views/WaiterView.tsx](src/views/WaiterView.tsx)

---
> Completar detalles técnicos y scripts según avance del desarrollo.
