<<<<<<< HEAD
FROM node:18.7.0-alpine as base

FROM base as builder
# Building container
||||||| f9601d1
FROM node:18.4.0-alpine as base

FROM base as builder
# Building container
=======
FROM golang:1.18.3-alpine3.16 as build
>>>>>>> rework
WORKDIR /build
RUN apk add --no-cache hugo
COPY . .
RUN hugo --minify

FROM nginx:1.21.6-alpine as prod
COPY --from=build /build/public/ /usr/share/nginx/html/
EXPOSE 80