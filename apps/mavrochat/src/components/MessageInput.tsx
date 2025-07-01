'use client';

import React from 'react';
import { useChat } from '@ai-sdk/react';
import { Textarea } from '@repo/ui/components/Textarea';

export function MessageInput() {
    const { input, handleSubmit, handleInputChange } = useChat({ id: 'chat' });

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const form = e.currentTarget.form;
            if (form) {
                form.requestSubmit();
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <Textarea
                placeholder="Ask anything"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="resize-none min-h-0 max-h-96 p-4"
                rows={1}
            />
        </form>
    );
}
