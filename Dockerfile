FROM mhart/alpine-node:10

RUN mkdir -p /var/app

WORKDIR /var/app

COPY package*.json /var/app/
COPY tsconfig.json /var/app/

RUN npm install

COPY ./src /var/app/src

RUN npm test
RUN npm run build


CMD [ "npm", "start" ]