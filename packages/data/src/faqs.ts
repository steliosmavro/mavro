import type { FAQ } from './types';

export const faqs: FAQ[] = [
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
];
