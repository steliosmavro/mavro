'use client';

import { useChat } from '@ai-sdk/react';
import { useRef, useEffect, useState } from 'react';
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
    const [spacerHeight, setSpacerHeight] = useState<number>(0);
    const { messages } = useChat({
        id: 'chat',
        maxSteps: 5,
        experimental_throttle: 50,
        headers: { 'x-model': model },
    });
    const displayMessages = messages;

    useEffect(() => {
        if (lastUserMessageRef.current) {
            const el = lastUserMessageRef.current;
            // Calculate space needed so that this message aligns to top with 1rem padding
            const messageHeight = el.getBoundingClientRect().height;
            const viewportHeight = window.innerHeight;
            const header = document.querySelector(
                'header',
            ) as HTMLElement | null;
            const headerHeight = header
                ? header.getBoundingClientRect().height
                : 0;

            // Calculate spacer so there is enough space to scroll the message to the top
            const desiredSpacer = Math.max(
                viewportHeight - headerHeight - messageHeight - 16, // 16px = 1rem padding
                0,
            );
            setSpacerHeight(desiredSpacer);

            // Ensure the element leaves room for the sticky header + padding when scrolled into view
            el.style.scrollMarginTop = `${headerHeight + 16}px`;

            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            {/* Dynamic spacer */}
            <div style={{ height: spacerHeight }} className="w-full shrink-0" />
        </div>
    );
}
