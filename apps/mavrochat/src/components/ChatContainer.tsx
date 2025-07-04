'use client';

import { useChat } from '@ai-sdk/react';
import { useRef, useEffect } from 'react';
import { MemoizedMarkdown } from './MemoizedMarkdown';
import { useHighlightTheme } from '../hooks/useHighlightTheme';
import { useModel } from '../context/ModelContext';
import { Card, CardContent } from '@repo/ui/components/Card';
import { CopyableMessage } from './CopyableMessage';

export interface ChatContainerProps {
    className?: string;
}

export function ChatContainer({ className }: ChatContainerProps) {
    useHighlightTheme();

    const renderPart = (
        messageId: string,
        part: { type: string; text?: string; toolInvocation?: unknown },
        index: number,
    ) => {
        switch (part.type) {
            case 'text':
                return (
                    <MemoizedMarkdown
                        key={`${messageId}-${index}`}
                        id={`${messageId}-${index}`}
                        content={part.text ?? ''}
                    />
                );
            case 'tool-invocation':
                return (
                    <pre key={`${messageId}-${index}`}>
                        {JSON.stringify(part.toolInvocation, null, 2)}
                    </pre>
                );
            default:
                return null;
        }
    };

    const { model } = useModel();
    const lastUserMessageRef = useRef<HTMLDivElement | null>(null);
    const { messages } = useChat({
        id: 'chat',
        maxSteps: 5,
        experimental_throttle: 50,
        headers: { 'x-model': model },
    });
    const displayMessages = messages;

    useEffect(() => {
        if (lastUserMessageRef.current) {
            lastUserMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [displayMessages]);

    return (
        <div
            className={`flex-1 flex flex-col gap-16 pb-24 w-full ${className ?? ''}`}
        >
            {displayMessages.map((message, idx) => {
                const isUser = message.role === 'user';
                const alignmentClass = isUser ? 'self-end' : 'self-start';

                if (isUser) {
                    return (
                        <div
                            key={message.id}
                            ref={
                                idx === displayMessages.length - 1
                                    ? lastUserMessageRef
                                    : undefined
                            }
                            className={alignmentClass}
                        >
                            <CopyableMessage
                                className="ml-24"
                                textToCopy={message.parts
                                    .map((p) =>
                                        p.type === 'text' && 'text' in p
                                            ? ((p as { text?: string }).text ??
                                              '')
                                            : '',
                                    )
                                    .join('')}
                            >
                                <Card className="bg-secondary/50 border-muted-foreground/20">
                                    <CardContent>
                                        {message.parts.map((part, i) => {
                                            if (part.type === 'text') {
                                                return (
                                                    <p
                                                        key={`${message.id}-${i}`}
                                                        className="whitespace-pre-wrap"
                                                    >
                                                        {part.text ?? ''}
                                                    </p>
                                                );
                                            }
                                            return renderPart(
                                                message.id,
                                                part,
                                                i,
                                            );
                                        })}
                                    </CardContent>
                                </Card>
                            </CopyableMessage>
                        </div>
                    );
                } else {
                    return (
                        <div
                            key={message.id}
                            className={alignmentClass}
                            ref={undefined}
                        >
                            <CopyableMessage
                                textToCopy={message.parts
                                    .map((p) =>
                                        p.type === 'text' && 'text' in p
                                            ? ((p as { text?: string }).text ??
                                              '')
                                            : '',
                                    )
                                    .join('')}
                            >
                                <div className="markdown-content">
                                    {message.parts.map((part, i) =>
                                        renderPart(message.id, part, i),
                                    )}
                                </div>
                            </CopyableMessage>
                        </div>
                    );
                }
            })}
            {/* Spacer to allow scrolling last message to top */}
            <div className="h-[60vh] w-full shrink-0" />
        </div>
    );
}
