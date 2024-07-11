FROM node:19.5.0-alpine

WORKDIR /app

COPY package.json .

RUN pwd

RUN npm install --force

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]