FROM node:lts
WORKDIR /usr/src/app


COPY ["package.json", "yarn.lock", ".yarnrc.yml","./"]
COPY [".yarn", ".yarn"]

COPY packages/enum-converter/package.json ./packages/enum-converter/package.json
COPY packages/enum-converter-api/package.json ./packages/enum-converter-api/package.json
COPY packages/enum-converter-web/package.json ./packages/enum-converter-web/package.json

RUN yarn install

COPY . .
