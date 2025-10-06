import type { Experience } from './types';

export const experience: Experience[] = [
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
                    'Developed advanced Token Bundler for pump.fun Solana program - creates tokens and executes first buy in same atomic transaction, ensuring creator gets first entry advantage',
                    'Engineered multi-wallet coordination system that generates multiple wallets and orchestrates simultaneous token purchases within single transaction block',
                    'Built one-click sell functionality enabling rapid token liquidation through atomic transaction execution',
                    'Implemented anti-MEV protection and transaction priority optimization for reliable execution in high-traffic conditions',
                    'Created automated wallet management system with secure key generation and transaction signing',
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
                'Node.js Telegram Bot API',
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
