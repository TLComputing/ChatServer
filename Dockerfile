FROM node:20.11.1

WORKDIR /app

COPY ./package.json /app

COPY .env /app

COPY ./yarn.lock /app

COPY ./src /app/src

COPY ./tsconfig.json /app

RUN yarn install

RUN yarn build

CMD ["yarn", "dev"]
