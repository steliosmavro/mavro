# @repo/eslint-config

Shared ESLint configuration for all apps and packages.

## 🔧 Usage

In your app, add @repo/eslint-config as a dependency:

```json
{
    "devDependencies": {
        "@repo/eslint-config": "*"
    }
}
```

In your Next.js `eslint.config.js`:

```js
import { nextJsConfig } from '@repo/eslint-config/next-js';

export default [...nextJsConfig];
```

## 📁 Configs

- `base.js`: Base config
- `next.js`: Next.js apps
- `react-internal.js`: React packages

## 📚 More Info

- [Using shared ESLint configs in Turborepo](https://turborepo.com/docs/guides/tools/eslint)
