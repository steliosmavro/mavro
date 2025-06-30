import { NextRequest } from 'next/server';
import { prepareMessages, errorResponse } from '../../../../lib/chatUtils';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();
        if (!messages) {
            return errorResponse('Missing required fields', 400);
        }
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return errorResponse('OpenAI API key not set in environment', 500);
        }
        const finalMessages = prepareMessages(messages);
        const openaiRes = await fetch(
            'https://api.openai.com/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: finalMessages,
                    stream: true,
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
