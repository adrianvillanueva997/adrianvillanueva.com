FROM node:18.2.0-alpine as base

FROM base as builder
# Building container
WORKDIR /build
COPY package.json .
COPY package-lock.json .
RUN npm install -g npm && npm i --force
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /build/public ./public
COPY --from=builder --chown=nextjs:nodejs /build/.next ./.next
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/package.json ./package.json

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]
