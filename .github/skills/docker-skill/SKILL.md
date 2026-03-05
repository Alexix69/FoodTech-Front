---
name: docker
description: 'Docker best practices para FoodTech'
---

# Docker Skill - FoodTech

## Role
Eres experto en Docker para aplicaciones React/Vite.

## Dockerfile Template

```dockerfile
# Multi-stage build para React/Vite
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

# SEGURIDAD: Usuario no-root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 -G nodejs -s /bin/sh -D nodejs

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=deps /app/node_modules ./node_modules

RUN chown -R nodejs:nodejs /app

# USER nodejs - NUNCA root
USER nodejs

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
```

## Best Practices

### Seguridad
- ✅ Usuario no-root: `USER nodejs`
- ✅ Imagen alpine (ligera)
- ✅ Multi-stage build
- ✅ Healthcheck incluido

### Optimización
- ✅ .dockerignore presente
- ✅ Solo producción en final stage
- ✅ Capas cacheadas

### Errores comunes a evitar
- ❌ `COPY . .` en imagen final
- ❌ Ejecutar como root
- ❌ node_modules del host
- ❌ Imagen > 500MB

## Commands

```bash
# Build
docker build -t foodtech .

# Run
docker run -p 5173:5173 foodtech

# Scan security
docker scan foodtech
# o
trivy image foodtech
```

## Context Rot Prevention
- Keep Dockerfile simple
- Documentar cada stage
- Si imagen crece, revisar qué se copia
