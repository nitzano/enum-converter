FROM node:carbon-alpine
WORKDIR /work
COPY ["package.json", "yarn.lock",  "./"]
RUN yarn
COPY . .

