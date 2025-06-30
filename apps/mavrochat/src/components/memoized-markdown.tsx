/* eslint-disable react/prop-types */
import { marked } from 'marked';
import { memo, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

function parseMarkdownIntoBlocks(markdown: string): string[] {
    const tokens = marked.lexer(markdown);
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
