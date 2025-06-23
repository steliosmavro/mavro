'use client';
import { Card } from '@repo/ui/components/card';
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from '@repo/ui/components/avatar';
import { useEffect, useRef } from 'react';
import { useChat } from '../context/ChatContext';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

export default function ChatArea() {
    const { messages } = useChat();
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <main className="flex-1 flex flex-col overflow-y-auto p-6 bg-background">
            <Card className="w-full max-w-2xl mx-auto p-6 min-h-[60vh]">
                {messages.length === 0 ? (
                    <div className="text-center text-muted-foreground">
                        No messages yet.
                    </div>
                ) : (
                    messages.map((msg, i) => (
                        <div key={i} className="flex gap-3 mb-6 items-start">
                            <Avatar>
                                {msg.role === 'user' ? (
                                    <AvatarFallback>U</AvatarFallback>
                                ) : (
                                    <AvatarImage
                                        src="/assistant-avatar.png"
                                        alt="A"
                                    />
                                )}
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-sm">
                                        {msg.role === 'user'
                                            ? 'You'
                                            : 'Assistant'}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {new Date().toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </span>
                                </div>
                                <div className="prose prose-neutral max-w-none">
                                    {msg.role === 'assistant' ? (
                                        <ReactMarkdown
                                            rehypePlugins={[rehypeHighlight]}
                                        >
                                            {msg.content}
                                        </ReactMarkdown>
                                    ) : (
                                        msg.content
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
                <div ref={bottomRef} />
            </Card>
        </main>
    );
}
