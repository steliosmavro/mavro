# Architecture Overview

This monorepo contains two main applications and shared packages built with modern web technologies.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Monorepo**: Turborepo
- **Package Manager**: npm workspaces
- **AI Integration**: Vercel AI SDK with OpenAI

## Repository Structure

```
mavro/
├── apps/
│   ├── mavrochat/          # AI-powered chat application
│   └── mavrodev/           # Developer portfolio site
├── packages/
│   ├── ui/                 # Shared UI components
│   ├── shared-config/      # Shared configuration
│   ├── eslint-config/      # ESLint configuration
│   └── typescript-config/  # TypeScript configuration
└── docs/                   # Documentation
```

## Applications

### MavroChat (`apps/mavrochat`)

An AI-powered chat platform for developers with features including:

- Multiple AI model support (GPT-4o, GPT-4o-mini, GPT-3.5-turbo)
- Real-time streaming responses
- Code syntax highlighting
- Rate limiting (20 requests/minute)
- Tool integration capabilities

### MavroDev (`apps/mavrodev`)

A developer portfolio and blog site featuring:

- Project showcase
- Technical blog with MDX support
- Resume generation
- Contact form
- Responsive design with animations

## Shared Packages

### UI Package (`packages/ui`)

Centralized UI components based on shadcn/ui:

- Reusable components (Button, Card, Badge, etc.)
- Theme provider and toggle
- Consistent styling across apps
- Accessibility-first design

### Shared Config (`packages/shared-config`)

Common configuration including:

- Font settings (Geist fonts)
- Social media links
- SEO defaults
- Security headers
- Theme configuration

## Key Design Patterns

### Component Architecture

- **Smart Components**: Handle state and business logic (found in apps)
- **Pure Components**: Stateless, props-only UI components (found in packages/ui)
- Maximum function size: ~20 lines
- Maximum nesting: 3 levels

### Data Flow

1. **Resume Data**: Centralized in `apps/mavrodev/src/data/resume.ts` as single source of truth
2. **API Routes**: All routes include Zod validation and comprehensive error handling
3. **Rate Limiting**: Implemented using Upstash Redis (production) with in-memory fallback (development)

### Security

- Security headers applied to all routes
- Input validation on all API endpoints
- Rate limiting to prevent abuse
- Environment variable validation

## Development Workflow

### Commands

```bash
npm run dev          # Start all apps in development
npm run build        # Build all apps and packages
npm run lint         # Run ESLint across the monorepo
npm run check-types  # TypeScript type checking
npm run sync:check   # Check dependency synchronization
```

### Environment Variables

Required environment variables:

- `OPENAI_API_KEY`: For AI chat functionality
- `UPSTASH_REDIS_REST_URL`: Redis URL for rate limiting (optional)
- `UPSTASH_REDIS_REST_TOKEN`: Redis token for rate limiting (optional)

### Code Standards

- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Write tests for new features (target: 80% coverage)
- Use conventional commits
- Document complex logic with comments

## Deployment

Both applications are designed to be deployed on Vercel with:

- Automatic preview deployments
- Environment variable management
- Edge function support
- Built-in analytics

## Performance Considerations

- Lazy loading for routes
- React.memo for expensive components
- Image optimization with Next.js Image
- Font optimization with next/font
- Minimal bundle size through tree shaking

## Future Considerations

- Implement comprehensive test suite
- Add performance monitoring
- Enhance accessibility features
- Create shared hooks package
- Add API documentation with OpenAPI
