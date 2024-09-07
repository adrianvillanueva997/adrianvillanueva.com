FROM golang:1.20.4-alpine3.16@sha256:6469405d7297f82d56195c90a3270b0806ef4bd897aa0628477d9959ab97a577 as build
WORKDIR /build
RUN apk add --no-cache hugo git
COPY . .
RUN hugo --minify

FROM nginx:1.27.1-alpine@sha256:a5127daff3d6f4606be3100a252419bfa84fd6ee5cd74d0feaca1a5068f97dcf as prod
COPY --from=build /build/public/ /usr/share/nginx/html/
EXPOSE 80