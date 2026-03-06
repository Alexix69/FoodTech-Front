---
description: 'FoodTech DevOps, Testing y CI/CD Guidelines'
applyTo: '**/*'
---

# FoodTech - DevOps & Testing Guidelines

## Project Overview
- **Tech Stack:** React 19, Vite, Vitest, TailwindCSS
- **Domain:** Restaurant Management App
- **Testing:** Multinivel (Component + Integration)

## DevOps Rules

### Dockerfile
- ✅ Multi-stage build (deps → builder → runner)
- ✅ Usuario no-root: `USER nodejs`
- ✅ Imagen alpine
- ✅ Healthcheck incluido
- ✅ .dockerignore presente

### Pipeline CI/CD
- ✅ Jobs separados: Component Tests ≠ Integration Tests
- ✅ Lint bloqueante
- ✅ Security scan (Trivy)
- ✅ Shift-Left Quality

### GitFlow
- main: producción
- develop: integración
- release/*: releases
- hotfix/*: urgentes
- feature/*: features

## Testing Strategy

### Component Tests (Caja Blanca)
- Tests aislados con mocks
- Conocen implementación interna
- Ubicación: src/**/*.test.ts(x)
- Coverage: > 80%

### Integration Tests (Caja Negra)
- Se ejecutan EN CONTENEDOR
- No conocen implementación
- Flujos completos
- Ubicación: src/integration/**/*.test.ts

### Los 7 Principios
1. Pruebas demuestran defectos
2. Testing exhaustivo imposible
3. Testing temprano ahorra $
4. Depende del contexto
5. Paradoja del pesticide
6. Justificar decisiones (CLAVE)
7. Ausencia ≠ calidad

## Commands

```bash
npm test -- --run          # Tests
npm run test:coverage      # Coverage
npm run test:ci            # CI format
npm run lint               # Lint
npm run build              # Build
docker build -t foodtech . # Docker
```

## Context Rot Prevention
- Mantener conversaciones concisas
- Resumir decisiones importantes
- Usar modelo grande para planear, pequeño para ejecutar
