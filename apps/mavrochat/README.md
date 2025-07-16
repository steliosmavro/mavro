# MavroChat

AI-powered chat application for developers with syntax highlighting, markdown support, and model selection.

## Features

- 🤖 Multiple AI model support (GPT-4, GPT-3.5, Claude 3.5)
- 🔑 Bring Your Own API Key (BYOK) support
- 📝 Markdown rendering with syntax-highlighted code blocks
- 🎨 Dark/light theme support
- 💾 Chat history persistence
- 🚀 Real-time streaming responses
- 📋 One-click code copying
- 🚦 No rate limits with your own API keys

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
# Required (for server-side API keys)
OPENAI_API_KEY=your_openai_api_key
CLAUDE_API_KEY=your_claude_api_key

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Rate limiting (optional)
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

## API Keys & Authentication

### Using Your Own API Keys

MavroChat supports bringing your own API keys (BYOK) to bypass rate limits:

1. Click the key icon next to the model selector
2. Enter your API key for the provider you want to use:
   - **OpenAI**: Get your key from [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
   - **Anthropic**: Get your key from [console.anthropic.com/api-keys](https://console.anthropic.com/api-keys)
3. Your keys are stored locally in your browser and never sent to our servers
4. With your own API key, you have unlimited usage

### Rate Limits

- **Without API key**: 10 messages per day
- **With your own API key**: Unlimited messages

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
│   ├── CodeBlock.tsx     # Code rendering
│   └── ApiTokenIndicator.tsx # API key management
├── context/              # React contexts
│   ├── ModelContext.tsx  # AI model selection
│   └── ApiTokenContext.tsx # API token management
├── hooks/                # Custom React hooks
│   └── useApiTokens.ts   # Local storage for tokens
└── lib/                  # Utilities & helpers
    └── rate-limit.ts     # Rate limiting logic
```

## API Routes

### POST /api/chat

Handles chat completions with streaming support.

**Request Headers:**
- `x-model`: AI model to use (e.g., "gpt-4o", "claude-3-5-sonnet-latest")
- `x-api-key`: (Optional) Your own API key to bypass rate limits

**Request Body:**

```json
{
    "messages": [{ "role": "user", "content": "Hello" }]
}
```

**Response:** Server-sent events stream

**Rate Limiting:**
- Requests without `x-api-key` header are rate-limited
- Requests with valid `x-api-key` bypass all rate limits

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
