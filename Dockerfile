FROM node:10
WORKDIR /usr/src/shaks_pkm_api
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080
CMD [ "node", "src/server.js" ]