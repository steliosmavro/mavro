'use client';

import { useChat } from '@ai-sdk/react';
import { MessageInput } from './MessageInput';

export default function PromptInput() {
    const { messages } = useChat({ id: 'chat' });
    const hasMessages = messages.length > 0;

    return (
        <div
            className={
                hasMessages
                    ? 'w-full sticky bottom-6 bg-background backdrop-blur-xs transition-all duration-500 ease-in-out'
                    : 'absolute inset-0 flex flex-col items-center justify-center gap-6 transition-all duration-500 ease-in-out'
            }
        >
            {!hasMessages && (
                <h2 className="text-3xl font-semibold text-center mb-4">
                    What do you want me to help you with?
                </h2>
            )}
            <div className="w-full max-w-3xl mx-auto">
                <MessageInput />
            </div>
        </div>
    );
}
