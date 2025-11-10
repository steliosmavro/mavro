import type { Experience } from './types';

export const experience: Experience[] = [
    {
        company: 'Elastic',
        location: '',
        workModel: 'Remote',
        role: 'Software Engineer',
        period: {
            start: new Date('2025-11-10'),
        },
        current: true,
        website: 'https://www.elastic.co/',
        logo: '/elastic.png',
        description: '',
        metrics: {},
        projects: [],
        technologies: {
            backend: [],
            databases: [],
            other: [],
        },
    },
    {
        company: 'EzPump (Acquired by MicroPump)',
        location: '',
        workModel: 'Remote',
        role: 'Founder & Lead Software Engineer',
        period: {
            start: new Date('2024-11-01'),
            end: new Date('2025-10-01'),
        },
        current: false,
        website: 'https://www.micropump.fun',
        logo: '/micropump-logo.webp',
        description:
            'Founded and developed EzPump — an open-source ecosystem of trading bots for Solana, reaching 1.2K+ active users before being acquired by MicroPump. Continued post-acquisition to assist with system integration and feature expansion.',
        metrics: {
            users: '1.2K+',
        },
        projects: [
            {
                name: 'EzPump Trading Bot Ecosystem',
                description:
                    'Comprehensive ecosystem of trading bots for Solana including volume generation, growth automation, and token bundling.',
                highlights: [
                    'Developed ezpump.fun — Telegram trading bot for Solana meme coins',
                    'Generated simulated volume to boost token visibility on pump.fun',
                    'Built Comment Bot for automated engagement on new token listings',
                    'Created Token Bundler that executes token creation and first buy from multiple wallets at the same time',
                    'Implemented anti-detection system with rotating proxies and randomized behavior',
                    'Built active Twitter/X presence (https://x.com/EzPumpFun) for updates and community engagement',
                    'Reached 1.2K+ active users through automation and community marketing',
                    'Successfully acquired by MicroPump in June 2025; assisted with transition and continued feature development',
                ],
            },
        ],
        technologies: {
            backend: [
                'TypeScript',
                'NestJS',
                'Express',
                'Node.js',
                'Solana Web3.js',
            ],
            databases: ['MongoDB', 'Mongoose'],
            other: [
                'Telegraf',
                'Solana SPL Token',
                'Anchor Framework',
                'Jito MEV',
                'Helius RPC',
                'Cheerio',
                'Puppeteer',
            ],
        },
    },
    {
        company: 'InstaShop',
        location: 'Dubai, UAE',
        workModel: 'Remote',
        role: 'Software Engineer',
        period: {
            start: new Date('2023-10-01'),
            end: new Date('2025-06-01'),
        },
        current: false,
        website: 'https://instashop.com/en-ae',
        logo: '/instashop-logo.webp',
        description:
            'Contributed to the leading grocery delivery app in MENA, acquired by Delivery Hero ($360M). Operated in a fast-paced team of 60+ developers.',
        projects: [
            {
                name: 'Integration Team',
                description: 'Built APIs and managed communication workflows',
                highlights: [
                    'Built APIs and endpoints for external partners',
                    'Managed communication workflows for data exchange with Delivery Hero',
                    'Ensured secure, scalable, real-time data flow (order events, system events)',
                    'Integrated with existing Kafka architecture by developing new consumers and producers',
                ],
            },
            {
                name: 'Admin Dashboard Application',
                description: 'Backend development with frontend contributions',
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
        company: '',
        location: '',
        workModel: 'Remote',
        role: 'Software Engineer (Freelance)',
        period: {
            start: new Date('2020-03-01'),
            end: new Date('2021-05-31'),
        },
        current: false,
        description:
            'Built websites and landing pages for small businesses and local clients. Focused on responsive design and basic SEO.',
        projects: [
            {
                name: 'Client Projects',
                description:
                    'Developed websites and landing pages for small businesses',
                highlights: [
                    'Created responsive websites and landing pages for 10+ small businesses',
                    'Implemented SEO best practices and meta tags',
                    'Built contact forms and integrated Google Analytics',
                    'Customized templates and created clean, professional designs',
                    'Provided maintenance and content updates for clients',
                ],
            },
        ],
        technologies: {
            frontend: [
                'React',
                'JavaScript',
                'HTML5',
                'CSS3',
                'Bootstrap',
                'jQuery',
            ],
            backend: ['Node.js', 'Express'],
            databases: ['MongoDB'],
            other: ['Google Analytics', 'SEO Tools', 'Stripe', 'PayPal'],
        },
    },
    {
        company: 'Mind Alliance',
        location: 'New Jersey, USA',
        workModel: 'Remote',
        role: 'Software Engineer',
        period: {
            start: new Date('2021-06-01'),
            end: new Date('2023-05-31'),
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
                description: 'Dynamic form builder for legal report generation',
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
];
