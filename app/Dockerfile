FROM node:16-alpine as builder
WORKDIR /app
COPY ./app/package.json /app/package.json
RUN npm install
COPY ./app /app
RUN npm run build
FROM nginx:1.16.0-alpine
COPY --from=builder ./app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
