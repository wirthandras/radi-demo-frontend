FROM node:lts-alpine3.17

RUN npm install -g @angular/cli

WORKDIR /app

COPY . /app

RUN npm install

RUN ng build --prod