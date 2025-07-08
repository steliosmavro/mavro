'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { Badge } from '../display/Badge';
import hljs from 'highlight.js';

interface CodeBlockProps {
    children: React.ReactNode;
    language?: string;
}

export function CodeBlock({ children, language }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const codeRef = useRef<HTMLElement>(null);

    // Apply syntax highlighting
    useEffect(() => {
        if (codeRef.current && language) {
            codeRef.current.className = `language-${language}`;
            hljs.highlightElement(codeRef.current);
        }
    }, [language, children]);

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
        <div className="relative group code-block-container" ref={containerRef}>
            {/* Language badge - positioned absolutely but relative to outer container */}
            {language && (
                <Badge
                    variant="outline"
                    className="absolute top-3 left-3 z-20 text-muted-foreground font-mono select-none pointer-events-none"
                >
                    {language}
                </Badge>
            )}

            {/* Copy button - positioned absolutely but relative to outer container */}
            <button
                onClick={handleCopy}
                className="code-copy-button absolute top-3 right-3 p-2 rounded-md bg-background/80 hover:bg-background border border-border transition-opacity duration-200 z-20"
                aria-label={copied ? 'Copied' : 'Copy code'}
                title={copied ? 'Copied' : 'Copy'}
            >
                {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                ) : (
                    <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                )}
            </button>

            {/* Copied tooltip */}
            {copied && (
                <div className="absolute top-[-2rem] right-2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded border shadow-md z-30 animate-in fade-in-0 duration-200">
                    Copied!
                </div>
            )}

            {/* The actual code content */}
            <div className="overflow-x-auto">
                {React.Children.toArray(children).map((child, index) => {
                    if (React.isValidElement(child) && child.type === 'pre') {
                        const preChild = child as React.ReactElement<{
                            children?: React.ReactNode;
                            className?: string;
                        }>;
                        return React.cloneElement(preChild, {
                            key: index,
                            children: React.Children.map(
                                preChild.props.children,
                                (codeChild) => {
                                    if (
                                        React.isValidElement(codeChild) &&
                                        codeChild.type === 'code'
                                    ) {
                                        return React.cloneElement(
                                            codeChild as React.ReactElement<{
                                                ref?: React.Ref<HTMLElement>;
                                            }>,
                                            { ref: codeRef },
                                        );
                                    }
                                    return codeChild;
                                },
                            ),
                        });
                    }
                    return child;
                })}
            </div>
        </div>
    );
}
