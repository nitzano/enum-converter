FROM node:lts

WORKDIR /usr/src/app


COPY ["package.json", "yarn.lock","./"]

RUN yarn install

COPY . .

CMD yarn dev