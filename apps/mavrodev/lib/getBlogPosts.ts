import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { PostMeta } from '../types/post';

export interface BlogPost extends PostMeta {
    slug: string;
    content: string;
    readingTime: string;
}

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export async function getBlogPosts(): Promise<BlogPost[]> {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const posts = await Promise.all(
        fileNames
            .filter((fileName) => fileName.endsWith('.mdx'))
            .map(async (fileName) => {
                const slug = fileName.replace(/\.mdx$/, '');
                const fullPath = path.join(postsDirectory, fileName);
                const fileContents = fs.readFileSync(fullPath, 'utf8');
                const { data, content } = matter(fileContents);

                const readingTimeResult = readingTime(content);

                return {
                    slug,
                    content,
                    title: data.title || 'Untitled',
                    date: data.date || new Date().toISOString(),
                    summary: data.summary || '',
                    tags: data.tags || [],
                    readingTime: readingTimeResult.text,
                } as BlogPost;
            }),
    );

    return posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.mdx`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        const readingTimeResult = readingTime(content);

        return {
            slug,
            content,
            title: data.title || 'Untitled',
            date: data.date || new Date().toISOString(),
            summary: data.summary || '',
            tags: data.tags || [],
            readingTime: readingTimeResult.text,
        };
    } catch {
        return null;
    }
}
