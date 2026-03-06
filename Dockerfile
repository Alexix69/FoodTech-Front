# FoodTech Front - Multi-stage Dockerfile
# Optimizado y seguro para producción

# Stage 1: Dependencias
FROM node:20-alpine AS deps
WORKDIR /app

# Instalar todas las dependencias (incluyendo dev)
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 2: Builder (solo si necesitas build de producción)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 3: Production - Imagen ligera con serve
FROM node:20-alpine AS runner
WORKDIR /app

# Crear usuario no-root para seguridad
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 -G nodejs -s /bin/sh -D nodejs

# Copiar archivos del build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# Instalar serve para producción
RUN npm install -g serve

# Cambiar permisos
RUN chown -R nodejs:nodejs /app

# USER nodejs - NO ejecutar como root
USER nodejs

# Exponer puerto
EXPOSE 5173

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:5173', (r) => process.exit(r.statusCode === 200 ? 0 : 1))" || exit 1

# Iniciar con serve (producción estática)
CMD ["serve", "-s", "dist", "-l", "5173"]
