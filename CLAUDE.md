# CLAUDE.md - Project Context for Claude

## Project Overview

Monorepo containing:

- **mavrochat**: AI-powered chat platform for developers
- **mavrodev**: Developer portfolio/blog site

## Key Architecture Rules

- Apps in `apps/`, shared code in `packages/`
- Use `"@repo/ui": "workspace:*"` for internal deps
- **Smart Components**: Handle state, orchestrate (Pages)
- **Pure Components**: Stateless, props only (UI)
- Install deps in the specific app/package that uses them

## Coding Standards

- TypeScript: camelCase variables, PascalCase components/types
- Arrow functions for callbacks/one-liners, function declarations for complex logic
- Validate all API inputs with Zod
- Use lodash when available
- Prefer functional programming (immutability, pure functions)
- Max function size: ~20 lines, max nesting: 3 levels
- **Comments**: Avoid unless necessary. Use only for complex logic or to separate sections in large files. Code should be self-explanatory

## Must Follow

1. **Testing**: All new code needs tests. Min 80% coverage.
2. **Tailwind CSS**: Use for all styling
3. **Error Handling**: Never expose internal errors to users
4. **Security**: Never log passwords/tokens, validate all inputs
5. **Commits**: Use conventional commits: `type(scope): message`
6. **Performance**: Lazy load routes, use React.memo for expensive components
7. **State**: Context for global, local state when possible, avoid prop drilling >3 levels

## Project-Specific Patterns

```typescript
// API Response Format
{
  success: boolean,
  data?: any,
  error?: {
    code: string,
    message: string,
    details?: any[]
  }
}

// Error Handling
try {
  const data = await fetchData();
  return NextResponse.json({ success: true, data });
} catch (error) {
  logger.error({ error, context });
  return NextResponse.json({
    success: false,
    error: { code: 'ERROR_CODE', message: 'User-friendly message' }
  });
}
```

## Commands

```bash
npm run dev          # Start all apps
npm run build        # Build all
npm run lint         # Lint check
npm run check-types  # Type check
npm run test         # Run tests
npm run sync:check   # Check dep sync
```

## Important Files

- See `CONTRIBUTING.md` for workflows
- Check `.cursor/rules/` for detailed guidelines
- Use `turbo.json` for build config

## Package-Specific Docs

- **UI Components**: See `packages/ui/README.md` for adding shadcn components
- **Apps**: Check individual app READMEs for app-specific setup

## AI Instructions

1. Check existing patterns before implementing
2. Maintain consistency with codebase
3. Consider performance and security always
4. Write clear, self-documenting code
5. Update tests and docs with changes
6. Ask if uncertain about patterns

---

Last Updated: 2025-01-07
