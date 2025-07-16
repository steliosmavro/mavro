import { openai, createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { headers } from 'next/headers';

// Create default Anthropic instance (can be overridden with custom API key)
const defaultAnthropic = createAnthropic({
    apiKey: process.env.CLAUDE_API_KEY,
});

export const maxDuration = 30;

// Define the schema for request validation
const chatRequestSchema = z.object({
    messages: z
        .array(
            z.object({
                role: z.enum(['user', 'assistant', 'system']),
                content: z.string(),
            }),
        )
        .min(1, 'At least one message is required'),
});

// Define allowed models
const allowedModels = [
    'gpt-4o',
    'gpt-4o-mini',
    'gpt-3.5-turbo',
    'claude-3-5-sonnet-latest',
    'claude-3-5-haiku-latest',
] as const;
type AllowedModel = (typeof allowedModels)[number];

// Provider configuration
const defaultModelProviders = {
    'gpt-4o': openai,
    'gpt-4o-mini': openai,
    'gpt-3.5-turbo': openai,
    'claude-3-5-sonnet-latest': defaultAnthropic,
    'claude-3-5-haiku-latest': defaultAnthropic,
} as const;

function getModelProvider(model: AllowedModel, customApiKey?: string) {
    // If custom API key is provided, create a new provider instance
    if (customApiKey) {
        if (model.includes('claude')) {
            const customAnthropic = createAnthropic({
                apiKey: customApiKey,
            });
            return customAnthropic(model);
        } else if (model.includes('gpt') || model.includes('o1')) {
            const customOpenai = createOpenAI({
                apiKey: customApiKey,
            });
            return customOpenai(model);
        }
    }

    // Use default provider
    const provider = defaultModelProviders[model];
    return provider(model);
}

export async function POST(req: Request) {
    try {
        // Get custom API key from headers
        const headersList = await headers();
        const customApiKey = headersList.get('x-api-key') || undefined;

        // Skip rate limiting if custom API key is provided
        if (!customApiKey) {
            // Check rate limit using IP address
            const ipAddress =
                headersList.get('x-forwarded-for') ||
                headersList.get('x-real-ip') ||
                'anonymous';

            // TODO: When auth is implemented, determine tier based on user
            // For now, everyone is anonymous
            const userTier = 'anonymous'; // Will be: getUserTier(request)

            const { success, limit, reset, remaining } = await checkRateLimit(
                ipAddress,
                userTier,
            );

            if (!success) {
                const resetDate = new Date(reset);
                const msUntilReset = reset - Date.now();
                const hoursUntilReset = Math.ceil(
                    msUntilReset / (1000 * 60 * 60),
                );
                const secondsUntilReset = Math.ceil(msUntilReset / 1000);

                return NextResponse.json(
                    {
                        success: false,
                        error: {
                            code: 'RATE_LIMIT_EXCEEDED',
                            message:
                                secondsUntilReset < 60
                                    ? `You've reached your limit of ${limit} message. Try again in ${secondsUntilReset} seconds or bring your own API key for unlimited usage!`
                                    : `You've reached your daily limit of ${limit} messages. Come back in ${hoursUntilReset} hours or bring your own API key for unlimited usage!`,
                            details: {
                                limit,
                                reset: resetDate.toISOString(),
                                remaining,
                                resetIn: `${hoursUntilReset} hours`,
                            },
                        },
                    },
                    {
                        status: 429,
                        headers: {
                            'X-RateLimit-Limit': limit.toString(),
                            'X-RateLimit-Remaining': remaining.toString(),
                            'X-RateLimit-Reset': new Date(reset).toISOString(),
                        },
                    },
                );
            }
        }

        // Parse request body
        let body;
        try {
            body = await req.json();
        } catch (error) {
            console.error('Invalid JSON in request body:', error);
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        code: 'INVALID_JSON',
                        message: 'Invalid JSON in request body',
                    },
                },
                { status: 400 },
            );
        }

        // Validate request body
        const validationResult = chatRequestSchema.safeParse(body);
        if (!validationResult.success) {
            console.error('Validation error:', validationResult.error);
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'Invalid request format',
                        details: validationResult.error.errors,
                    },
                },
                { status: 400 },
            );
        }

        const { messages } = validationResult.data;

        // Validate and sanitize model selection
        const requestedModel = req.headers.get('x-model') ?? 'gpt-4o';

        const model: AllowedModel = allowedModels.includes(
            requestedModel as AllowedModel,
        )
            ? (requestedModel as AllowedModel)
            : 'gpt-4o';

        // Log the request (without sensitive data)
        console.log('Chat API request:', {
            model,
            messageCount: messages.length,
            usingCustomApiKey: !!customApiKey,
            timestamp: new Date().toISOString(),
        });

        // Create the stream
        const result = streamText({
            system: 'You are a helpful assistant. Respond to the user in Markdown format.',
            model: getModelProvider(model, customApiKey),
            messages,
            onFinish: ({ usage, finishReason }) => {
                // Log completion metrics
                console.log('Chat completion:', {
                    model,
                    usage,
                    finishReason,
                    timestamp: new Date().toISOString(),
                });
            },
        });

        return result.toDataStreamResponse();
    } catch (error) {
        // Log the error securely (don't expose internal details)
        console.error('Chat API error:', error);

        // Check if it's an OpenAI API error
        if (error instanceof Error) {
            if (error.message.includes('API key')) {
                return NextResponse.json(
                    {
                        success: false,
                        error: {
                            code: 'API_KEY_ERROR',
                            message:
                                'API configuration error. Please contact support.',
                        },
                    },
                    { status: 500 },
                );
            }

            if (error.message.includes('rate limit')) {
                return NextResponse.json(
                    {
                        success: false,
                        error: {
                            code: 'RATE_LIMIT',
                            message:
                                'Too many requests. Please try again later.',
                        },
                    },
                    { status: 429 },
                );
            }
        }

        // Generic error response (don't expose internal errors)
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'INTERNAL_ERROR',
                    message: 'An unexpected error occurred. Please try again.',
                },
            },
            { status: 500 },
        );
    }
}
