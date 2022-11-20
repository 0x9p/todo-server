FROM node:13.12.0-alpine

COPY ./ /usr/src/app

WORKDIR /usr/src/app

RUN npm install
RUN npm run compile

CMD ["node", "dist/index.js"]
