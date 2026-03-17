Plan de pruebas para HU-010/011/012 (FoodTech-Front)
## Automatización: Agregar artículo a mesa

### Escenario Automatizado: Agregar artículo
1. El usuario (mesero) inicia sesión y accede a la vista de mesas.
2. Selecciona una mesa disponible.
3. Elige un producto del menú.
4. Pulsa el botón para agregar el producto a la mesa.
5. El sistema actualiza el resumen de la mesa y muestra confirmación.

### Escenario Automatizado: Validación de actualización
1. El usuario agrega un producto a la mesa.
2. El sistema actualiza el resumen de la mesa.
3. Se valida que el producto aparece en la lista de artículos de la mesa.

### Vinculación Técnica
- Script E2E: tests/e2e/add-item-to-table.spec.ts
- Endpoint: /api/orders/add
- Datos de prueba: mesa demo, producto demo
- Integración: pipeline CI/CD ejecuta pruebas E2E en contenedor

### Referencias
- src/views/WaiterView.tsx
- src/components/waiter/TableSelector.tsx
- src/components/waiter/ProductGrid.tsx

---
> Completar detalles técnicos y scripts según avance del desarrollo.
- Reglas de trazabilidad: cada HU tiene su feature file en plan/ y tests correspondientes en tests/e2e/.

- Roadmap rápido: ampliar con FRONT-013/014 cuando aplique.
