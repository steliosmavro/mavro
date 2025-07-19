import type { Skill } from './types';

export const skills: Skill[] = [
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
        items: [
            'PostgreSQL',
            'MongoDB',
            'Mongoose',
            'Redis',
            'Prisma',
            'ElasticSearch',
        ],
    },
    {
        category: 'Blockchain',
        items: ['Solana Web3.js', 'SPL Token'],
    },
    {
        category: 'AI/ML',
        items: ['Generative AI', 'Vercel AI SDK', 'OpenAI API', 'Claude API', 'MCP server'],
    },
    {
        category: 'DevOps & Tools',
        items: [
            'Kubernetes',
            'Docker',
            'AWS ECS',
            'Helm',
            'CI/CD',
            'GitHub Actions',
            'Turborepo',
            'Git',
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
            'Puppeteer',
            'dotenv',
        ],
    },
    {
        category: 'Testing',
        items: ['Vitest', 'Jasmine', 'Karma', 'Angular CLI'],
    },
];
