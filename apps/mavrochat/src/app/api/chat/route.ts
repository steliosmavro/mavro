import { openai } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { headers } from 'next/headers';

// Create Anthropic instance with custom API key
const anthropic = createAnthropic({
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
const modelProviders = {
    'gpt-4o': openai,
    'gpt-4o-mini': openai,
    'gpt-3.5-turbo': openai,
    'claude-3-5-sonnet-latest': anthropic,
    'claude-3-5-haiku-latest': anthropic,
} as const;

function getModelProvider(model: AllowedModel) {
    const provider = modelProviders[model];
    return provider(model);
}

export async function POST(req: Request) {
    try {
        // Check rate limit using IP address
        const headersList = await headers();
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
            const hoursUntilReset = Math.ceil(
                (reset - Date.now()) / (1000 * 60 * 60),
            );

            return NextResponse.json(
                {
                    success: false,
                    error: {
                        code: 'RATE_LIMIT_EXCEEDED',
                        message: `You've reached your daily limit of ${limit} messages. Come back in ${hoursUntilReset} hours or check out the code on GitHub to run your own instance!`,
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
            timestamp: new Date().toISOString(),
        });

        // Create the stream
        const result = streamText({
            system: 'You are a helpful assistant. Respond to the user in Markdown format.',
            model: getModelProvider(model),
            messages,
            tools: {
                weather: tool({
                    description: 'Get the weather in a location (fahrenheit)',
                    parameters: z.object({
                        location: z
                            .string()
                            .describe('The location to get the weather for'),
                    }),
                    execute: async ({ location }) => {
                        try {
                            // In a real app, this would call a weather API
                            const temperature = Math.round(
                                Math.random() * (90 - 32) + 32,
                            );
                            return {
                                location,
                                temperature,
                            };
                        } catch (error) {
                            console.error('Weather tool error:', error);
                            throw new Error('Failed to get weather data');
                        }
                    },
                }),
                convertFahrenheitToCelsius: tool({
                    description:
                        'Convert a temperature in fahrenheit to celsius',
                    parameters: z.object({
                        temperature: z
                            .number()
                            .describe(
                                'The temperature in fahrenheit to convert',
                            ),
                    }),
                    execute: async ({ temperature }) => {
                        try {
                            const celsius = Math.round(
                                (temperature - 32) * (5 / 9),
                            );
                            return {
                                celsius,
                            };
                        } catch (error) {
                            console.error(
                                'Temperature conversion error:',
                                error,
                            );
                            throw new Error('Failed to convert temperature');
                        }
                    },
                }),
            },
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
