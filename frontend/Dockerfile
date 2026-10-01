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

RUN npm ci

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]


# ==========================================
# Stage 3: Lint
# ==========================================
FROM base AS lint

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run lint


# ==========================================
# Stage 4: Production Build
# ==========================================

FROM base AS build

ARG VITE_API_BASE_URL=/api/v1
# ARG VITE_GOOGLE_CLIENT_ID

ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
# ENV VITE_GOOGLE_CLIENT_ID=${VITE_GOOGLE_CLIENT_ID}

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build



# ==========================================
# Stage 5: Production Nginx
# ==========================================

# FROM nginxinc/nginx-unprivileged:alpine AS production

# # Custom Nginx configuration
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Copy compiled React application
# COPY --from=build /app/dist /usr/share/nginx/html

# # Copy runtime configuration template
# COPY config.template.js /usr/share/nginx/html/config.template.js

# # Nginx runs as non-root on port 8080
# EXPOSE 8080

# # Generate runtime configuration and start Nginx
# CMD ["/bin/sh", "-c", "envsubst '${VITE_GOOGLE_CLIENT_ID}' < /usr/share/nginx/html/config.template.js > /usr/share/nginx/html/config.js && nginx -g 'daemon off;'"]


# ==========================================
# Stage 5: Production Nginx
# ==========================================

FROM nginxinc/nginx-unprivileged:alpine AS production

# Custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled React application
COPY --from=build /app/dist /usr/share/nginx/html

# Copy runtime configuration template
COPY config.template.js /usr/share/nginx/html/config.template.js

# Allow the nginx runtime user to generate config.js
USER root
RUN chown -R nginx:nginx /usr/share/nginx/html

# Run nginx as the unprivileged nginx user
USER nginx

# Nginx runs as non-root on port 8080
EXPOSE 8080

# Generate runtime configuration and start Nginx
CMD ["/bin/sh", "-c", "envsubst '${VITE_GOOGLE_CLIENT_ID}' < /usr/share/nginx/html/config.template.js > /usr/share/nginx/html/config.js && nginx -g 'daemon off;'"]