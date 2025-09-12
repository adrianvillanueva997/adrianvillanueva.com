# Base stage for shared settings
FROM node:23.9.0-alpine AS base
ENV NEXT_TELEMETRY_DISABLED=1

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat curl bash make
COPY package.json yarn.lock .yarnrc.yml ./
# Install dependencies
RUN yarn install --frozen-lockfile

# Builder stage
FROM base AS builder
WORKDIR /app

RUN apk add --no-cache curl bash make

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/.yarnrc.yml ./

RUN  curl -fsSL https://d2lang.com/install.sh -o /tmp/d2install.sh \
    && sh /tmp/d2install.sh \
    && rm /tmp/d2install.sh

COPY data/diagrams ./data/diagrams
RUN mkdir -p public/static/diagrams \
    && for f in data/diagrams/*.d2; do \
    name=$(basename "${f%.d2}"); \
    d2 --theme 0 --dark-theme 200 "$f" "public/static/diagrams/${name}.svg"; \
    done


COPY . .
RUN yarn optimize_svgs
RUN yarn build

# Production image, copy all the files and run next
FROM node:23.9.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Add non root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    chown -R nextjs:nodejs /app

# Copy only necessary files
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Use non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
