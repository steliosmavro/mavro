import type { Metadata } from 'next';
import { personalInfo } from '@repo/data';

export const metadata: Metadata = {
    title: `Projects | ${personalInfo.name}`,
    description: `Technical projects spanning AI/ML, blockchain, systems programming, and open source contributions by ${personalInfo.name}.`,
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
