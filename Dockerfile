FROM node:24.4.0-bookworm-slim AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN apt-get update && apt-get install --no-install-recommends curl make ca-certificates -y

RUN curl -fsSL https://d2lang.com/install.sh -o /tmp/d2install.sh && \
    sh /tmp/d2install.sh && \
    rm /tmp/d2install.sh

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM nginx:1.29-bookworm AS production

RUN apt-get update && apt-get install --no-install-recommends curl make ca-certificates -y
RUN curl -fsSL https://d2lang.com/install.sh -o /tmp/d2install.sh && \
    sh /tmp/d2install.sh && \
    rm /tmp/d2install.sh

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]