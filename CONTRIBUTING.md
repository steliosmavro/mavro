# Contributing

Thank you for your interest in contributing! This monorepo contains multiple apps and packages managed with [Turborepo](https://turborepo.com).

For project overview and quickstart, see [README.md](./README.md).

---

## 🛠️ Basic Commands

### Install Dependencies

```sh
nvm install
nvm use
npm install
```

### Run Locally

```sh
npm run dev
```

### Build

```sh
npm run build
```

### Lint Everything

```sh
npm run lint
```

> 💡 To run a command in a specific workspace, use the --workspace=\<name> flag.
> Example: npm run dev --workspace=mavrochat

---

## 🏗️ Adding New Apps or Packages

Each new package/app must include:

1. Its own `README.md`
2. Extend shared config packages. e.g., `@repo/typescript-config`, `@repo/eslint-config`
3. All public entrypoints must be explicitly listed in the `exports` field of `package.json`.  
   Do not rely on `tsconfig.json` path aliases for importing across packages — they are not respected by Node or bundlers.

> 💡 For details about a specific app or package, see its local `README.md` or `CONTRIBUTING.md` file, if available.

---

## ⚡ Remote Caching with Turborepo

To enable:

```sh
npx turbo login
```

---

## 📦 Dependency Management

To ensure consistent dependency versions across all apps and packages:

- We use [Syncpack](https://github.com/JamieMason/syncpack).
- All shared dependencies must use the exact same version.
- Ideally there should be only one node_modules in the root.

To check for mismatches:

```sh
npm run sync:check
```

To auto-fix them:

```sh
npm run sync:fix
```

> 💡 After major dependency updates, use `npm run clean:deep && npm install` to reset all package-lock files and node_modules across the monorepo.
