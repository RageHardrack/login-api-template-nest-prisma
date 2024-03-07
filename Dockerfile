FROM node:20-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

# Create app directory
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

# Install app dependencies
RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:20-alpine AS prod

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD [ "pnpm", "run", "start:prod" ]