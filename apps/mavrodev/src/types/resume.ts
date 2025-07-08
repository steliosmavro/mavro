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

export interface Summary {
    headline: string;
    bio: string;
    bioExtension: string;
    availability: string;
    startYear: number;
}

export type ProjectCategory =
    | 'ai-ml'
    | 'web3'
    | 'developer-tools'
    | 'open-source'
    | 'automation'
    | 'website'
    | 'contributions';

export interface Project {
    name: string;
    slug: string;
    period: string;
    type: 'open-source' | 'client' | 'personal' | 'acquired';
    categories: ProjectCategory[]; // Multiple categories per project
    description: string;
    longDescription?: string;
    highlights: string[];
    primaryTech: string[]; // Main technologies to showcase
    secondaryTech: string[]; // Additional technologies
    featured: boolean;
    live?: string;
    github?: string;
    icon?: string; // lucide icon name
    impact?: string; // e.g., "1.2K active users"
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
    role: string;
    period: string;
    current: boolean;
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

export interface Education {
    degree: string;
    institution?: string;
    period: string;
    grade?: string;
    description: string;
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
    gradientColor: string; // e.g., "from-blue-500 to-cyan-500"
}

export interface FAQ {
    question: string;
    answer: string;
    category?: string;
}

export interface ContactMethod {
    type: 'email' | 'github' | 'linkedin' | 'twitter' | 'website';
    label: string;
    value: string;
    href: string;
    color: string; // gradient
}

export interface HomepageConfig {
    heroTagline?: string;
    heroSkillBadges?: string[]; // Primary skills to show in hero
    featuredProjectSlugs?: string[]; // Which projects to feature
}

export interface Resume {
    personal: PersonalInfo;
    summary: Summary;
    projects: Project[];
    experience: Experience[];
    education: Education[];
    skills: Skill[];
    testimonials: Testimonial[];
    faqs: FAQ[];
    contactMethods: ContactMethod[];
    homepage?: HomepageConfig;
}

export interface ResumeConfig {
    metadata: {
        lastUpdated: string;
        version: string;
    };
    display: {
        showMetrics: boolean;
        showAcquiredBadge: boolean;
        projectsPerPage: number;
    };
    seo: {
        twitterHandle: string;
        ogImage?: string;
    };
}
