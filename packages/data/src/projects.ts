import type { Project, Contribution, ProjectCategory } from './types';
import { getOriginFor } from '@repo/ui/lib/utils';

export const projects: Project[] = [
    {
        name: 'MavroChat',
        slug: 'mavrochat',
        period: {
            start: new Date('2025-06-01'),
        },
        type: 'open-source',
        categories: ['ai-ml', 'developer-tools', 'open-source'],
        description: 'Open-Source AI-Powered Chat Platform for Developers',
        icon: 'MessageSquare',
        longDescription:
            'A lightweight, open-source AI chat platform specifically designed for developers. Focuses on quick code reviews, debugging help, and focused development without the complexity of full codebase analysis.',
        highlights: [
            'Built open-source AI chat platform optimized for focused developer workflows and quick code assistance',
            'Implemented real-time streaming responses with sub-50ms latency using Server-Sent Events',
            'Integrated multiple AI providers (OpenAI GPT-4o/3.5, Claude 3.5 Sonnet/Haiku) with seamless switching',
            'Designed extensible tool system with type-safe Zod schemas for custom developer functions',
            'Added sustainable rate limiting at the edge to maintain generous free tier while preventing abuse',
            'Implemented Bring Your Own Key (BYOK) feature with secure browser-based storage for unlimited usage',
        ],
        primaryTech: ['Next.js 15', 'TypeScript', 'Generative AI', 'Monorepo'],
        secondaryTech: [
            'Tailwind CSS',
            'Shiki',
            'Turborepo',
            'Edge Functions',
            'Upstash Redis',
        ],
        featured: true,
        live: `${getOriginFor('mavrochat')}/landing`,
        github: 'https://github.com/steliosmavro/mavro',
    },
    {
        name: 'MavroDev',
        slug: 'mavrodev',
        period: {
            start: new Date('2023-07-01'),
        },
        type: 'personal',
        categories: ['website', 'ai-ml', 'open-source'],
        description: 'Open-Source AI-Enhanced Portfolio & Blog Platform',
        icon: 'Palette',
        longDescription:
            'Open-source modern portfolio website featuring an AI-powered assistant that helps visitors learn about my experience through natural conversation. Built with MDX support and beautiful animations.',
        highlights: [
            'Built a modern portfolio website showcasing projects, blog, and professional experience',
            'Integrated AI-powered portfolio assistant using OpenAI GPT-3.5 for natural conversation about my experience',
            'Implemented real-time streaming responses with intelligent context-aware tools for querying projects and skills',
            'Added Google Calendar integration allowing visitors to check availability and schedule meetings directly through AI chat',
            'Added rate limiting and comprehensive error handling for sustainable AI feature usage',
            'Implemented MDX-based blog system with syntax highlighting, reading time, and category filtering',
            'Created responsive design with dark/light theme support and smooth Framer Motion animations',
            'Integrated contact form with email sending functionality using Resend API',
            'Architected as part of a Turborepo monorepo with shared UI component library',
            'Set up CI/CD with GitHub Actions, conventional commits, and automated quality checks',
        ],
        primaryTech: ['Next.js', 'AI Integration', 'MDX', 'Monorepo'],
        secondaryTech: [
            'Generative AI',
            'OpenAI API',
            'Google Calendar API',
            'Tailwind CSS',
            'Turborepo',
            'Framer Motion',
            'Resend',
        ],
        featured: false,
        live: getOriginFor('mavrodev'),
        github: 'https://github.com/steliosmavro/mavro',
    },
    {
        name: 'Next.js Auth Template',
        slug: 'nextjs13-template',
        period: {
            start: new Date('2023-02-13'),
            end: new Date('2023-03-07'),
        },
        type: 'open-source',
        categories: ['open-source', 'developer-tools'],
        description: 'Open-Source Google OAuth Starter Template For Developers',
        icon: 'Shield',
        highlights: [
            'Built and open-sourced a reusable starter template for full-stack apps using the newly released Next.js 13 (App Router)',
            'Provides built-in Google authentication, role-based access, and clean project structure',
            'Includes login/signup, protected routes, session management, and modern folder architecture',
            'Published on GitHub to help developers quickly bootstrap authenticated applications',
        ],
        primaryTech: ['Next.js', 'NextAuth.js'],
        secondaryTech: ['Tailwind CSS', 'OAuth'],
        featured: false,
        github: 'https://github.com/steliosmavro/nextjs13-template-auth',
    },
];

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
    return projects.filter((project) => project.featured);
}

export function getFeaturedProjectsWithContributions(): Array<
    Project | (Contribution & { isContribution: true })
> {
    const featuredProjects = projects.filter((project) => project.featured);

    // Import contributions and add those that are featured
    const { contributions } = require('./contributions');
    const featuredContributions = contributions
        .filter((c: Contribution) => c.featured)
        .map((c: Contribution) => ({
            ...c,
            isContribution: true as const,
            // Map contribution to project-like structure for compatibility
            type: 'open-source' as const,
            categories: ['contributions', 'open-source'] as ProjectCategory[],
        }));

    return [...featuredProjects, ...featuredContributions];
}

export function getProjectsByCategory(category: string): Project[] {
    return projects.filter((project) =>
        project.categories.includes(category as any),
    );
}
