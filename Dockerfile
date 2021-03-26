# Multistage builder image
# Builder -> executable
# Builder stage
FROM golang:1.16-alpine as build-env
WORKDIR /build
COPY . .
RUN go mod download
RUN go build -o app .
# Executable stage
FROM alpine:3.13.3 as production
WORKDIR /app
ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GIN_MODE=release
COPY --from=build-env /build/app .
COPY --from=build-env /build/templates ./templates
COPY --from=build-env /build/src/markdown ./src/markdown
COPY --from=build-env /build/assets ./assets
COPY --from=build-env /build/public ./public
COPY --from=build-env /build/styles ./styles 
EXPOSE 3000
RUN adduser -D appuser && chown -R appuser:appuser /app && chmod 755 /app
USER appuser
ENTRYPOINT ./app
