FROM node:12.16-alpine AS builder
WORKDIR /usr/src/app

COPY . .
RUN npm install react-scripts -g --silent
RUN yarn install
RUN yarn run build

FROM node:12.16-alpine
RUN yarn global add serve
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/build .
CMD ["serve", "-p", "80", "-s", "."]doc