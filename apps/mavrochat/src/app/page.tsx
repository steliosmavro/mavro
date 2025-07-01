'use client';
import React from 'react';

import { useChat } from '@ai-sdk/react';
import { MemoizedMarkdown } from '../components/memoized-markdown';

export default function Page() {
    const { messages } = useChat({
        id: 'chat',
        maxSteps: 5,
        // Throttle the messages and data updates to 50ms:
        experimental_throttle: 50,
    });

    return (
        <div className="flex flex-col w-full max-w-xl py-24 mx-auto stretch">
            <div className="space-y-8 mb-4">
                {messages.map((message) => (
                    <div key={message.id}>
                        <div className="font-bold mb-2">
                            {message.role === 'user' ? 'You' : 'Assistant'}
                        </div>
                        <div className="prose markdown-content space-y-2">
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
            <MessageInput />
        </div>
    );
}

const MessageInput = () => {
    const { input, handleSubmit, handleInputChange } = useChat({ id: 'chat' });
    return (
        <form onSubmit={handleSubmit}>
            <input
                className="fixed bottom-0 w-full max-w-xl p-2 mb-8 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
                placeholder="Say something..."
                value={input}
                onChange={handleInputChange}
            />
        </form>
    );
};
