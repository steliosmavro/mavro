import type { ProjectCategory } from '@/types/resume';

export interface PostMeta {
    title: string;
    date: string;
    summary?: string;
    categories?: ProjectCategory[]; // Use same categories as projects
    readingTime?: string;
    relatedProject?: string; // Project slug from resume.ts
}
