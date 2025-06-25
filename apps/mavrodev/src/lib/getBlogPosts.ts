// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';
// import { PostMeta } from '../../types/post';

// export function getPostMeta(slug: string): PostMeta | null {
//     const postPath = path.join(
//         process.cwd(),
//         'src/content/blog',
//         `${slug}.mdx`,
//     );
//     if (!fs.existsSync(postPath)) return null;
//     const source = fs.readFileSync(postPath, 'utf8');
//     const { data } = matter(source);
//     return {
//         title: data.title || slug,
//         date: data.date || '',
//         summary: data.summary || '',
//         tags: data.tags || [],
//     };
// }
