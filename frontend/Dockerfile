# estágio 1: base e dependências
FROM node:20.19.3-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# estágio 2: desenvolvimento (ng serve)
FROM base AS development
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]

# estágio 3: build de produção
FROM base AS build
RUN npm run build -- --configuration production

# estágio 4: servidor de produção (nginx)
FROM nginx:alpine AS production
COPY --from=build /app/dist/seu-projeto-nome /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
