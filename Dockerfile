FROM node:24.4.0-bookworm-slim AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN apt-get update && apt-get install --no-install-recommends curl make ca-certificates golang git -y

RUN go install oss.terrastruct.com/d2@latest && \
    cp /root/go/bin/d2 /usr/local/bin/d2

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

# Fix permissions on D2 generated SVG files
RUN find /app/dist -type f -name "*.svg" -exec chmod 644 {} \;

FROM nginx:1.29-bookworm AS production

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]