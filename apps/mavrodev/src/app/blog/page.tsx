import type { Metadata } from 'next';
import BlogList from './BlogList';
import { getBlogPosts } from '../../../lib/getBlogPosts';
import { resumeData } from '@repo/data';

export const metadata: Metadata = {
    title: `Blog | ${resumeData.personal.name}`,
    description:
        'Thoughts on AI, developer tools, automation, and building better software.',
};

export default async function BlogIndexPage() {
    const posts = await getBlogPosts();

    return <BlogList posts={posts} />;
}
