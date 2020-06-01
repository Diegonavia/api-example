FROM node:alpine as development
WORKDIR '/usr/src/app'
COPY package*.json ./
RUN npm install 
COPY ./ ./ 
CMD ["node", "index.js"]


FROM node:alpine as production
WORKDIR '/usr/src/app'
COPY package*.json ./
RUN npm ci --only=production
COPY ./ ./
EXPOSE 8080
CMD ["node", "index.js"]



