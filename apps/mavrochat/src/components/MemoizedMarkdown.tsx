/* eslint-disable react/prop-types */
import React, { memo, useMemo } from 'react';
import { marked } from 'marked';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { CodeBlock } from '@repo/ui/components';

function parseMarkdownIntoBlocks(markdown: string): string[] {
    const tokens = marked.lexer(markdown) as Array<{ raw: string }>;
    return tokens.map((token) => token.raw);
}

interface MemoizedMarkdownBlockProps {
    content: string;
}

const MemoizedMarkdownBlock = memo(
    ({ content }: MemoizedMarkdownBlockProps) => {
        return (
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    pre: ({ children, ...props }) => {
                        const codeElement = React.Children.toArray(
                            children,
                        ).find((child) => {
                            if (!React.isValidElement(child)) return false;
                            return (
                                typeof (child.props as { className?: string })
                                    .className === 'string'
                            );
                        }) as
                            | React.ReactElement<{ className?: string }>
                            | undefined;

                        const className =
                            (
                                codeElement?.props as
                                    | { className?: string }
                                    | undefined
                            )?.className ?? '';
                        const match = /language-(\w+)/.exec(className);
                        const lang = match?.[1];

                        return (
                            <CodeBlock language={lang}>
                                <pre {...props}>{children}</pre>
                            </CodeBlock>
                        );
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        );
    },
    (prevProps, nextProps) => {
        if (prevProps.content !== nextProps.content) return false;
        return true;
    },
);

MemoizedMarkdownBlock.displayName = 'MemoizedMarkdownBlock';

interface MemoizedMarkdownProps {
    content: string;
    id: string;
}

export const MemoizedMarkdown = memo(
    ({ content, id }: MemoizedMarkdownProps) => {
        const blocks = useMemo(
            () => parseMarkdownIntoBlocks(content),
            [content],
        );

        return blocks.map((block, index) => (
            <MemoizedMarkdownBlock
                content={block}
                key={`${id}-block_${index}`}
            />
        ));
    },
);

MemoizedMarkdown.displayName = 'MemoizedMarkdown';
