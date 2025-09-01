# Etapa 1: build y tests
FROM node:20 AS build
WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copiar todo el código
COPY . .

# Build de producción (solo si pasaron los tests)
RUN npm run build

# Etapa 2: imagen final con Nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]