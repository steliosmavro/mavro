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
        twitter: 'https://twitter.com/mavrodev',
        avatar: '/business-transparent-bg-cropped.png',
        casualAvatar: '/casual.jpg',
        timezone: 'Europe/Athens',
    },
    summary: {
        headline:
            'Full-Stack Engineer building AI-powered applications and developer tools',
        bio: 'Full-stack engineer since 2020, specializing in AI integrations and developer tooling. Passionate about open-source, clean code, and creating seamless experiences that empower developers.',
        bioExtension:
            'Built MavroChat (ChatGPT clone for developers), created and sold high-impact Telegram trading bot (EzPump) serving 1.2K+ users, contributed to Nango (popular open-source developer tool), and delivered enterprise SaaS at scale. Turning complex ideas into elegant solutions.',
        availability:
            'Available for full-time, part-time, and freelance collaborations.',
        startYear: 2020,
    },
    projects: [
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
            // impact: 'Growing community', // No metrics yet - it's new!
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
            secondaryTech: [
                'Tailwind CSS',
                'Turborepo',
                'Framer Motion',
                'Resend',
            ],
            featured: false,
            live: 'https://mavro.dev',
            github: 'https://github.com/steliosmavro/mavro',
            // impact: undefined, // Portfolio sites typically don't have user metrics
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
                'Implemented best practices including incremental syncing, pagination, retry logic, testing, and documentation',
                'Contributed improvements, bug fixes, and features across Dashboard, Connect UI, API, and Docs',
                'Enhanced overall Developer Experience through documentation and code improvements',
                "Followed Nango's conventions for integration structure, model definitions, CI/CD, and clean architecture",
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
            description:
                'Suite of Solana trading tools that gained 1.2K+ users',
            icon: 'Bot',
            longDescription:
                'Comprehensive ecosystem of trading bots for Solana including volume generation, growth automation, and token bundling. Successfully acquired by MicroPump after reaching 1.2K+ active users.',
            highlights: [
                'ezpump.fun - Telegram trading bot for Solana meme coins',
                'Generated simulated volume to boost token visibility on pump.fun',
                'Comment Bot - Automated engagement tool that posts contextual comments on new token listings',
                'Token Bundler - Creates tokens and executes first buy in same transaction',
                'Built anti-detection system with rotating proxies and randomized behavior',
                'Reached 1.2K+ users through custom automation and community marketing',
            ],
            primaryTech: ['TypeScript', 'Solana Web3.js', 'MongoDB', 'Express'],
            secondaryTech: [
                'Node.js Telegram Bot API',
                'Solana SPL Token',
                'Mongoose',
                'Anchor Framework',
                'Jupiter API',
                'Jito MEV',
                'Cheerio',
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
            description:
                'Open-Source Google OAuth Starter Template For Developers',
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
    ],
    experience: [
        {
            company: 'MicroPump',
            location: '',
            workModel: 'Remote',
            role: 'Technical Consultant',
            period: {
                start: new Date('2025-06-01'),
            },
            current: true,
            website: 'https://www.micropump.fun',
            logo: '/micropump-logo.webp',
            description:
                'Providing ongoing technical consultation and development services after the acquisition of my EzPump bot ecosystem. Working on scaling infrastructure and implementing new features.',
            projects: [
                {
                    name: 'Post-Acquisition Integration',
                    description:
                        'Technical lead for migrating and scaling the acquired bot ecosystem',
                    highlights: [
                        'Extended the architecture of EzPump into a more scalable and modular system',
                        'Designed dynamic pricing models and automated bump logic tied to blockchain activity',
                        'Coordinated feature rollouts and performance tuning post-migration',
                        'Ongoing enhancements focused on user growth, monetization features, and UX improvements',
                        'Currently serving 3.6K+ active users',
                    ],
                },
            ],
            technologies: {
                backend: [
                    'Node.js',
                    'Express',
                    'TypeScript',
                    'Solana Web3.js',
                    'node-telegram-bot-api',
                ],
                databases: ['MongoDB', 'Mongoose'],
                other: [
                    'Anchor Framework',
                    'Jupiter API',
                    'Metaplex',
                    'Jito MEV',
                    'Axios',
                    'Cheerio',
                    '2captcha',
                ],
            },
        },
        {
            company: 'InstaShop',
            location: 'UAE',
            workModel: 'Remote',
            role: 'Software Engineer',
            period: {
                start: new Date('2023-01-01'),
                end: new Date('2025-12-31'),
            },
            current: false,
            website: 'https://instashop.com/en-ae',
            logo: '/instashop-logo.webp',
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
                    'Parse SDK',
                ],
                frontend: ['Angular', 'TypeScript', 'CSS'],
                databases: ['MongoDB', 'Apache Druid', 'Studio3T', 'Imply'],
                devops: ['AWS CloudWatch', 'Datadog', 'TeamCity'],
                other: [
                    'Mandrill',
                    'Mailchimp',
                    'Adjust',
                    'Cron Jobs',
                    'moment',
                    'lodash',
                ],
            },
        },
        {
            company: 'Mind Alliance',
            location: 'New Jersey, USA',
            workModel: 'Remote',
            role: 'Full-Stack Software Engineer',
            period: {
                start: new Date('2021-09-01'),
                end: new Date('2023-03-31'),
            },
            current: false,
            website: 'https://www.mind-alliance.com',
            logo: '/mind-alliance-logo.jpg',
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
                other: [
                    'Quill',
                    'TinyMCE',
                    'Passport.js',
                    'JWT',
                    'CASL',
                    'bcrypt',
                    'Winston',
                    'class-validator',
                    'class-transformer',
                    'lodash',
                    'date-fns',
                ],
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
            category: 'Libraries & Utilities',
            items: [
                'Zod',
                'Winston',
                'lodash',
                'date-fns',
                'class-validator',
                'class-transformer',
                'axios',
                'dotenv',
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
            value: '@mavrodev',
            href: 'https://twitter.com/mavrodev',
            color: 'from-gray-700 to-gray-900',
        },
    ],
    homepage: {
        heroSkillBadges: [
            'TypeScript',
            'System Design',
            'Open Source',
            'Automation',
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
        twitterHandle: '@mavrodev',
        ogImage: '/og-image.png',
    },
};
