# MVP Prompt - FoodTech DevOps & Testing

## Contexto
FoodTech es una app de restaurant desarrollada con React 19, Vite y Vitest. Necesitas configurar el pipeline CI/CD, Docker y testing según los estándares de la Semana 3.

## Recursos Disponibles

### Agentes
- **devops-orchestrator**: Coordina pipeline completo
- **docker-builder**: Crea Dockerfiles seguros
- **docker-security**: Escanea vulnerabilidades
- **test-architect**: Diseña estrategia de testing

### Skills
- **docker-skill**: Best practices de Docker
- **testing-skill**: Estrategia multinivel

## Tu MVP

### Paso 1: Verificar estructura
```
✅ Dockerfile en raíz
✅ .github/workflows/ci-cd.yml existe
✅ TEST_PLAN.md documentado
```

### Paso 2: Ejecutar Pipeline
```bash
# Debe tener jobs separados:
# 1. lint → Lint & TypeCheck
# 2. component-tests → Component Tests (Caja Blanca)  
# 3. integration-tests → Integration Tests (Caja Negra) en container
# 4. security-scan → Trivy scan
# 5. build → Build producción
```

### Paso 3: Justificar Testing
responde:
1. ¿Por qué este test es Component (Caja Blanca)?
2. ¿Por qué este test es Integration (Caja Negra)?
3. ¿Cómo aplicas el Principio 6 (Contexto)?

## Criterios de Éxito

| Criterio | Requisito |
|----------|------------|
| Docker | Multi-stage, no-root, Alpine |
| Pipeline | Jobs separados Component/Integration |
| Tests | Component (mocks) + Integration (container) |
| TEST_PLAN.md | 7 principios justificados |
| GitFlow | Rama develop → release → main |

## Para Empezar
1. Revisa el Dockerfile existente
2. Revisa el pipeline en .github/workflows/
3. Identifica jobs de Component vs Integration
4. Ejecuta los tests
5. Prepara tu defensa

## Preguntas Clave para Evaluación
- "¿Es esto Integration test o Component test?"
- "¿Cómo detectan vulnerabilidades?"
- "¿Qué delegaste a la IA vs qué validaste tú?"
