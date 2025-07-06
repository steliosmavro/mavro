# MavroChat

AI-powered chat application for developers with syntax highlighting, markdown support, and model selection.

## Features

- 🤖 Multiple AI model support (currently GPT-4o)
- 📝 Markdown rendering with syntax-highlighted code blocks
- 🎨 Dark/light theme support
- 💾 Chat history persistence
- 🚀 Real-time streaming responses
- 📋 One-click code copying

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev --workspace=mavrochat

# Run only this app
cd apps/mavrochat && npm run dev

# Build for production
npm run build --workspace=mavrochat
```

## Environment Variables

Create `.env.development` in the app root:

```env
# Required
OPENAI_API_KEY=your_openai_api_key

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── chat/         # Chat endpoint
│   ├── landing/          # Landing page
│   └── layout.tsx        # Root layout
├── components/            # React components
│   ├── ChatContainer.tsx # Main chat UI
│   ├── MessageInput.tsx  # Message input
│   └── CodeBlock.tsx     # Code rendering
├── context/              # React contexts
│   └── ModelContext.tsx  # AI model selection
├── hooks/                # Custom React hooks
└── lib/                  # Utilities & helpers
```

## API Routes

### POST /api/chat
Handles chat completions with streaming support.

**Request:**
```json
{
  "messages": [
    { "role": "user", "content": "Hello" }
  ],
  "model": "gpt-4o"
}
```

**Response:** Server-sent events stream

## Key Dependencies

- **Next.js 15** - React framework
- **OpenAI SDK** - AI integration
- **Vercel AI SDK** - Streaming utilities
- **@repo/ui** - Shared component library
- **Tailwind CSS** - Styling

## Development Tips

1. **Adding UI Components**: Use the shadcn CLI from this directory
   ```bash
   npx shadcn@latest add button card
   ```

2. **Testing API**: Use the built-in API route tester
   ```bash
   curl -X POST http://localhost:3000/api/chat \
     -H "Content-Type: application/json" \
     -d '{"messages": [{"role": "user", "content": "Hello"}]}'
   ```

3. **Type Safety**: All API inputs are validated with Zod schemas

## Deployment

The app is configured for Vercel deployment:

```bash
# Deploy to Vercel
vercel --cwd apps/mavrochat
```

See `next.config.ts` for production configuration.