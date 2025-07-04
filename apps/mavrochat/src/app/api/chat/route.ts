import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();
    const requestedModel = req.headers.get('x-model') ?? 'gpt-4o';

    const result = streamText({
        system: 'You are a helpful assistant. Respond to the user in Markdown format.',
        model: openai(requestedModel),
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
                    const temperature = Math.round(
                        Math.random() * (90 - 32) + 32,
                    );
                    return {
                        location,
                        temperature,
                    };
                },
            }),
            convertFahrenheitToCelsius: tool({
                description: 'Convert a temperature in fahrenheit to celsius',
                parameters: z.object({
                    temperature: z
                        .number()
                        .describe('The temperature in fahrenheit to convert'),
                }),
                execute: async ({ temperature }) => {
                    const celsius = Math.round((temperature - 32) * (5 / 9));
                    return {
                        celsius,
                    };
                },
            }),
        },
    });

    return result.toDataStreamResponse();
}
