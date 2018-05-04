FROM node:carbon
LABEL description="Enum-Converter dev"

RUN apt-get update

WORKDIR /work

# install packages
COPY package.json .
RUN npm install

# copy source
COPY . .

