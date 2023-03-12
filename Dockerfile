FROM node:16.3.0-alpine

RUN npm install -g @angular/cli

WORKDIR /app

COPY . /app

RUN npm install

RUN ng build