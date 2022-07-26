# syntax=docker/dockerfile:1

FROM node:15

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .

EXPOSE 5000

CMD [ "node", "index.js" ]

