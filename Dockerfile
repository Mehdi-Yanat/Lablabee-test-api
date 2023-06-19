# Development Stage
FROM node:16 as development

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

CMD ["yarn", "dev"]

# Production Stage
FROM node:16 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN yarn install 

COPY . .

CMD ["yarn", "start"]
