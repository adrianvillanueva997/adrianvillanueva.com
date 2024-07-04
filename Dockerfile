FROM golang:1.20.4-alpine3.16@sha256:6469405d7297f82d56195c90a3270b0806ef4bd897aa0628477d9959ab97a577 as build
WORKDIR /build
RUN apk add --no-cache hugo git
COPY . .
RUN hugo --minify

FROM nginx:1.27.0-alpine@sha256:a45ee5d042aaa9e81e013f97ae40c3dda26fbe98f22b6251acdf28e579560d55 as prod
COPY --from=build /build/public/ /usr/share/nginx/html/
EXPOSE 80