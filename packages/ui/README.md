# @repo/ui

Shared React component library using `shadcn/ui`.

## 🚀 Usage

Install in your app:

```sh
npm i @repo/ui
```

Use in code:

```tsx
import { Button } from '@repo/ui';
```

## ✨ Adding Components with `shadcn/ui`

1. `cd apps/mavrochat` (or any app)
2. Run:
```sh
npx shadcn@latest add card input switch
```
3. Components will be placed in `packages/ui/src/components/`.

> Tip: Use `@repo/ui` for any reusable UI elements.

## 🧠 Development Notes

- Components must live in `src/components/`
- Styles go in `src/styles/globals.css`
- Follow `shadcn/ui` naming conventions
