export interface PersonalInfo {
    name: string;
    title: string;
    location: string;
    mobile: string;
    email: string;
    website: string;
    linkedin: string;
    github: string;
    twitter?: string;
    avatar: string;
    casualAvatar: string;
    timezone: string;
}

export interface Social {
    platform: 'github' | 'linkedin' | 'twitter' | 'website' | 'email';
    url: string;
    username?: string;
}

export type ProjectCategory =
    | 'ai-ml'
    | 'web3'
    | 'developer-tools'
    | 'open-source'
    | 'automation'
    | 'website'
    | 'contributions';

export interface CategoryConfig {
    label: string;
    color: string; // Tailwind gradient classes
}

export interface Project {
    name: string;
    slug: string;
    period: {
        start: Date;
        end?: Date;
    };
    type: 'open-source' | 'client' | 'personal' | 'acquired';
    categories: ProjectCategory[];
    description: string;
    longDescription?: string;
    highlights: string[];
    primaryTech: string[];
    secondaryTech: string[];
    featured: boolean;
    live?: string;
    github?: string;
    icon?: string;
    impact?: string;
    acquired?: {
        by: string;
        details?: string;
    };
    metrics?: {
        users?: string;
        revenue?: string;
        other?: string[];
    };
}

export interface Experience {
    company: string;
    location: string;
    workModel?: 'Remote' | 'Hybrid' | 'On-site';
    role: string;
    period: {
        start: Date;
        end?: Date;
    };
    current: boolean;
    website?: string;
    logo?: string;
    description: string;
    projects: Array<{
        name: string;
        role?: string;
        description: string;
        highlights: string[];
    }>;
    technologies: {
        frontend?: string[];
        backend?: string[];
        databases?: string[];
        devops?: string[];
        other?: string[];
    };
}

export interface Skill {
    category: string;
    items: string[];
    isPrimary?: boolean;
    displayOrder?: number;
}

export interface Testimonial {
    quote: string;
    name: string;
    title: string;
    company?: string;
    avatar?: string;
    linkedIn?: string;
    gradientColor: string;
}

export interface ContactMethod {
    type: 'email' | 'github' | 'linkedin' | 'twitter' | 'website';
    label: string;
    value: string;
    href: string;
    color: string;
}
