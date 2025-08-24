import type { Contribution } from './types';

export const contributions: Contribution[] = [
    {
        name: 'Nango',
        descriptor: 'Open Source Developer Tool',
        slug: 'nango-contributions',
        period: {
            start: new Date('2025-03-20'),
            end: new Date('2025-05-23'),
        },
        organization: 'NangoHQ',
        description: 'Open Source Developer Tool Contributions',
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
        secondaryTech: ['Zod', 'Vitest', 'Redis', 'Docker', 'Knex', 'OpenTelemetry'],
        featured: true,
        live: 'https://www.nango.dev',
        github: 'https://github.com/pulls?q=is%3Apr+author%3Asteliosmavro+org%3ANangoHQ',
        icon: 'GitPullRequest',
    },
];