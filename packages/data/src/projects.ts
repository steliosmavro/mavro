import type { Project } from './types';

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
            'A ChatGPT-like platform specifically designed for developers with code-aware features, real-time streaming, and multi-provider support.',
        highlights: [
            'Built and open-sourced a ChatGPT-like platform specifically designed for developers with code-aware features',
            'Implemented real-time streaming responses, syntax highlighting, and code execution capabilities',
            'Designed modular architecture supporting multiple AI providers (OpenAI, Claude, etc.)',
            'Created intuitive UI with dark mode, conversation history, and export functionality',
            'Focused on developer experience with keyboard shortcuts, markdown support, and API integration tools',
        ],
        primaryTech: ['Next.js 15', 'TypeScript', 'Monorepo'],
        secondaryTech: [
            'Tailwind CSS',
            'Framer Motion',
            'OpenAI API',
            'Claude API',
        ],
        featured: true,
        live: 'https://mavro.chat',
        github: 'https://github.com/steliosmavro/mavro',
    },
    {
        name: 'MavroDev',
        slug: 'mavrodev',
        period: {
            start: new Date('2024-10-01'),
        },
        type: 'personal',
        categories: ['website'],
        description: 'Personal Website & Blog Platform',
        icon: 'Palette',
        longDescription:
            'Modern portfolio website showcasing projects, blog, and professional experience with MDX support and beautiful animations.',
        highlights: [
            'Built a modern portfolio website showcasing projects, blog, and professional experience',
            'Implemented MDX-based blog system with syntax highlighting, reading time, and category filtering',
            'Created responsive design with dark/light theme support and smooth Framer Motion animations',
            'Integrated contact form with email sending functionality using Resend API',
            'Architected as part of a Turborepo monorepo with shared UI component library',
            'Set up CI/CD with GitHub Actions, conventional commits, and automated quality checks',
        ],
        primaryTech: ['Next.js', 'MDX', 'Monorepo'],
        secondaryTech: ['Tailwind CSS', 'Turborepo', 'Framer Motion', 'Resend'],
        featured: false,
        live: 'https://mavro.dev',
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
