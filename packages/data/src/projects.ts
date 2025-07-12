import type { Project } from './types';
import { getOriginFor } from '@repo/ui/lib/utils';

export const projects: Project[] = [
    {
        name: 'MavroChat',
        slug: 'mavrochat',
        period: {
            start: new Date('2025-01-01'),
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
        ],
        primaryTech: ['Next.js 15', 'TypeScript', 'Monorepo'],
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
        categories: ['website', 'ai-ml'],
        description: 'AI-Enhanced Portfolio & Blog Platform',
        icon: 'Palette',
        longDescription:
            'Modern portfolio website featuring an AI-powered assistant that helps visitors learn about my experience through natural conversation. Built with MDX support and beautiful animations.',
        highlights: [
            'Built a modern portfolio website showcasing projects, blog, and professional experience',
            'Integrated AI-powered portfolio assistant using OpenAI GPT-3.5 for natural conversation about my experience',
            'Implemented real-time streaming responses with intelligent context-aware tools for querying projects and skills',
            'Added rate limiting and comprehensive error handling for sustainable AI feature usage',
            'Implemented MDX-based blog system with syntax highlighting, reading time, and category filtering',
            'Created responsive design with dark/light theme support and smooth Framer Motion animations',
            'Integrated contact form with email sending functionality using Resend API',
            'Architected as part of a Turborepo monorepo with shared UI component library',
            'Set up CI/CD with GitHub Actions, conventional commits, and automated quality checks',
        ],
        primaryTech: ['Next.js', 'AI Integration', 'MDX', 'Monorepo'],
        secondaryTech: [
            'OpenAI API',
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
        name: 'Nango Contributions',
        slug: 'nango-contributions',
        period: {
            start: new Date('2025-03-20'),
            end: new Date('2025-05-23'),
        },
        type: 'open-source',
        categories: ['contributions', 'open-source', 'developer-tools'],
        description: 'Open Source Developer Tool Contributions',
        icon: 'GitPullRequest',
        longDescription:
            'Contributed across multiple areas of Nango — a popular open-source platform for unified API integrations.',
        highlights: [
            'Built full integration support for external provider (ClickSend), including syncs, actions, and configuration',
            'Deep-dived into distributed architecture: Kubernetes/Helm deployments, AWS ECS, Redis queues, ElasticSearch logging',
            'Proactively identified and solved user pain points from Slack discussions, often with PRs ready before issues were triaged',
            'Developed direct working relationship with CTO, providing solutions with user impact analysis and implementation strategies',
            'Contributed improvements across full stack: Dashboard (React), API (Express), infrastructure configs, and documentation',
            'Mastered advanced integration patterns: configuration-based syncs, event-based scripts, and enterprise deployment',
        ],
        primaryTech: ['Express', 'Next.js', 'PostgreSQL', 'OAuth'],
        secondaryTech: ['Zod', 'Vitest', 'Redis', 'Docker', 'Knex'],
        featured: true,
        live: 'https://www.nango.dev',
        github: 'https://github.com/pulls?q=is%3Apr+author%3Asteliosmavro+org%3ANangoHQ',
    },
    {
        name: 'Crypto Trading Bot Ecosystem',
        slug: 'crypto-trading-bots',
        period: {
            start: new Date('2024-11-01'),
            end: new Date('2025-06-30'),
        },
        type: 'acquired',
        categories: ['web3', 'automation', 'open-source'],
        description: 'Suite of Solana trading tools that gained 1.2K+ users',
        icon: 'Bot',
        longDescription:
            'Comprehensive ecosystem of trading bots for Solana including volume generation, growth automation, and token bundling. Successfully acquired by MicroPump after reaching 1.2K+ active users.',
        highlights: [
            'ezpump.fun - Telegram trading bot for Solana meme coins',
            'Generated simulated volume to boost token visibility on pump.fun',
            'Comment Bot - Automated engagement tool that posts contextual comments on new token listings',
            'Token Bundler - Creates tokens and executes first buy in same transaction',
            'Built anti-detection system with rotating proxies and randomized behavior',
            'Built active Twitter/X presence @EzPumpFun for updates and community engagement',
            'Reached 1.2K+ users through custom automation and community marketing',
        ],
        primaryTech: ['TypeScript', 'Solana Web3.js', 'MongoDB', 'NestJS'],
        secondaryTech: [
            'Telegraf',
            'Solana SPL Token',
            'Mongoose',
            'Anchor Framework',
            'Jito MEV',
            'Helius RPC',
            'Cheerio',
            'Puppeteer',
        ],
        featured: true,
        acquired: {
            by: 'MicroPump',
            details:
                'Successfully acquired in June 2025. Entire ecosystem transitioned to new ownership.',
        },
        metrics: {
            users: '1.2K+',
        },
        impact: '1.2K+ active users',
        live: 'https://www.micropump.fun',
        github: 'https://github.com/steliosmavro/pump-fun-telegram-bot',
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

export function getProjectsByCategory(category: string): Project[] {
    return projects.filter((project) =>
        project.categories.includes(category as any),
    );
}
