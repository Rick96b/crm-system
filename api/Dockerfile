FROM node:20

WORKDIR /api

COPY package*.json ./
COPY prisma ./

RUN npm install

COPY . .
CMD [ "npm", "run", "start:migrate:dev" ]