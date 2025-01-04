FROM node:20-alpine AS deps
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build