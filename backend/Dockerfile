# ==========================================
# Stage 1: Base
# ==========================================
FROM node:22-alpine AS base

WORKDIR /app


# ==========================================
# Stage 2: Development
# ==========================================
FROM base AS development

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY --chown=node:node . .

USER node

EXPOSE 8000

CMD ["npm", "run", "dev"]


# ==========================================
# Stage 3: Lint
# ==========================================
FROM base AS lint

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY --chown=node:node . .

USER node

RUN npm run lint


# ==========================================
# Stage 4: Build
# ==========================================
FROM base AS build

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY --chown=node:node . .

RUN npm run build


# ==========================================
# Stage 5: Production Dependencies
# ==========================================
FROM base AS production-dependencies

COPY package*.json ./

RUN npm ci --omit=dev --legacy-peer-deps


# ==========================================
# Stage 6: Production
# ==========================================
FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Install Nginx and Supervisor
RUN apk add --no-cache nginx supervisor \
    && addgroup -S -g 10001 appgroup \
    && adduser -S -D -H -u 10001 -G appgroup appuser \
    && mkdir -p /tmp/client_temp /tmp/proxy_temp /tmp/fastcgi_temp /tmp/uwsgi_temp /tmp/scgi_temp \
    && chown -R appuser:appgroup /tmp

# Production Node.js dependencies
COPY --from=production-dependencies --chown=appuser:appgroup /app/node_modules ./node_modules

# Compiled application
COPY --from=build --chown=appuser:appgroup /app/dist ./dist

COPY --chown=appuser:appgroup package.json ./

# Nginx configuration
# Nginx main configuration
COPY nginx-main.conf /etc/nginx/nginx.conf

# Nginx reverse proxy configuration
COPY nginx.conf /etc/nginx/http.d/default.conf

# Supervisor configuration
COPY supervisord.conf /etc/supervisord.conf

USER appuser

EXPOSE 8080

CMD ["supervisord", "-c", "/etc/supervisord.conf", "-n"]