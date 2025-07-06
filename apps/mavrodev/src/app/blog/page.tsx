import type { Metadata } from 'next';
import BlogList from './BlogList';
import { getBlogPosts } from '../../../lib/getBlogPosts';

export const metadata: Metadata = {
    title: 'Blog | Stelios Mavro',
    description:
        'Thoughts on AI, developer tools, automation, and building better software.',
};

export default async function BlogIndexPage() {
    const posts = await getBlogPosts();

    return <BlogList posts={posts} />;
}
