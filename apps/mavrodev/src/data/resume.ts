import type { Resume, ResumeConfig } from '@/types/resume';
import {
    personalInfo,
    summary,
    projects,
    experience,
    skills,
    testimonials,
} from '@repo/data';

export const resumeData: Resume = {
    personal: personalInfo,
    summary,
    projects,
    experience,
    education: [
        {
            degree: 'Vocational Education - Mechatronics Engineering',
            period: 'Oct 2015 - Aug 2020',
            grade: '18/20 (Certified by the National Organization for Certification of Qualifications)',
            description:
                'Studied a field that combines computer science, electrical engineering, and mechanical systems. Gained hands-on experience with embedded programming, circuit design, and automation, with real-world applications in robotics, smart devices, and industrial control systems.',
        },
    ],
    skills,
    testimonials,
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
