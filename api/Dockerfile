FROM alpine:latest
RUN apk update \
  && apk add bash \
  && apk add npm
COPY . .
COPY package*.json ./
WORKDIR /
RUN npm install
EXPOSE 3000
CMD ["node", "index.js"]
