FROM oven/bun:1.3.12-debian as BASE
RUN apt-get update && apt-get install --no-install-recommends curl make ca-certificates -y

RUN curl -fsSL https://d2lang.com/install.sh -o /tmp/d2install.sh && \
    sh /tmp/d2install.sh && \
    rm /tmp/d2install.sh

WORKDIR /app

COPY package.json bun.lock ./

# 5. Install with increased memory
RUN bun install --frozen-lockfile --production
COPY . .
RUN bun run build

RUN find /app/dist -type f -name "*.svg" -exec chmod 644 {} \;

FROM nginx:1.29-bookworm AS production
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
