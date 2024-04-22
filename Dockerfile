FROM golang:1.20.4-alpine3.16@sha256:6469405d7297f82d56195c90a3270b0806ef4bd897aa0628477d9959ab97a577 as build
WORKDIR /build
RUN apk add --no-cache hugo git
COPY . .
RUN hugo --minify

FROM nginx:1.25.5-alpine@sha256:7bd88800d8c18d4f73feeee25e04fcdbeecfc5e0a2b7254a90f4816bb67beadd as prod
COPY --from=build /build/public/ /usr/share/nginx/html/
EXPOSE 80