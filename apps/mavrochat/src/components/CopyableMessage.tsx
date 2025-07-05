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
            className={`group/message flex flex-col ${className}`.trim()}
        >
            {children}
            {/* Copy button appears underneath the message, revealed on hover */}
            <button
                onClick={handleCopy}
                className="self-end mt-2 p-2 rounded-md bg-background/80 hover:bg-background border border-border opacity-0 group-hover/message:opacity-100 transition-opacity duration-200"
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
