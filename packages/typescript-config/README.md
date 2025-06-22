# @repo/typescript-config

Shared TypeScript config presets.

## 🔧 Usage

In your app, add @repo/typescript-config as a dependency:

```json
{
    "devDependencies": {
        "@repo/typescript-config": "*"
    }
}
```

In your `tsconfig.json`:

```json
{
    "extends": "@repo/typescript-config/nextjs.json"
}
```

## Presets

- `base.json`: Basic TS config
- `nextjs.json`: For Next.js apps
- `react-library.json`: For React packages

## 📚 More Info

- [Using shared TypeScript configs in Turborepo](https://turborepo.com/docs/guides/tools/typescript)
