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

### Lint

```sh
npm run lint
```

### Build

```sh
npm run build
```

> 💡 To run a command in a specific workspace, use the --workspace=\<name> flag.
> Example: npm run dev --workspace=mavrochat

---

## 🤖 CI/CD

Linting, type-checking, dependency version consistency, and builds are automatically enforced by pre-commit hooks and GitHub Actions. You usually don't need to run them manually.

---

## 🏗️ Adding New Apps or Packages

When adding a new app or package, follow these conventions:

1. Include its own `README.md`
2. Extend shared config packages. e.g., `@repo/typescript-config`, `@repo/eslint-config`
3. List all public entrypoints in the `exports` field of `package.json`.  
   Do not rely on `tsconfig.json` path aliases for importing across packages - they are not respected by Node or bundlers.
4. A a `"check-types": "tsc --noEmit"` script in `package.json`, to ensure the package participates in [Turborepo's type checking](https://turborepo.com/docs/guides/tools/typescript#linting-your-codebase).

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
- All apps & packages must use the exact same version.
- Syncpack does not keep track of transitive dependencies, it's ok.

To check for mismatches:

```sh
npm run sync:check
```

To auto-fix them:

```sh
npm run sync:fix
```

> 💡 After major dependency updates, use `npm run clean && npm install` to reset all package-lock files and node_modules across the monorepo.

---

## ✅ Commit Messages

This repo uses [Conventional Commits](https://www.conventionalcommits.org/) to enforce consistent commit message formatting.

### Format

```
<type>(<scope>): <short summary>
```

### Example

```
feat(ui): add dark mode toggle
```

> ℹ️ All commits are validated via Husky + commitlint before they are allowed. If your commit doesn't follow the format, it will be rejected.
