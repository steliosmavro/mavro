'use client';

import React, { ReactNode } from 'react';
import { Badge } from '../display/Badge';
import { CodeBlock } from './CodeBlock';
import { ExternalLink } from 'lucide-react';
import {
    extractLanguageFromCodeElement,
    type PreComponentProps,
} from './utils';

interface LinkProps {
    href: string;
    children: ReactNode;
}

const CustomLink = ({ href, children }: LinkProps) => {
    const isExternal = href.startsWith('http');

    return (
        <a
            href={href}
            target={isExternal ? '_blank' : '_self'}
            rel={isExternal ? 'noopener noreferrer' : ''}
            className="text-primary underline-offset-4 hover:underline inline-flex items-center gap-1"
        >
            {children}
            {isExternal && <ExternalLink className="h-3 w-3" />}
        </a>
    );
};

interface CodeProps {
    children: ReactNode;
    className?: string;
}

const CustomCode = ({ children, className }: CodeProps) => {
    // Inline code only - block code is handled by pre component
    if (!className || !className.includes('language-')) {
        return (
            <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                {children}
            </code>
        );
    }
    // Block code - will be wrapped by pre component
    return <code className={className}>{children}</code>;
};

export const MDXComponents = {
    h1: ({ children }: { children: ReactNode }) => (
        <h1 className="text-3xl font-bold mb-6 mt-8 text-foreground">
            {children}
        </h1>
    ),
    h2: ({ children }: { children: ReactNode }) => (
        <h2 className="text-2xl font-semibold mb-4 mt-8 text-foreground">
            {children}
        </h2>
    ),
    h3: ({ children }: { children: ReactNode }) => (
        <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground">
            {children}
        </h3>
    ),
    p: ({ children }: { children: ReactNode }) => (
        <p className="mb-4 text-foreground leading-relaxed">{children}</p>
    ),
    a: CustomLink,
    pre: ({ children, ...props }: PreComponentProps) => {
        const language = extractLanguageFromCodeElement(children);

        return (
            <CodeBlock language={language}>
                <pre {...props}>{children}</pre>
            </CodeBlock>
        );
    },
    code: CustomCode,
    ul: ({ children }: { children: ReactNode }) => (
        <ul className="list-disc list-inside mb-4 space-y-2 text-foreground">
            {children}
        </ul>
    ),
    ol: ({ children }: { children: ReactNode }) => (
        <ol className="list-decimal list-inside mb-4 space-y-2 text-foreground">
            {children}
        </ol>
    ),
    li: ({ children }: { children: ReactNode }) => (
        <li className="text-foreground">{children}</li>
    ),
    blockquote: ({ children }: { children: ReactNode }) => (
        <blockquote className="border-l-4 border-primary pl-4 italic mb-4 text-muted-foreground">
            {children}
        </blockquote>
    ),
    table: ({ children }: { children: ReactNode }) => (
        <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse border border-border">
                {children}
            </table>
        </div>
    ),
    th: ({ children }: { children: ReactNode }) => (
        <th className="border border-border px-4 py-2 bg-muted font-semibold text-left">
            {children}
        </th>
    ),
    td: ({ children }: { children: ReactNode }) => (
        <td className="border border-border px-4 py-2">{children}</td>
    ),
    img: ({ src, alt }: { src: string; alt?: string }) => (
        <img
            src={src}
            alt={alt}
            className="max-w-full h-auto rounded-lg border border-border my-4"
        />
    ),
    hr: () => <hr className="border-border my-8" />,
    // Custom components that can be used in MDX
    Badge: ({
        children,
        variant = 'default',
    }: {
        children: ReactNode;
        variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    }) => <Badge variant={variant}>{children}</Badge>,
};
