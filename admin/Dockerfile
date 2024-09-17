FROM node:20-slim AS base
ARG API_HOST=http://localhost:8000

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

ENV REACT_APP_API_BASE_URL=$API_HOST
RUN npm run build

FROM node:20-alpine AS final
WORKDIR /app

RUN npm install express
COPY --from=base build build
COPY server.js .
COPY package.json .

ENTRYPOINT [ "npm", "run"]

CMD [ "start:prod" ]