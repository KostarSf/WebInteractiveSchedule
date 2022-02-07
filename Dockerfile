FROM node:16-alpine as build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . ./
RUN yarn run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
