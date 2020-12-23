FROM node:12-alpine

RUN yarn global add serve

WORKDIR /app
ADD ./build .

EXPOSE 8080

ENTRYPOINT serve -s /app -p 8080