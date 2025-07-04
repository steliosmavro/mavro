import { Copy, Check } from 'lucide-react';
import React, { useRef, useState } from 'react';

interface CopyableMessageProps {
    children: React.ReactNode;
    className?: string;
    textToCopy?: string;
}

export function CopyableMessage({
    children,
    className = '',
    textToCopy,
}: CopyableMessageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        const text = textToCopy ?? (containerRef.current?.innerText || '');
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div
            ref={containerRef}
            className={`relative group/message ${className}`.trim()}
        >
            {children}
            <button
                onClick={handleCopy}
                className="absolute top-3 right-3 p-2 rounded-md bg-background/80 hover:bg-background border border-border opacity-0 group-hover/message:opacity-100 transition-opacity duration-200 z-10"
                aria-label={copied ? 'Copied' : 'Copy message'}
                title={copied ? 'Copied' : 'Copy'}
            >
                {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                ) : (
                    <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                )}
            </button>
        </div>
    );
}
