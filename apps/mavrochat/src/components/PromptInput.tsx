'use client';

import { useChat } from '@ai-sdk/react';
import { MessageInput } from './MessageInput';

export default function PromptInput() {
    const { messages } = useChat({ id: 'chat' });
    const hasMessages = messages.length > 0;

    /**
     * Keep the prompt input in a single fixed positioning context and animate the
     * `translateY` transform so the browser can interpolate intermediate values.
     * This avoids switching between `absolute` ↔ `sticky` which is not animatable.
     */

    const containerClasses = `fixed inset-x-0 bottom-6 w-full px-4 flex flex-col items-center gap-6 bg-background backdrop-blur-xs transition-transform duration-500 ease-in-out ${hasMessages ? 'translate-y-0' : '-translate-y-[50vh]'}`;

    return (
        <div className={containerClasses}>
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
