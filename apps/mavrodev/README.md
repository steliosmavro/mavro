# MavroDev

Personal portfolio and blog site with MDX support.

## Features

- 📝 MDX blog with syntax highlighting
- 🎨 Responsive portfolio showcase
- 📧 Contact form integration
- 🌓 Dark/light theme support
- 📱 Mobile-first design
- 🚀 Optimized performance

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev --workspace=mavrodev

# Run only this app
cd apps/mavrodev && npm run dev

# Build for production
npm run build --workspace=mavrodev
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── blog/              # Blog pages
│   │   ├── [slug]/       # Dynamic blog posts
│   │   └── page.tsx      # Blog listing
│   ├── projects/         # Portfolio projects
│   ├── contact/          # Contact page
│   └── layout.tsx        # Root layout
├── components/            # React components
│   └── RenderMdx.tsx     # MDX renderer
├── content/              # Content files
│   └── blog/             # Blog posts (*.mdx)
├── lib/                  # Utilities
│   └── getBlogPosts.ts   # Blog post loader
└── types/                # TypeScript types
    └── post.ts           # Blog post type
```

## Writing Blog Posts

Create MDX files in `src/content/blog/`:

```mdx
---
title: "My First Post"
date: "2024-01-01"
description: "Introduction to my blog"
tags: ["react", "nextjs"]
---

# Hello World

This is my first blog post using **MDX**.

\`\`\`tsx
const greeting = "Hello from code block!";
console.log(greeting);
\`\`\`
```

## Adding Projects

Projects are managed in `src/app/projects/page.tsx`. To add a new project:

1. Add project data to the projects array
2. Include relevant images in `public/`
3. Update with links to GitHub/live demo

## Customization

### Updating Personal Info

Edit the following files:
- `src/app/layout.tsx` - Site metadata
- `src/app/page.tsx` - Homepage content
- `public/resume.pdf` - Your resume

### Styling

The site uses Tailwind CSS and components from `@repo/ui`. To customize:

```css
/* In your component or globals.css */
.custom-class {
  @apply text-primary bg-secondary;
}
```

## Environment Variables

No environment variables required for basic operation. For contact form or analytics:

```env
# Optional
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
EMAIL_SERVICE_API_KEY=your_email_api_key
```

## Deployment

Optimized for Vercel deployment:

```bash
# Deploy to Vercel
vercel --cwd apps/mavrodev
```

## SEO Optimization

- Automatic sitemap generation
- Meta tags for social sharing
- Structured data for blog posts
- Image optimization with Next.js Image

## Key Dependencies

- **Next.js 15** - React framework
- **MDX** - Markdown with JSX
- **@repo/ui** - Shared component library
- **Tailwind CSS** - Styling
- **Lucide Icons** - Icon set