FROM node:20-slim AS base

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "run" ]

CMD [ "start:prod" ]
