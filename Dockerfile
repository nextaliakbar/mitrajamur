# Install dependencies only when needed
FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen

# Rebuild the source code only when needed
FROM node:16-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN yarn build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 ecmmjigroup
RUN adduser --system --uid 1001 ecmjiuser

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=ecmjiuser:ecmmjigroup /app/.next/standalone ./
COPY --from=builder --chown=ecmjiuser:ecmmjigroup /app/.next/static ./.next/static

USER ecmjiuser

# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]