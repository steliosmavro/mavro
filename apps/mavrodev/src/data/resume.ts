import type { Resume, ResumeConfig } from '@/types/resume';

export const resumeData: Resume = {
    personal: {
        name: 'Stelios Mavro',
        title: 'Full-Stack Engineer - AI Integrations - Developer Tooling',
        location: 'Athens, Greece',
        mobile: '+30 6976750964',
        email: 'stelios@mavro.dev',
        website: 'https://mavro.dev',
        linkedin: 'https://www.linkedin.com/in/steliosmavro',
        github: 'https://github.com/steliosmavro',
        twitter: 'https://twitter.com/steliosmavro',
        avatar: '/business-transparent-bg-cropped.png',
        casualAvatar: '/casual.jpg',
        timezone: 'Europe/Athens',
    },
    summary: {
        headline:
            'Full-Stack Engineer building AI-powered applications and developer tools',
        shortBio:
            'Full-stack engineer since 2020, specializing in AI integrations and developer tooling. Passionate about open-source, clean code, and creating seamless experiences that empower developers.',
        longBio:
            'Full-stack software engineer since 2020 with expertise in delivering high-quality web applications, automation tools, and scalable backend systems. Recently specialized in AI integrations and developer tooling, connecting modern AI capabilities to real-world business needs. Passionate about open-source contributions, clean testable code, and building tools that make developers more productive.',
        availability:
            'Available for full-time, part-time, and freelance collaborations.',
        startYear: 2020,
    },
    projects: [
        {
            name: 'MavroChat',
            slug: 'mavrochat',
            period: '2025',
            type: 'open-source',
            category: 'ai-ml',
            description: 'Open-Source AI-Powered Chat Platform for Developers',
            icon: 'MessageSquare',
            longDescription:
                'A ChatGPT-like platform specifically designed for developers with code-aware features, real-time streaming, and multi-provider support.',
            highlights: [
                'Built and open-sourced a ChatGPT-like platform specifically designed for developers with code-aware features',
                'Implemented real-time streaming responses, syntax highlighting, and code execution capabilities',
                'Designed modular architecture supporting multiple AI providers (OpenAI, Claude, etc.)',
                'Created intuitive UI with dark mode, conversation history, and export functionality',
                'Built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion',
                'Focused on developer experience with keyboard shortcuts, markdown support, and API integration tools',
            ],
            technologies: [
                'Next.js 15',
                'TypeScript',
                'Tailwind CSS',
                'Framer Motion',
                'Vercel AI SDK',
                'OpenAI API',
                'Claude API',
            ],
            featured: true,
            live: 'https://mavro.chat',
            github: 'https://github.com/steliosmavro/mavro',
            impact: 'Active open-source project',
        },
        {
            name: 'MavroDev',
            slug: 'mavrodev',
            period: '2025',
            type: 'personal',
            category: 'developer-tools',
            description: 'Personal Portfolio & Blog Platform',
            icon: 'Palette',
            longDescription:
                'Modern portfolio website showcasing projects, blog, and professional experience with MDX support and beautiful animations.',
            highlights: [
                'Built a modern portfolio website showcasing projects, blog, and professional experience',
                'Implemented MDX-based blog system with syntax highlighting, reading time, and category filtering',
                'Created responsive design with dark/light theme support and smooth Framer Motion animations',
                'Architected as part of a Turborepo monorepo with shared UI component library',
                'Set up CI/CD with GitHub Actions, conventional commits, and automated quality checks',
            ],
            technologies: [
                'Next.js 15',
                'TypeScript',
                'Tailwind CSS',
                'MDX',
                'Turborepo',
                'Framer Motion',
            ],
            featured: true,
            live: 'https://mavro.dev',
            github: 'https://github.com/steliosmavro/mavro',
            impact: 'Live portfolio site',
        },
        {
            name: 'Nango Contributions',
            slug: 'nango-contributions',
            period: '2025',
            type: 'open-source',
            category: 'oss',
            description: 'Open Source Developer Tool Contributions',
            icon: 'GitPullRequest',
            highlights: [
                'Contributed across multiple areas of Nango — a popular open-source platform for unified API integrations',
                'Added new sync and action endpoints in the integration-templates repo (e.g., ClickSend integration)',
                'Contributed improvements, bug fixes, features, and docs across core codebases',
                'Used internal tooling such as npx nango dryrun, Zod, Vitest, MCP server, and Cursor IDE',
                "Followed Nango's conventions for integration structure, model definitions, CI/CD, and clean architecture",
            ],
            technologies: [
                'TypeScript',
                'Node.js',
                'Zod',
                'Vitest',
                'API Integrations',
            ],
            featured: false,
            github: 'https://github.com/NangoHQ',
        },
        {
            name: 'Crypto Trading Bot Ecosystem',
            slug: 'crypto-trading-bots',
            period: '2024 - 2025',
            type: 'acquired',
            category: 'web3',
            description:
                'Suite of Solana trading tools that gained 1.2K+ users',
            icon: 'Bot',
            longDescription:
                'Comprehensive ecosystem of trading bots for Solana including volume generation, growth automation, and token bundling.',
            highlights: [
                'EzPump.fun - Telegram trading bot for Solana meme coins',
                'Generated simulated volume to boost token visibility on pump.fun',
                'Comment Bot - Automated engagement on new token listings',
                'Token Bundler - Creates tokens and executes first buy in same transaction',
                'Built anti-detection system with rotating proxies and randomized behavior',
                'Reached 1.2K+ users through custom automation and community marketing',
            ],
            technologies: [
                'Node.js',
                'TypeScript',
                'Solana Web3.js',
                'Telegram Bot API',
                'MongoDB',
                'Redis',
            ],
            featured: true,
            acquired: {
                by: 'MicroPump',
                details:
                    'Successfully transitioned entire ecosystem after acquisition',
            },
            metrics: {
                users: '1.2K+',
            },
            impact: '1.2K+ active users',
        },
        {
            name: 'Nextjs13-template-auth',
            slug: 'nextjs13-template',
            period: '2023',
            type: 'open-source',
            category: 'oss',
            description: 'Open-Source Google OAuth Starter Template',
            icon: 'Shield',
            highlights: [
                'Built and open-sourced a reusable starter template for full-stack apps using Next.js 13 (App Router)',
                'Provides built-in Google authentication, role-based access, and clean project structure',
                'Includes login/signup, protected routes, session management, and modern folder architecture',
                'Published on GitHub to help developers quickly bootstrap authenticated applications',
            ],
            technologies: [
                'Next.js 13',
                'TypeScript',
                'NextAuth.js',
                'Tailwind CSS',
            ],
            featured: false,
            github: 'https://github.com/steliosmavro/nextjs13-template-auth',
        },
    ],
    experience: [
        {
            company: 'InstaShop',
            location: 'Remote – UAE',
            role: 'Software Engineer',
            period: '2023 - 2025',
            current: false,
            description:
                'Contributed to the leading grocery delivery app in MENA, acquired by Delivery Hero ($360M). Operated in a fast-paced team of 60+ developers.',
            projects: [
                {
                    name: 'Integration Team',
                    description:
                        'Built APIs and managed communication workflows',
                    highlights: [
                        'Built APIs and endpoints for external partners',
                        'Managed communication workflows for data exchange with Delivery Hero',
                        'Ensured secure, scalable, real-time data flow (order events, system events)',
                        'Integrated with existing Kafka architecture by developing new consumers and producers',
                    ],
                },
                {
                    name: 'Admin Dashboard Application',
                    description:
                        'Backend development with frontend contributions',
                    highlights: [
                        'Added new pages and features to existing codebase',
                        'Implemented automation tools, scheduled jobs, data exports, email notifications',
                        'Utilized worker queues for large-scale data processing tasks',
                        'Maintained stability and performance while expanding internal tools',
                    ],
                },
                {
                    name: 'Firefighting Team',
                    description: 'Core member of urgent response team',
                    highlights: [
                        'Responded to urgent issues, production bugs, and high-priority tickets',
                        'Maintained direct communication with stakeholders',
                        'Monitored logs via AWS CloudWatch and received real-time alerts',
                        'Handled complex data extraction using MongoDB and Apache Druid',
                    ],
                },
            ],
            technologies: {
                backend: [
                    'Node.js',
                    'Express',
                    'NestJS',
                    'REST APIs',
                    'Kafka',
                    'Worker Queues',
                ],
                frontend: ['Angular', 'TypeScript', 'CSS'],
                databases: ['MongoDB', 'Apache Druid'],
                devops: ['AWS CloudWatch', 'Datadog', 'TeamCity'],
                other: ['Mandrill', 'Mailchimp'],
            },
        },
        {
            company: 'Mind Alliance',
            location: 'Remote – New Jersey, USA',
            role: 'Full-Stack Software Engineer',
            period: '2021 - 2023',
            current: false,
            description:
                'Built internal SaaS platforms for Fragomen, a leading U.S. law firm specializing in immigration law.',
            projects: [
                {
                    name: 'IAMS (Immigration Application Management System)',
                    role: 'Led development',
                    description:
                        'Dynamic form builder for legal report generation',
                    highlights: [
                        'Admins could create or configure templates, fields, rules etc.',
                        'Implemented scalable state management using NgRx Store and Component Store',
                        'Integrated WYSIWYG editors (Quill, TinyMCE) for rich-text content',
                        'Implemented permission-based authentication and authorization systems',
                        'Multi-user collaboration in real-time',
                        'Configurable taxonomies like countries, topics, categories',
                    ],
                },
                {
                    name: 'Covid Travel App',
                    role: 'Sole developer',
                    description:
                        'Interactive global map visualizing Covid restrictions',
                    highlights: [
                        'Interactive global map visualizing Covid restrictions',
                        'Users could view quarantine rules by vaccination status',
                        'Displayed case numbers and border closures per country',
                    ],
                },
                {
                    name: 'MindPeer',
                    description: 'Legal intelligence platform',
                    highlights: [
                        'Pulled company data from external APIs',
                        'Auto-generated business reports to surface insights for law firms',
                    ],
                },
            ],
            technologies: {
                frontend: [
                    'Angular',
                    'TypeScript',
                    'SCSS',
                    'NgRx',
                    'Angular Material',
                    'Tailwind CSS',
                    'D3.js',
                ],
                backend: [
                    'NestJS',
                    'Node.js',
                    'Express',
                    'REST APIs',
                    'GraphQL',
                    'WebSockets',
                ],
                databases: ['MongoDB', 'Prisma'],
                other: ['Quill', 'TinyMCE', 'Passport.js', 'JWT', 'CASL'],
            },
        },
    ],
    education: [
        {
            degree: 'Vocational Education - Mechatronics Engineering',
            period: 'Oct 2015 - Aug 2020',
            grade: '18/20 (Certified by the National Organization for Certification of Qualifications)',
            description:
                'Studied a field that combines computer science, electrical engineering, and mechanical systems. Gained hands-on experience with embedded programming, circuit design, and automation, with real-world applications in robotics, smart devices, and industrial control systems.',
        },
    ],
    skills: [
        {
            category: 'Frontend',
            items: [
                'React 19',
                'Next.js 15',
                'Angular',
                'TypeScript',
                'Tailwind CSS 4',
                'SCSS',
                'Bootstrap',
                'Framer Motion',
            ],
            isPrimary: true,
            displayOrder: 1,
        },
        {
            category: 'Backend',
            items: [
                'Node.js',
                'NestJS',
                'Express',
                'REST APIs',
                'GraphQL',
                'WebSockets',
            ],
            isPrimary: true,
            displayOrder: 2,
        },
        {
            category: 'Databases',
            items: ['PostgreSQL', 'MongoDB', 'Mongoose', 'Redis', 'Prisma'],
        },
        {
            category: 'Blockchain',
            items: ['Solana Web3.js', 'SPL Token'],
        },
        {
            category: 'AI/ML',
            items: ['Vercel AI SDK', 'OpenAI API', 'Claude API'],
        },
        {
            category: 'DevOps & Tools',
            items: [
                'Turborepo',
                'Docker',
                'CI/CD',
                'GitHub Actions',
                'Git',
                'MCP server',
                'Cursor IDE',
            ],
        },
        {
            category: 'Testing',
            items: ['Vitest', 'Jasmine', 'Karma', 'Angular CLI'],
        },
    ],
    testimonials: [
        {
            quote: 'We appreciated how you stepped in with ownership and initiative. You adapted quickly, understood the product, and brought practical solutions.',
            name: 'David Kamien',
            title: 'CEO, Mind-Alliance Systems',
            avatar: '/david-kamien.jpeg',
            linkedIn: 'https://www.linkedin.com/in/davidkamien',
            gradientColor: 'from-blue-500 to-purple-500',
        },
        {
            quote: 'Thanks a lot for all the help, Stelios! We really noticed your contributions and your proactive attitude. It meant a lot to the team.',
            name: 'Bastien Beurier',
            title: 'Co-Founder, Nango · ex-Uber',
            avatar: '/bastien-beurier.jpg',
            linkedIn: 'https://www.linkedin.com/in/bastienbeurier',
            gradientColor: 'from-purple-500 to-pink-500',
        },
        {
            quote: 'Stelios has that rare mix of professionalism, consistency, and quiet confidence. A pleasure to work with.',
            name: 'George Tzinos',
            title: 'Senior Director of Engineering, InstaShop',
            avatar: '/george-tzinos.jpg',
            linkedIn: 'https://www.linkedin.com/in/geotzinos',
            gradientColor: 'from-pink-500 to-orange-500',
        },
    ],
    faqs: [
        {
            question: 'What is your preferred tech stack?',
            answer: 'I love working with modern TypeScript frameworks like Next.js and React for frontend, Node.js/NestJS for backend, and PostgreSQL or MongoDB for databases. For AI integrations, I work with OpenAI and Claude APIs.',
            category: 'technical',
        },
        {
            question: 'Are you available for freelance work?',
            answer: "Yes! I'm available for freelance projects, especially those involving AI integrations, developer tooling, or full-stack web applications. Feel free to reach out to discuss your project.",
            category: 'work',
        },
        {
            question: 'What timezone do you work in?',
            answer: "I'm based in Athens, Greece (EET/EEST), but I'm flexible with working hours and have experience collaborating with teams across different timezones.",
            category: 'work',
        },
        {
            question: 'Do you contribute to open source?',
            answer: "Absolutely! I've contributed to projects like Nango and maintain my own open-source projects including MavroChat. I believe in giving back to the developer community.",
            category: 'technical',
        },
    ],
    contactMethods: [
        {
            type: 'email',
            label: 'Email',
            value: 'stelios@mavro.dev',
            href: 'mailto:stelios@mavro.dev',
            color: 'from-blue-400 to-blue-600',
        },
        {
            type: 'github',
            label: 'GitHub',
            value: '@steliosmavro',
            href: 'https://github.com/steliosmavro',
            color: 'from-gray-700 to-gray-900',
        },
        {
            type: 'linkedin',
            label: 'LinkedIn',
            value: 'Stelios Mavro',
            href: 'https://www.linkedin.com/in/steliosmavro',
            color: 'from-blue-500 to-blue-700',
        },
        {
            type: 'twitter',
            label: 'X (Twitter)',
            value: '@steliosmavro',
            href: 'https://twitter.com/steliosmavro',
            color: 'from-gray-700 to-gray-900',
        },
    ],
    homepage: {
        heroSkillBadges: [
            'TypeScript',
            'React/Next.js',
            'AI/ML Integration',
            'System Design',
            'Open Source',
        ],
        featuredProjectSlugs: ['mavrochat', 'crypto-trading-bots', 'mavrodev'],
    },
};

export const resumeConfig: ResumeConfig = {
    metadata: {
        lastUpdated: '2025-01-06',
        version: '1.0.0',
    },
    display: {
        showMetrics: true,
        showAcquiredBadge: true,
        projectsPerPage: 6,
    },
    seo: {
        twitterHandle: '@steliosmavro',
        ogImage: '/og-image.png',
    },
};
