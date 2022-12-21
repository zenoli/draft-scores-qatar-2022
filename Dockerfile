# Build stage
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN [ "npm", "run", "build" ]

# Production stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
# ENV API_PROXY=https://rb-scoreboard-backend-production.up.railway.app/
COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=build app/dist/. ./
