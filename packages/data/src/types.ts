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

export interface HighlightGroup {
    summary?: string; // One-line impact statement
    primary: string[]; // Core achievements with metrics
    secondary?: string[]; // Technical details, implementation specifics
    leadership?: string[]; // Leadership/mentorship highlights (for experience)
}

export interface ProjectMetrics {
    users?: string;
    performance?: string;
    revenue?: string;
    scale?: string;
    reliability?: string;
}

export interface Project {
    name: string;
    descriptor?: string; // Short description like "Trading Bot Ecosystem"
    slug: string;
    period: {
        start: Date;
        end?: Date;
    };
    type: 'open-source' | 'client' | 'personal' | 'acquired';
    categories: ProjectCategory[];
    description: string;
    longDescription?: string;
    highlights: string[] | HighlightGroup; // Support both old and new format
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
    metrics?:
        | {
              users?: string;
              revenue?: string;
              other?: string[];
          }
        | ProjectMetrics; // Support both old and new format
}

export interface Contribution {
    name: string;
    descriptor?: string; // Short description like "Open Source API Platform"
    slug: string;
    period: {
        start: Date;
        end?: Date;
    };
    organization: string; // The org/project contributed to
    description: string;
    longDescription?: string;
    highlights: string[] | HighlightGroup;
    primaryTech: string[];
    secondaryTech: string[];
    featured: boolean;
    live?: string;
    github?: string;
    icon?: string;
    impact?: string;
    metrics?: ProjectMetrics;
}

export interface ExperienceProject {
    name: string;
    role?: string;
    description: string;
    highlights: string[] | HighlightGroup; // Support both old and new format
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
    roleImpact?: string; // One-line role summary for highlights mode
    projects: ExperienceProject[];
    technologies: {
        frontend?: string[];
        backend?: string[];
        databases?: string[];
        devops?: string[];
        other?: string[];
    };
}

export interface EnhancedSkill {
    category: string;
    primary: string[]; // Core, production-ready skills
    secondary?: string[]; // Familiar, learning, or supplementary
    displayOrder?: number;
}

export interface Skill {
    category: string;
    items: string[];
    isPrimary?: boolean;
    displayOrder?: number;
}

// Union type to support both formats
export type SkillData = Skill | EnhancedSkill;

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

export interface Education {
    degree: string;
    period: string;
    grade: string;
    description: string;
}

export interface FAQ {
    question: string;
    answer: string;
    category: 'technical' | 'work' | 'personal';
}

export interface Homepage {
    heroSkillBadges: string[];
    featuredProjectSlugs: string[];
}

export interface Summary {
    headline: string;
    bio: string;
    bioExtension: string;
    availability: string;
    startYear: number;
}

export type ResumeMode = 'concise' | 'standard' | 'comprehensive';

export interface Resume {
    personal: PersonalInfo;
    summary: Summary;
    projects: Project[];
    contributions: Contribution[];
    experience: Experience[];
    education: Education[];
    skills: SkillData[]; // Support both old and new skill formats
    testimonials: Testimonial[];
    faqs: FAQ[];
    contactMethods: ContactMethod[];
    homepage: Homepage;
}
