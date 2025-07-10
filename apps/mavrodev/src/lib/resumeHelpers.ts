import { resumeData } from '@/data/resume';
import type { Project } from '@/types/resume';
import {
    getProjectBySlug as getProjectBySlugFromData,
    getFeaturedProjects as getFeaturedProjectsFromData,
} from '@repo/data';

/**
 * Get featured projects for homepage or projects page
 */
export function getFeaturedProjects(): Project[] {
    return getFeaturedProjectsFromData();
}

/**
 * Get project by slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
    return getProjectBySlugFromData(slug);
}

/**
 * Get consistent hero text that accurately represents timeline
 */
export function getHeroContent() {
    const { summary, personal } = resumeData;
    const currentYear = new Date().getFullYear();
    const yearsOfExperience = currentYear - summary.startYear;

    return {
        name: personal.name,
        title: personal.title,
        // Accurate representation: Full-stack since 2020, recently specializing in AI
        tagline: `Full-stack engineer with ${yearsOfExperience}+ years of experience`,
        description: summary.bio,
        // Alternative taglines that are accurate:
        alternativeTaglines: [
            `Building exceptional software since ${summary.startYear}`,
            'Turning complex ideas into elegant solutions',
            'From crypto bots to AI chat platforms',
        ],
    };
}

/**
 * Get formatted experience duration
 */
export function getExperienceDuration(startYear: number): string {
    const currentYear = new Date().getFullYear();
    const years = currentYear - startYear;
    return `${years}+ years`;
}

/**
 * Get all technologies used across projects and experience
 */
export function getAllTechnologies(): string[] {
    const techSet = new Set<string>();

    // From projects
    resumeData.projects.forEach((project) => {
        project.primaryTech.forEach((tech: string) => techSet.add(tech));
        project.secondaryTech.forEach((tech: string) => techSet.add(tech));
    });

    // From experience
    resumeData.experience.forEach((exp) => {
        Object.values(exp.technologies).forEach(
            (techs: string[] | undefined) => {
                techs?.forEach((tech: string) => techSet.add(tech));
            },
        );
    });

    // From skills
    resumeData.skills.forEach((skill) => {
        skill.items.forEach((item: string) => techSet.add(item));
    });

    return Array.from(techSet).sort();
}

/**
 * Get projects for Projects page with optional filtering
 */
export function getProjects(options?: {
    type?: Project['type'];
    featured?: boolean;
}) {
    let projects = [...resumeData.projects];

    if (options?.type) {
        projects = projects.filter((p) => p.type === options.type);
    }

    if (options?.featured !== undefined) {
        projects = projects.filter((p) => p.featured === options.featured);
    }

    return projects;
}

/**
 * Get resume data for PDF generation
 */
export function getResumeForPDF() {
    return {
        ...resumeData,
        // Add any PDF-specific formatting here
        formattedDate: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }),
    };
}

/**
 * Get primary skills for homepage hero
 */
export function getPrimarySkills(): string[] {
    // First check if homepage config has specific skills
    if (resumeData.homepage?.heroSkillBadges) {
        return resumeData.homepage.heroSkillBadges;
    }

    // Otherwise return skills marked as primary
    const primarySkills = resumeData.skills
        .filter((skill) => skill.isPrimary)
        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
        .flatMap((skill) => skill.items.slice(0, 3)); // Take top 3 from each primary category

    return primarySkills.slice(0, 5); // Return top 5 skills
}

/**
 * Get contact methods for contact page
 */
export function getContactMethods() {
    return resumeData.contactMethods;
}

/**
 * Get testimonials for homepage
 */
export function getTestimonials() {
    return resumeData.testimonials;
}

/**
 * Get FAQs for contact page
 */
export function getFAQs(category?: string) {
    if (category) {
        return resumeData.faqs.filter((faq) => faq.category === category);
    }
    return resumeData.faqs;
}

/**
 * Get author bio for blog posts
 */
export function getAuthorBio() {
    return {
        name: resumeData.personal.name,
        bio: resumeData.summary.headline,
        avatar: resumeData.personal.casualAvatar,
        social: {
            github: resumeData.personal.github,
            linkedin: resumeData.personal.linkedin,
            twitter: resumeData.personal.twitter,
        },
    };
}

/**
 * Get the full expanded bio
 */
export function getFullBio(): string {
    const { bio, bioExtension } = resumeData.summary;
    return `${bio} ${bioExtension}`;
}

/**
 * Calculate years of experience from start year
 */
export function getYearsOfExperience(): number {
    const currentYear = new Date().getFullYear();
    return currentYear - resumeData.summary.startYear;
}

/**
 * Usage Examples:
 *
 * // In Homepage Hero:
 * const hero = getHeroContent();
 * const skills = getPrimarySkills();
 * <h1>{hero.name}</h1>
 * <p>{hero.tagline}</p>
 * {skills.map(skill => <Badge>{skill}</Badge>)}
 *
 * // In Homepage Testimonials:
 * const testimonials = getTestimonials();
 *
 * // In Contact Page:
 * const contactMethods = getContactMethods();
 * const faqs = getFAQs();
 *
 * // In Blog Posts:
 * const author = getAuthorBio();
 *
 * // For Bio Usage:
 * const { bio, bioExtension } = resumeData.summary;
 * <p>{bio}</p> // Just the base bio
 * <p>{getFullBio()}</p> // Bio + extension combined
 * <p>{bio} {bioExtension}</p> // Manual combination
 *
 * // For consistency across the site:
 * - Always use resumeData.personal.name instead of hardcoding "Stelios Mavro"
 * - Always use summary.startYear instead of hardcoding "2020"
 * - Always reference the accurate timeline from summary.bio
 */
