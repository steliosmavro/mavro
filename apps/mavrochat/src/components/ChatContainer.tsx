'use client';

import { useChat } from '@ai-sdk/react';
import { MemoizedMarkdown } from './memoized-markdown';
import { defaultMessages } from '../lib/defaultMessages';
import { useHighlightTheme } from '../hooks/useHighlightTheme';
import { Card, CardContent } from '@repo/ui/components/Card';

export function ChatContainer() {
    useHighlightTheme();

    const renderPart = (
        messageId: string,
        part: { type: string; text?: string; toolInvocation?: unknown },
        index: number,
    ) => {
        switch (part.type) {
            case 'text':
                return (
                    <MemoizedMarkdown
                        key={`${messageId}-${index}`}
                        id={`${messageId}-${index}`}
                        content={part.text ?? ''}
                    />
                );
            case 'tool-invocation':
                return (
                    <pre key={`${messageId}-${index}`}>
                        {JSON.stringify(part.toolInvocation, null, 2)}
                    </pre>
                );
            default:
                return null;
        }
    };

    const { messages } = useChat({
        id: 'chat',
        maxSteps: 5,
        experimental_throttle: 50,
    });
    const displayMessages =
        process.env.NEXT_PUBLIC_ENVIRONMENT === 'development'
            ? defaultMessages
            : messages;

    return (
        <div className="flex-1 flex flex-col gap-16 pt-8 pb-24 w-full">
            {displayMessages.map((message) => {
                const isUser = message.role === 'user';
                const alignmentClass = isUser ? 'self-end' : 'self-start';

                if (isUser) {
                    return (
                        <Card
                            key={message.id}
                            className={`bg-secondary ml-24 ${alignmentClass}`}
                        >
                            <CardContent>
                                {message.parts.map((part, i) =>
                                    renderPart(message.id, part, i),
                                )}
                            </CardContent>
                        </Card>
                    );
                } else {
                    return (
                        <div
                            key={message.id}
                            className={`markdown-content ${alignmentClass}`}
                        >
                            {message.parts.map((part, i) =>
                                renderPart(message.id, part, i),
                            )}
                        </div>
                    );
                }
            })}
        </div>
    );
}
