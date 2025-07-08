import { MDXRemote } from 'next-mdx-remote/rsc';
import { MDXComponents, CodeBlock } from '@repo/ui/components';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import React, { ReactNode } from 'react';

interface MDXContentProps {
    source: string;
}

interface PreProps {
    children?: ReactNode;
    className?: string;
    [key: string]: unknown;
}

// Custom pre component that handles code blocks properly
const CustomPre = ({ children, ...props }: PreProps) => {
    // Extract the code element and its className
    const codeElement = React.Children.toArray(children).find(
        (child) => React.isValidElement(child) && child.type === 'code',
    ) as
        | React.ReactElement<{ className?: string; children?: ReactNode }>
        | undefined;

    if (!codeElement) {
        return <pre {...props}>{children}</pre>;
    }

    const className = codeElement.props?.className || '';
    const match = /language-(\w+)/.exec(className);
    const language = match?.[1];

    // Extract the actual code content
    const codeContent = codeElement.props?.children;

    return (
        <CodeBlock language={language}>
            <pre {...props}>
                <code className={className}>{codeContent}</code>
            </pre>
        </CodeBlock>
    );
};

// Override the MDXComponents to ensure our custom pre component is used
const customComponents = {
    ...MDXComponents,
    pre: CustomPre,
};

export async function MDXContent({ source }: MDXContentProps) {
    return (
        <MDXRemote
            source={source}
            options={{
                mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                        rehypeSlug,
                        [
                            rehypeAutolinkHeadings,
                            {
                                behavior: 'wrap',
                                properties: {
                                    className: ['anchor-link'],
                                },
                            },
                        ],
                    ],
                },
            }}
            components={customComponents}
        />
    );
}
