FROM node:lts-alpine as builder
WORKDIR /usr/src/app
COPY . .
RUN yarn
RUN yarn workspaces run build

# run the server
FROM node:lts-alpine
WORKDIR /usr/src/app
ENV NODE_ENV production
ENV PORT 5000
EXPOSE 5000
COPY --from=builder ["/usr/src/app/packages/enum-converter-api/package.json", "/usr/src/app/yarn.lock", "./"]
COPY --from=builder ["/usr/src/app/packages/enum-converter-api/build", "./build"]
COPY --from=builder ["/usr/src/app/packages/enum-converter-web/build", "./static"]
RUN yarn
RUN yarn start
