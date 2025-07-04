import React from 'react';
import { ChatContainer } from '../components/ChatContainer';
import { MessageInput } from '../components/MessageInput';

export default function Page() {
    return (
        <main className="flex flex-col flex-1">
            <ChatContainer className="max-w-3xl mx-auto pt-4" />
            {/* add shadow */}
            <div className="w-full max-w-3xl mx-auto sticky bottom-6 bg-background backdrop-blur-xs">
                <MessageInput />
            </div>
        </main>
    );
}
