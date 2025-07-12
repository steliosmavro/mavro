'use client';

import { Bot } from 'lucide-react';
import { cn } from '@repo/ui/lib/utils';
import { type Message } from 'ai';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

interface ChatMessageProps {
    message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
    const isAssistant = message.role === 'assistant';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={cn('flex gap-3', !isAssistant && 'flex-row-reverse')}
        >
            {isAssistant && (
                <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                </div>
            )}

            <div
                className={cn(
                    'space-y-2 overflow-hidden',
                    isAssistant ? 'flex-1 px-1' : 'max-w-[85%]',
                )}
            >
                {!isAssistant ? (
                    <div className="bg-primary text-primary-foreground rounded-lg px-3 py-2 text-sm">
                        {message.content}
                    </div>
                ) : (
                    <div className="prose prose-sm dark:prose-invert max-w-none text-left">
                        <ReactMarkdown
                            components={{
                                p: ({ children }) => (
                                    <p className="mb-2 last:mb-0">{children}</p>
                                ),
                                ul: ({ children }) => (
                                    <ul className="my-2 ml-4 list-disc">
                                        {children}
                                    </ul>
                                ),
                                ol: ({ children }) => (
                                    <ol className="my-2 ml-4 list-decimal">
                                        {children}
                                    </ol>
                                ),
                                li: ({ children }) => (
                                    <li className="mb-1">{children}</li>
                                ),
                                a: ({ href, children }) => (
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline"
                                    >
                                        {children}
                                    </a>
                                ),
                                code: ({ children, className }) => {
                                    const isInline = !className;
                                    return isInline ? (
                                        <code className="px-1 py-0.5 rounded bg-muted text-sm">
                                            {children}
                                        </code>
                                    ) : (
                                        <code className="block p-3 rounded bg-muted overflow-x-auto text-sm">
                                            {children}
                                        </code>
                                    );
                                },
                            }}
                        >
                            {message.content}
                        </ReactMarkdown>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
