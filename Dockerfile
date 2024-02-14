FROM node:16

WORKDIR /app

COPY ./package.json /app

COPY ./yarn.lock /app

COPY ./src /app/src

COPY ./tsconfig.json /app

RUN yarn install

RUN yarn build

CMD ["yarn", "dev"]
