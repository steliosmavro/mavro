'use client';

import { useChat } from 'ai/react';
import { useRef, useEffect } from 'react';
import { Button } from '@repo/ui/components';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { motion } from 'framer-motion';

const SUGGESTED_QUESTIONS = [
    "What's your experience with AI?",
    'Tell me about your open-source work',
    'What projects are you most proud of?',
    "What's your tech stack?",
];

export function PortfolioChat() {
    const { messages, input, handleInputChange, handleSubmit, isLoading } =
        useChat({
            api: '/api/chat',
            initialMessages: [
                {
                    id: 'welcome',
                    role: 'assistant',
                    content:
                        "Hey! I'm an AI assistant trained on Stelios's portfolio 🤖 I can tell you all about his experience as a Senior Full-Stack Engineer, his projects, and his expertise in AI and developer tools. What would you like to know?",
                },
            ],
        });

    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop =
                scrollAreaRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSuggestedQuestion = (question: string) => {
        handleInputChange({
            target: { value: question },
        } as React.ChangeEvent<HTMLTextAreaElement>);
        const form = document.createElement('form');
        const event = new Event('submit', { bubbles: true, cancelable: true });
        Object.defineProperty(event, 'target', {
            value: form,
            enumerable: true,
        });
        Object.defineProperty(event, 'currentTarget', {
            value: form,
            enumerable: true,
        });
        handleSubmit(event as unknown as React.FormEvent);
    };

    return (
        <div className="flex flex-col h-[500px]">
            <div className="flex-1 p-4 overflow-y-auto" ref={scrollAreaRef}>
                <div className="space-y-4">
                    {messages.map((message) => (
                        <ChatMessage key={message.id} message={message} />
                    ))}

                    {messages.length === 1 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-2 mt-4"
                        >
                            <p className="text-sm text-muted-foreground">
                                Suggested questions:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {SUGGESTED_QUESTIONS.map((question) => (
                                    <Button
                                        key={question}
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            handleSuggestedQuestion(question)
                                        }
                                        className="text-xs"
                                    >
                                        {question}
                                    </Button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-2 text-muted-foreground"
                        >
                            <div className="flex gap-1">
                                <motion.div
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 0.6,
                                        delay: 0,
                                    }}
                                    className="w-2 h-2 bg-current rounded-full"
                                />
                                <motion.div
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 0.6,
                                        delay: 0.2,
                                    }}
                                    className="w-2 h-2 bg-current rounded-full"
                                />
                                <motion.div
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 0.6,
                                        delay: 0.4,
                                    }}
                                    className="w-2 h-2 bg-current rounded-full"
                                />
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="p-4 border-t">
                <ChatInput
                    value={input}
                    onChange={handleInputChange}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}
