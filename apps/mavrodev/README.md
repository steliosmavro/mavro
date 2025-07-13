# MavroDev

Personal portfolio and blog site with MDX support.

## Features

- 📝 MDX blog with syntax highlighting
- 🎨 Responsive portfolio showcase
- 📧 Contact form integration
- 🌓 Dark/light theme support
- 📱 Mobile-first design
- 🚀 Optimized performance
- 💬 AI-powered chat assistant
- 📅 Google Calendar integration for meeting scheduling

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
title: 'My First Post'
date: '2024-01-01'
description: 'Introduction to my blog'
tags: ['react', 'nextjs']
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

Create `.env.local` file:

```env
# Required for AI Chat
OPENAI_API_KEY=sk-your_openai_api_key

# Required for Contact Form
RESEND_API_KEY=re_your_api_key
CONTACT_EMAIL=your-email@domain.com

# Required for Calendar Integration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REFRESH_TOKEN=your_google_refresh_token

# Optional Analytics
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

### Google Calendar Setup

To enable calendar scheduling in the AI chat:

1. **Create Google Cloud Project:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable Google Calendar API

2. **Create OAuth Credentials:**
   - Go to APIs & Services → Credentials
   - Create Credentials → OAuth client ID
   - Application type: **Web application**
   - Add authorized redirect URI: `http://localhost:3000/callback`
   - Save the credentials

3. **Get your refresh token:**
   ```bash
   # From the root directory, run:
   npm run setup:calendar
   
   # This will open your browser for authentication
   # After signing in, you'll see the environment variables to copy
   ```

4. **Add to your .env file:**
   ```env
   GOOGLE_CLIENT_ID=your_client_id_here
   GOOGLE_CLIENT_SECRET=your_client_secret_here
   GOOGLE_REFRESH_TOKEN=your_refresh_token_here
   ```

5. **Deploy to Vercel:**
   - Add the same environment variables to your Vercel project
   - No JSON files needed - everything works with env vars!

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
