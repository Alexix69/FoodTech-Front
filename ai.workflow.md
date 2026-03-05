# FoodTech AI Workflow

**Version:** 1.0.0

**Description:**
Agente AI para gestión de restaurante FoodTech.
Metodología: TDD - Tests primero, código después.

---

## Agent

- **Role:** AI Restaurant Management Assistant
- **Expertise:** React/TypeScript/Vite, Clean Architecture, TDD (Test-Driven Development), Vitest/Testing Library
- **Constraints:**
  - Solo modifica archivos en src/
  - No hace commits sin aprobación del usuario
  - Ejecuta tests antes de entregar cambios
  - NO crea archivos sin aprobación previa del usuario

---

## Steps

### 0. Read HU (Historia de Usuario)
- **Description:** Leer la nueva HU del archivo HISTORIAS_DE_USUARIO_FRONT.md
- **Tools:** read HISTORIAS_DE_USUARIO_FRONT.md
- **Questions:**
  - "¿Qué necesita el usuario?"
  - "¿Cuáles son los criterios de aceptación?"
  - "¿Qué escenarios hay que probar?"
- **Output:** Entendimiento claro de la feature a implementar

### 1. Load Context
- **Description:** Cargar estado actual del proyecto
- **Tools:** glob, read package.json, read App.tsx, read tsconfig.json
- **Output:** estructura del proyecto

### 2. Analyze Requirements
- **Description:** Entender qué necesita el usuario y cómo están estructurados los tests actuales
- **Tools:** read existing tests, read models/, read services/, read hooks/
- **Questions:**
  - "¿Qué comportamiento debe tener la nueva feature?"
  - "¿Cuáles son los casos edge?"
  - "¿Qué dependencias existen?"

### 3. Write Tests First (TDD Red)
- **Description:** Escribir tests ANTES del código - deben fallar inicialmente
- **Tools:** write test file
- **Rules:**
  - Nombrar: *.test.ts o *.test.tsx, o *.spec.ts/*.spec.tsx
  - Ubicación: mismo directorio que el componente/servicio
  - Cubrir: happy path + edge cases + casos de error
  - Usar las utilidades de test del proyecto (Vitest, Testing Library)
  - NO escribir implementación todavía
- **Expected Result:** Tests deben FALLAR (red)

### 4. Run Tests (Verify Red)
- **Description:** Verificar que los tests fallen correctamente
- **Tools:** npm test -- --run
- **Expected Result:** Tests deben FALLAR - verificar que el failure es por código no implementado, no por error en el test

### 5. Implement Feature (TDD Green)
- **Description:** Escribir código mínimo para pasar los tests
- **Tools:** write implementation, read existing code patterns
- **Rules:**
  - Solo implementar lo necesario para pasar tests
  - Seguir Clean Architecture del proyecto
  - Usar los hooks/services existentes
  - Mantener consistencia con el código existente
- **Output:** archivo de implementación

### 6. Run Tests (Verify Green)
- **Description:** Verificar que los tests pasen
- **Tools:** npm test -- --run
- **Expected Result:** Tests deben PASAR (green)

### 7. Refactor (TDD Refactor)
- **Description:** Mejorar código manteniendo tests pasando
- **Tools:** edit code
- **Rules:**
  - No cambiar comportamiento - solo estructura
  - Ejecutar tests después de cada refactor
  - Si algo falla, revertir inmediatamente
- **Optional:** true

### 8. Final Verification
- **Description:** Verificar que todo pasa antes de entregar
- **Tools:** npm run lint, npm run typecheck, npm test -- --run
- **Rules:**
  - lint debe pasar sin errores
  - typecheck debe pasar sin errores
  - tests deben pasar

---

### Paso 9: Update Historial
- **Description:** Escribir en HISTORIAL.md solo lo básico de lo realizado
- **Tools:** edit HISTORIAL.md
- **Format (simple):**
  ```markdown
  ## HU-FRONT-XXX: [Nombre de Feature] ✅
  - Tests: [número]
  - Componentes: [archivos modificados]
  ```
- **Ejemplo:**
  ```markdown
  ## HU-FRONT-010: Login ✅
  - Tests: 48
  - Componentes: LoginView.tsx, authService.ts, useAuth.ts
  ```
- **Rules:**
  - NO escribir commits ni detalles extensos
  - Solo número de tests y archivos modificados
  - Mantener el mismo formato para todas las HU


## Flujo TDD Resumido

1. Write Test → FAIL (red) ✗
2. Implement Code → PASS (green) ✓
3. Refactor → PASS (green) ✓
4. Lint + Typecheck → ✓

---