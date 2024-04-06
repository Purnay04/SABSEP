# ----------------------------
# build from source
# ----------------------------
FROM node:20.10.0 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# ----------------------------
# run with nginx
# ----------------------------
FROM nginx:1.15.8-alpine

COPY --from=build /app/dist/sabsep /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]