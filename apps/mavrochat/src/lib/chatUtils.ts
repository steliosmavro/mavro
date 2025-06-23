import type { ChatMessage } from '../context/ChatContext';

type AnyChatMessage = ChatMessage | { role: 'system'; content: string };

// Utility to prepare messages with optional system prompt
export function prepareMessages(
    messages: AnyChatMessage[],
    systemPrompt?: string,
) {
    if (
        systemPrompt &&
        typeof systemPrompt === 'string' &&
        systemPrompt.trim()
    ) {
        return [
            { role: 'system', content: systemPrompt },
            ...messages.filter((m) => m.role !== 'system'),
        ];
    }
    return messages;
}

// Utility to return a formatted error response
export function errorResponse(message: string, status = 500) {
    return new Response(JSON.stringify({ error: message }), { status });
}
