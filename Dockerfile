FROM node:14-alpine as build
WORKDIR /app
RUN npm i -g typescript
RUN npm ci
COPY . ./
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /var/www/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
