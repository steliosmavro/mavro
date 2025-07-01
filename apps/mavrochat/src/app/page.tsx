import React from 'react';
import { ThemeToggle } from '@repo/ui/components/ThemeToggle';
import { ChatContainer } from '../components/ChatContainer';
import { MessageInput } from '../components/MessageInput';

export default function Page() {
    return (
        <main className="flex-1 flex flex-col w-full overflow-y-auto relative">
            <div className="fixed top-4 right-6 z-50">
                <ThemeToggle />
            </div>

            <ChatContainer />

            <div className="w-full max-w-3xl mx-auto sticky bottom-6 backdrop-blur">
                <MessageInput />
            </div>
        </main>
    );
}
