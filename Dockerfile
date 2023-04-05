FROM golang:1.20.3-alpine3.16 as build
WORKDIR /build
RUN apk add --no-cache hugo git
COPY . .
RUN hugo --minify

FROM nginx:1.23.4-alpine as prod
COPY --from=build /build/public/ /usr/share/nginx/html/
EXPOSE 80