# API Documentation

## Overview

The monorepo currently contains API endpoints in the MavroChat application for AI chat functionality.

## Base URL

- Development: `http://localhost:3000`
- Production: `https://your-domain.com`

## Authentication

Currently, the API uses IP-based rate limiting without authentication. Future versions may include API key authentication.

## Rate Limiting

All API endpoints are rate limited to prevent abuse:

- **Limit**: 20 requests per minute per IP address
- **Headers**: Rate limit information is included in response headers
    - `X-RateLimit-Limit`: Total requests allowed
    - `X-RateLimit-Remaining`: Requests remaining
    - `X-RateLimit-Reset`: ISO 8601 timestamp when the limit resets

## Endpoints

### POST /api/chat

Stream chat completions from AI models.

#### Request

```typescript
{
    messages: Array<{
        role: 'user' | 'assistant' | 'system';
        content: string;
    }>;
}
```

#### Headers

- `Content-Type: application/json`

#### Response

Returns a streaming response with AI-generated content.

**Success Response (200 OK)**

- Streaming text response
- Uses Server-Sent Events for real-time updates

**Error Responses**

- **400 Bad Request**

    ```json
    {
        "success": false,
        "error": {
            "code": "INVALID_JSON",
            "message": "Invalid JSON in request body"
        }
    }
    ```

- **400 Bad Request** (Validation Error)

    ```json
    {
        "success": false,
        "error": {
            "code": "VALIDATION_ERROR",
            "message": "Invalid request data",
            "details": [
                {
                    "field": "messages",
                    "message": "At least one message is required"
                }
            ]
        }
    }
    ```

- **429 Too Many Requests**

    ```json
    {
        "success": false,
        "error": {
            "code": "RATE_LIMIT_EXCEEDED",
            "message": "Too many requests, please try again later",
            "details": {
                "limit": 20,
                "reset": "2024-01-01T00:00:00.000Z",
                "remaining": 0
            }
        }
    }
    ```

- **500 Internal Server Error**
    ```json
    {
        "success": false,
        "error": {
            "code": "INTERNAL_ERROR",
            "message": "An unexpected error occurred"
        }
    }
    ```

#### Example Request

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "role": "user",
        "content": "Hello, how are you?"
      }
    ]
  }'
```

#### Supported Models

The chat endpoint supports the following OpenAI models:

- `gpt-4o` (default)
- `gpt-4o-mini`
- `gpt-3.5-turbo`

Model selection is handled client-side through the application UI.

## Error Handling

All API endpoints follow a consistent error response format:

```typescript
{
  success: boolean
  error?: {
    code: string        // Machine-readable error code
    message: string     // Human-readable error message
    details?: any       // Additional error context
  }
}
```

## Development Tips

### Testing with cURL

```bash
# Basic chat request
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Test message"}]}'

# Test rate limiting
for i in {1..25}; do
  curl -X POST http://localhost:3000/api/chat \
    -H "Content-Type: application/json" \
    -d '{"messages":[{"role":"user","content":"Test '$i'"}]}'
done
```

### Environment Setup

For local development, create a `.env.local` file:

```env
OPENAI_API_KEY=your-api-key-here
UPSTASH_REDIS_REST_URL=your-redis-url (optional)
UPSTASH_REDIS_REST_TOKEN=your-redis-token (optional)
```

## Future Enhancements

1. **Authentication**: API key-based authentication
2. **Webhooks**: Event notifications for long-running operations
3. **Batch Processing**: Handle multiple chat requests in a single call
4. **Usage Analytics**: Track API usage per user/key
5. **Additional Endpoints**:
    - User management
    - Chat history
    - Model configuration
