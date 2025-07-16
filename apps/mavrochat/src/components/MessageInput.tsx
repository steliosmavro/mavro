'use client';

import React from 'react';
import { useChat } from '@ai-sdk/react';
import { Textarea } from '@repo/ui/components';
import { useModel } from '../context/ModelContext';
import { useApiTokenContext } from '../context/ApiTokenContext';
import { getChatHeaders } from '../lib/chat-utils';

export function MessageInput() {
    const { model } = useModel();
    const { getTokenForModel } = useApiTokenContext();

    const apiToken = getTokenForModel(model);
    const headers = getChatHeaders(model, apiToken);

    // Destructure additional helpers from `useChat` to control the stream state.
    // `status` tells us if a generation is in progress, while `stop` aborts it.
    const {
        input,
        handleSubmit: baseHandleSubmit,
        handleInputChange,
        status,
        stop,
    } = useChat({
        id: 'chat',
        headers,
    });

    // Wrapper that aborts any ongoing generation before dispatching the new prompt.
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // If a response is currently being generated, abort it immediately.
        if (status === 'submitted' || status === 'streaming') {
            stop();
        }

        baseHandleSubmit(e);
    };

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
                aria-label="Message input"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="resize-none min-h-0 max-h-96 p-4"
                rows={1}
            />
        </form>
    );
}
