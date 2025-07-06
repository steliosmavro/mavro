import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects | Stelios Mavro',
    description:
        'Technical projects spanning AI/ML, blockchain, systems programming, and open source contributions by Stelios Mavro.',
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
