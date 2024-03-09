FROM golang:1.20.4-alpine3.16@sha256:6469405d7297f82d56195c90a3270b0806ef4bd897aa0628477d9959ab97a577 as build
WORKDIR /build
RUN apk add --no-cache hugo git
COPY . .
RUN hugo --minify

FROM nginx:1.25.4-alpine@sha256:6a2f8b28e45c4adea04ec207a251fd4a2df03ddc930f782af51e315ebc76e9a9 as prod
COPY --from=build /build/public/ /usr/share/nginx/html/
EXPOSE 80