import React from 'react';
import { ChatContainer } from '../components/ChatContainer';
import PromptInput from '../components/PromptInput';

export default function Page() {
    return (
        <main className="flex flex-col flex-1">
            <ChatContainer className="max-w-3xl mx-auto pt-4" />
            <PromptInput />
        </main>
    );
}
