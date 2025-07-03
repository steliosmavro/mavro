'use client';

import { useChat } from '@ai-sdk/react';
import { MemoizedMarkdown } from './memoized-markdown';
import { defaultMessages } from '../lib/defaultMessages';
import { useHighlightTheme } from '../hooks/useHighlightTheme';

export function ChatContainer() {
    useHighlightTheme();

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
        <div className="flex-1 pb-16">
            <div className="w-full max-w-3xl mx-auto px-4 py-4 space-y-8">
                {displayMessages.map((message) => (
                    <div key={message.id}>
                        <div className="font-bold mb-2">
                            {message.role === 'user' ? 'You' : 'Assistant'}
                        </div>
                        <div className="markdown-content">
                            {message.parts.map((part, i) => {
                                switch (part.type) {
                                    case 'text':
                                        return (
                                            <MemoizedMarkdown
                                                key={`${message.id}-${i}`}
                                                id={`${message.id}-${i}`}
                                                content={part.text}
                                            />
                                        );
                                    case 'tool-invocation':
                                        return (
                                            <pre key={`${message.id}-${i}`}>
                                                {JSON.stringify(
                                                    part.toolInvocation,
                                                    null,
                                                    2,
                                                )}
                                            </pre>
                                        );
                                    default:
                                        return null;
                                }
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
