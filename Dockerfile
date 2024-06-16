FROM node:20.14.0-alpine3.20 AS builder

WORKDIR /app

COPY ./package.json ./pnpm-lock.yaml ./

RUN ["corepack", "enable"]
RUN ["pnpm", "install"]

COPY . .

RUN ["pnpm", "run", "build"]
RUN ["pnpm", "prune", "--prod"]

FROM node:20.14.0-alpine3.20 AS runner

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

ENTRYPOINT ["node", "./dist/index.js"]
