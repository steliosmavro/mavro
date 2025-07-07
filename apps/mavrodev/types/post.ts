export interface PostMeta {
    title: string;
    date: string;
    summary?: string;
    tags?: string[];
    readingTime?: string;
    relatedProject?: string; // Project slug from resume.ts
}
