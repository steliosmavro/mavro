import React from 'react';
import { ChatContainer } from '../components/ChatContainer';
import { MessageInput } from '../components/MessageInput';

export default function Page() {
    return (
        <main className="flex flex-col flex-1 w-full max-w-3xl mx-auto h-full">
            <ChatContainer />
            <div className="w-full sticky bottom-6 backdrop-blur">
                <MessageInput />
            </div>
        </main>
    );
}
