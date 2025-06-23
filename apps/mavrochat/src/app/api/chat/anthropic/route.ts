import { NextRequest } from 'next/server';
import { prepareMessages, errorResponse } from '../../../../lib/chatUtils';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    try {
        const { messages, apiKey, model, systemPrompt, temperature } =
            await req.json();
        if (!apiKey || !messages || !model) {
            return errorResponse('Missing required fields', 400);
        }
        const finalMessages = prepareMessages(messages, systemPrompt);
        const safeTemperature = Math.max(
            0,
            Math.min(2, typeof temperature === 'number' ? temperature : 1.0),
        );
        const anthropicRes = await fetch(
            'https://api.anthropic.com/v1/messages',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                    'anthropic-version': '2023-06-01',
                },
                body: JSON.stringify({
                    model,
                    messages: finalMessages,
                    stream: true,
                    max_tokens: 1024,
                    temperature: safeTemperature,
                }),
            },
        );

        if (!anthropicRes.ok || !anthropicRes.body) {
            const error = await anthropicRes.text();
            return errorResponse(error, anthropicRes.status);
        }

        return new Response(anthropicRes.body, {
            status: 200,
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                Connection: 'keep-alive',
            },
        });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        return errorResponse(message, 500);
    }
}
