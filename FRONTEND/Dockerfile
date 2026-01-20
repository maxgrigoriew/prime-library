# Stage 1: Build
FROM node:20-alpine AS builder

# Увеличиваем память
ENV NODE_OPTIONS="--max-old-space-size=4096"

WORKDIR /app

# Копируем package файлы
COPY package.json package-lock.json* ./

# Устанавливаем зависимости
RUN npm ci --no-audit

# Копируем исходники
COPY . .

# Собираем приложение
RUN npm run build

# Stage 2: Production
FROM nginx:alpine AS production

# Копируем собранное приложение
COPY --from=builder /app/dist /usr/share/nginx/html

# Создаем nginx.conf прямо в контейнере
RUN echo 'events { worker_connections 1024; }' > /etc/nginx/nginx.conf && \
    echo 'http {' >> /etc/nginx/nginx.conf && \
    echo '  include /etc/nginx/mime.types;' >> /etc/nginx/nginx.conf && \
    echo '  default_type application/octet-stream;' >> /etc/nginx/nginx.conf && \
    echo '  server {' >> /etc/nginx/nginx.conf && \
    echo '    listen 80;' >> /etc/nginx/nginx.conf && \
    echo '    root /usr/share/nginx/html;' >> /etc/nginx/nginx.conf && \
    echo '    index index.html;' >> /etc/nginx/nginx.conf && \
    echo '    location / { try_files $uri $uri/ /index.html; }' >> /etc/nginx/nginx.conf && \
    echo '  }' >> /etc/nginx/nginx.conf && \
    echo '}' >> /etc/nginx/nginx.conf

# Базовая nginx конфигурация
#COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]