FROM node:16.13.0-alpine as node

RUN npm install -g @angular/cli

WORKDIR /app

COPY . /app

RUN npm install

RUN ng build

FROM nginx:alpine
COPY --from=node /app/dist/radi-demo-frontend /usr/share/nginx/html