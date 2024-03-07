# Login / Register API Template

## Stack

- NestJS
- Prisma
- Jest
- Swagger

## Description

Template to reuse code in the creation of API for Login / Register workflow, using Prisma as ORM and easy to config a DB (MySQL, PostgreSQL, MongoDB, etc).

## Environment Variables

| Name           | Description                                                                                             | Required |
| -------------- | ------------------------------------------------------------------------------------------------------- | -------- |
| `PORT`         | Expose PORT, by default is 3000                                                                         | NO       |
| `DATABASE_URL` | URL to connect with the DB. Can be another Docker container or an external DB service, such as Supabase | YES      |

### NOTE: Please change the DB Provider in the Prisma file and set the correct `DATABASE_URL` with the actual DB engine

## Installation

This app use `pnpm` as package manager.

```bash
pnpm install
```

## Running the app

```bash
# development
pnpm run start

# watch mode
pnpm run start:dev

# production mode
pnpm run start:prod
```

## Test

```bash
# unit tests
pnpm run test

# e2e tests
pnpm run test:e2e

# test coverage
pnpm run test:cov
```

## Create Docker Image

```bash
docker build -t login-template-nest-prisma:latest .
```
