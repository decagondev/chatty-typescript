FROM node:20-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ARG OPENAI_API_KEY

CMD ["npm", "start"]
