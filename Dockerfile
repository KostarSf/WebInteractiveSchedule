FROM node:14-alpine as build
WORKDIR /app
RUN npm i -g expo-cli
COPY . ./
RUN npm ci
RUN npm run build:web

FROM nginx:stable-alpine
COPY --from=build /app/web-build /var/www/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
