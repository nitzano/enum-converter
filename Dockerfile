FROM node:carbon
LABEL description="Enum-Converter dev"

WORKDIR /work

# install packages
COPY package.json .
RUN yarn

# copy source
COPY . .

