'use client';
import React from 'react';

import { useChat } from '@ai-sdk/react';
import { MemoizedMarkdown } from '../components/memoized-markdown';
import { Input } from '@repo/ui/components/Input';
import { ThemeToggle } from '@repo/ui/components/ThemeToggle';
import { defaultMessages } from '../lib/defaultMessages';

export default function Page() {
    const { messages } = useChat({
        id: 'chat',
        maxSteps: 5,
        // Throttle the messages and data updates to 50ms:
        experimental_throttle: 50,
    });

    // Use default messages if no messages from chat
    const displayMessages = messages.length > 0 ? messages : defaultMessages;

    return (
        <>
            <main className="flex-1 flex flex-col w-full overflow-y-auto">
                <div className="fixed top-4 right-6 z-50">
                    <ThemeToggle />
                </div>

                <div className="flex-1">
                    <div className="w-full max-w-xl mx-auto px-4 py-4 space-y-8">
                        {displayMessages.map((message) => (
                            <div key={message.id}>
                                <div className="font-bold mb-2">
                                    {message.role === 'user'
                                        ? 'You'
                                        : 'Assistant'}
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
                                                    <pre
                                                        key={`${message.id}-${i}`}
                                                    >
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
            </main>
            <footer className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="w-full max-w-xl mx-auto p-4">
                    <MessageInput />
                </div>
            </footer>
        </>
    );
}

const MessageInput = () => {
    const { input, handleSubmit, handleInputChange } = useChat({ id: 'chat' });
    return (
        <form onSubmit={handleSubmit} className="w-full">
            <Input
                placeholder="Say something..."
                value={input}
                onChange={handleInputChange}
                className="flex-1"
            />
        </form>
    );
};
