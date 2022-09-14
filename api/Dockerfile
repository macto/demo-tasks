FROM node:lts-alpine

WORKDIR /var/api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3030

CMD ["npm", "run", "start"]
