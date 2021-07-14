# Multistage builder image
# Builder -> executable
# Builder stage
FROM golang:1.16.6-alpine as build-env
RUN apk add --no-cache make
WORKDIR /build
COPY . .
RUN make init
RUN make build
# Executable stage
FROM alpine:3.14.0 as production
WORKDIR /app
ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GIN_MODE=release
COPY --from=build-env /build/app .
COPY --from=build-env /build/src/markdown ./src/markdown
COPY --from=build-env /build/assets ./assets
COPY --from=build-env /build/styles ./styles
COPY --from=build-env /build/scripts ./scripts
COPY --from=build-env /build/public ./public
EXPOSE 3000
RUN adduser -D appuser && chown -R appuser:appuser /app && chmod 755 /app
USER appuser
ENTRYPOINT ./app
