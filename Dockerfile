FROM node:latest

RUN npm install -g @angular/cli

WORKDIR /app

COPY . /app

RUN npm install

RUN ng build --prod