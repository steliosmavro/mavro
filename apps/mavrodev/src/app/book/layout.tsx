import type { Metadata } from 'next';
import { personalInfo } from '@repo/data';

export const metadata: Metadata = {
    title: `Book a Meeting | ${personalInfo.name}`,
    description: `Schedule a meeting with ${personalInfo.name} using AI. No boring calendar widgets - just chat with my AI assistant to find a time that works!`,
    keywords: [
        'book meeting',
        'schedule call',
        'calendar booking',
        'AI scheduling',
        'meeting with Stelios',
    ],
};

export default function BookLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
