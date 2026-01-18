FROM node:22-alpine

WORKDIR /app

COPY back-end\package*.json ./

RUN npm install --production

COPY /back-end .

EXPOSE 8080

CMD ["node", "index.js"]