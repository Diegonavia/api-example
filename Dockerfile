FROM node:alpine as development
WORKDIR '/usr/src/app'
COPY package*.json ./
RUN npm install 
COPY ./ ./ 
CMD ["npm", "start"]

FROM node:alpine as production
WORKDIR '/usr/src/app'
COPY package*.json ./
RUN npm ci --only=production
COPY ./ ./
EXPOSE 8080
CMD ["npm", "start"]

#FROM nginx 
#EXPOSE 80
#COPY --from=development /usr/src/app /usr/share/nginx/html