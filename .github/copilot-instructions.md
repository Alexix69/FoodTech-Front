# FoodTech - GitHub Copilot Instructions

## Project Overview
- **Name:** FoodTech - Restaurant Management Frontend
- **Tech:** React 19, Vite, Vitest, TailwindCSS
- **Type:** Web Application (SPA)

## Available Agents
- `devops-orchestrator` - Pipeline CI/CD orchestration
- `docker-builder` - Dockerfile creation
- `docker-security` - Security scanning
- `test-architect` - Testing strategy

## Available Skills
- `docker-skill` - Docker best practices
- `testing-skill` - Testing multinivel

## Development Guidelines

### Testing First (TDD)
1. Escribir test → FAIL (RED)
2. Escribir código → PASS (GREEN)
3. Refactor → PASS
4. Commit

### Testing Levels

**Component (Caja Blanca):**
- Tests aislados, con mocks
- Ubicación: `src/**/*.test.ts(x)`
- Coverage: > 80%

**Integration (Caja Negra):**
- Tests en contenedor Docker
- Sin mocks, flujo real
- Ubicación: `src/integration/**`

### Docker
- Multi-stage build siempre
- Usuario no-root
- Alpine base image

### GitFlow
- `main` - Producción
- `develop` - Integración  
- `release/*` - Releases
- `feature/*` - Features
- `hotfix/*` - Urgentes

## Commands
```bash
npm test -- --run        # Tests
npm run test:coverage    # Coverage
npm run lint            # Lint
npm run build           # Build
docker build -t foodtech .  # Docker
```

## Context Rot Prevention
- Resumir decisiones importantes
- Usar modelo grande para planificación
- Si conversación larga, pedir reiniciar

## Boundaries
- ✅ Always: TDD, tests antes de código, Docker seguro
- ⚠️ Ask first: Cambios en pipeline, estructura Docker
- 🚫 Never: Saltar tests, commits sin tests, root en Docker
