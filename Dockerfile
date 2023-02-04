FROM node:14.15

WORKDIR /dist

COPY package*.json ./

RUN npm install

COPY . .


CMD ["npm", "run", "start"]