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
        const openaiRes = await fetch(
            'https://api.openai.com/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model,
                    messages: finalMessages,
                    stream: true,
                    temperature: safeTemperature,
                }),
            },
        );

        if (!openaiRes.ok || !openaiRes.body) {
            const error = await openaiRes.text();
            return errorResponse(error, openaiRes.status);
        }

        return new Response(openaiRes.body, {
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
