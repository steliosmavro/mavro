import type { Metadata } from 'next';
import { personalInfo } from '@repo/data';

export const metadata: Metadata = {
    title: `Contact | ${personalInfo.name}`,
    description: `Get in touch with ${personalInfo.name} for freelance projects, collaborations, or technical consulting.`,
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
