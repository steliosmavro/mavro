# Mavro Monorepo

A modern monorepo for full-stack applications and shared packages, powered by [Turborepo](https://turborepo.com/).

## What's inside?

- **MavroChat**: AI-powered chat application.
- **mavrodev**: Personal website and blog.
- **@repo/ui**: Shared React component library.
- **@repo/eslint-config** and **@repo/typescript-config**: Shared configuration for code quality and type safety.

## Architecture

- **Monorepo**: All apps and packages managed in a single repository.
- **Shared UI & Config**: Reusable components and configuration for consistency and speed.
- **TypeScript, ESLint, Prettier**: Modern tooling for quality and maintainability.

## Quickstart

```sh
nvm install
nvm use
npm install
npm run dev
# or to run a specific app:
npm run dev --workspace=mavrochat
```

## Remote Caching

This repo uses [Turborepo Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) for faster builds.
To enable, run:

```sh
npx turbo login
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for advanced workflows, adding packages, and more.
