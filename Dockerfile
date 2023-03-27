# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine AS server
WORKDIR /usr/share/nginx/html
COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=builder app/dist/. ./
