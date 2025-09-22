FROM node:20 AS deps
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

FROM node:20 AS builder
WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
#Compilar TypeScript a /dist
RUN npm run build


FROM node:20 AS prod
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY package*.json ./

ENV NODE_ENV=production
CMD [ "node", "dist/index.js" ]

FROM node:20 AS dev
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

ENV NODE_ENV=development
CMD [ "npx", "nodemon", "src/index.ts" ]