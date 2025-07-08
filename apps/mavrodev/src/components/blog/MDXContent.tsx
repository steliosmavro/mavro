import { MDXRemote } from 'next-mdx-remote/rsc';
import { MDXComponents } from '@repo/ui/components';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';

interface MDXContentProps {
    source: string;
}

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
                        rehypeHighlight,
                    ],
                },
            }}
            components={MDXComponents}
        />
    );
}
