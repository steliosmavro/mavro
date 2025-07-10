// Re-export types from centralized data package
export type {
    PersonalInfo,
    Social,
    ProjectCategory,
    CategoryConfig,
    Project,
    Experience,
    Skill,
    Testimonial,
    ContactMethod,
} from '@repo/data';

// Import types for local use
import type {
    PersonalInfo as PI,
    Project as P,
    Experience as E,
    Skill as S,
    Testimonial as T,
    ContactMethod as CM,
} from '@repo/data';

// Local types specific to mavrodev
export interface Summary {
    headline: string;
    bio: string;
    bioExtension: string;
    availability: string;
    startYear: number;
}

export interface Education {
    degree: string;
    institution?: string;
    period: string;
    grade?: string;
    description: string;
}

export interface FAQ {
    question: string;
    answer: string;
    category?: string;
}

export interface HomepageConfig {
    heroTagline?: string;
    heroSkillBadges?: string[]; // Primary skills to show in hero
    featuredProjectSlugs?: string[]; // Which projects to feature
}

export interface Resume {
    personal: PI;
    summary: Summary;
    projects: P[];
    experience: E[];
    education: Education[];
    skills: S[];
    testimonials: T[];
    faqs: FAQ[];
    contactMethods: CM[];
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
