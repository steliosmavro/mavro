import type { Metadata } from 'next';
import { personalInfo } from '@repo/data';

export const metadata: Metadata = {
    title: `Portfolio | ${personalInfo.name}`,
    description: `Personal projects, professional work experience, and open source contributions by ${personalInfo.name}.`,
};

export default function PortfolioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
