'use client';

import { useState, useRef } from 'react';
import { Copy, Check } from 'lucide-react';
import { Badge } from '@repo/ui/components/Badge';

interface CodeBlockProps {
    children: React.ReactNode;
    language?: string;
}

export function CodeBlock({ children, language }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleCopy = async () => {
        if (containerRef.current) {
            const codeElement = containerRef.current.querySelector('code');
            const preElement = containerRef.current.querySelector('pre');
            const text =
                codeElement?.textContent || preElement?.textContent || '';
            try {
                await navigator.clipboard.writeText(text);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        }
    };

    return (
        <div className="relative group" ref={containerRef}>
            {language && (
                <Badge
                    variant="outline"
                    className="absolute top-3 left-3 z-0 bg-background/80 text-muted-foreground font-mono"
                >
                    {language}
                </Badge>
            )}
            {children}
            <button
                onClick={handleCopy}
                className="absolute top-3 right-3 p-2 rounded-md bg-background/80 hover:bg-background border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                aria-label={copied ? 'Copied' : 'Copy code'}
                title={copied ? 'Copied' : 'Copy'}
            >
                {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                ) : (
                    <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                )}
            </button>
            {copied && (
                <div className="absolute top-[-2.5rem] right-2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded border shadow-md z-20 animate-in fade-in-0 duration-200">
                    Copied!
                </div>
            )}
        </div>
    );
}
