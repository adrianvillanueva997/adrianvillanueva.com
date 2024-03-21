FROM golang:1.20.4-alpine3.16@sha256:6469405d7297f82d56195c90a3270b0806ef4bd897aa0628477d9959ab97a577 as build
WORKDIR /build
RUN apk add --no-cache hugo git
COPY . .
RUN hugo --minify

FROM nginx:1.25.4-alpine@sha256:31bad00311cb5eeb8a6648beadcf67277a175da89989f14727420a80e2e76742 as prod
COPY --from=build /build/public/ /usr/share/nginx/html/
EXPOSE 80