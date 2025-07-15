'use client';

import { Send } from 'lucide-react';
import { Button, Textarea } from '@repo/ui/components';
import { useRef, KeyboardEvent } from 'react';

interface ChatInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
}

export function ChatInput({
    value,
    onChange,
    onSubmit,
    isLoading,
}: ChatInputProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (value.trim() && !isLoading) {
                onSubmit(e as React.FormEvent);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (value.trim() && !isLoading) {
            onSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <Textarea
                ref={textareaRef}
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask about my experience, projects, or skills..."
                className="resize-none min-h-[60px] max-h-[120px]"
            />
            <Button
                type="submit"
                size="icon"
                disabled={!value.trim() || isLoading}
                className="self-end"
            >
                <Send className="h-4 w-4" />
            </Button>
        </form>
    );
}
